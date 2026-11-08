"use client";

import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";

import { db } from "../../../src/firebase";
import { useDashboardUser } from "../../lib/useCurrentUser";
import { REQUEST_STATUSES, ROLE_OPTIONS, formatDate } from "../../lib/platform";

const roleLabel = (type) => ROLE_OPTIONS.find((r) => r.value === type)?.label ?? type;
const participantsOf = (request) => request.numberOfParticipants ?? request.numberOfPatients;

/** Artist widget: incoming requests for the artist's services, with approve/complete/decline. */
export default function ArtistRequests() {
    const { user } = useDashboardUser();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const q = query(collection(db, "requests"), where("artistId", "==", user.uid));
        return onSnapshot(
            q,
            (snapshot) => {
                const rows = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
                rows.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
                setRequests(rows);
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching requests:", err);
                setLoading(false);
            }
        );
    }, [user.uid]);

    const visible = requests.filter((r) => filter === "all" || r.status === filter);
    // Keep the open modal in sync with live updates.
    const selectedLive = selected && requests.find((r) => r.id === selected);

    return (
        <div className="widget">
            <div className="widgetHeader">
                <h2 className="sectionTitle">Requests</h2>
                {requests.length > 0 && (
                    <label className="inlineFilter">
                        Show
                        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value="all">All</option>
                            {REQUEST_STATUSES.map((s) => (
                                <option key={s} value={s}>
                                    {s[0].toUpperCase() + s.slice(1)}
                                </option>
                            ))}
                        </select>
                    </label>
                )}
            </div>

            {loading ? (
                <div className="spinner" role="status" aria-label="Loading requests" />
            ) : visible.length === 0 ? (
                <div className="glassInset emptyState">
                    <strong>{requests.length === 0 ? "No requests yet" : `No ${filter} requests`}</strong>
                    {requests.length === 0
                        ? "Requests from partner organizations and clients will appear here."
                        : "Try a different filter."}
                </div>
            ) : (
                <div className="cardList">
                    {visible.map((request) => (
                        <button
                            key={request.id}
                            className="glassInset itemCard"
                            onClick={() => setSelected(request.id)}
                        >
                            <div className="itemCardHeader">
                                <h3 className="itemCardTitle">{request.serviceName}</h3>
                                <span className={`pill pill-${request.status}`}>{request.status}</span>
                            </div>
                            <div className="itemMeta">
                                <span>{request.name}</span>
                                <span>{roleLabel(request.type)}</span>
                                <span>Preferred date: {formatDate(request.requestedDate)}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {selectedLive && (
                <RequestModal
                    key={selectedLive.id}
                    request={selectedLive}
                    getIdToken={() => user.getIdToken()}
                    onClose={() => setSelected(null)}
                />
            )}
        </div>
    );
}

function RequestModal({ request, getIdToken, onClose }) {
    const [time, setTime] = useState(request.appointmentTime || "10:00");
    const [location, setLocation] = useState(request.location || "");
    const [busy, setBusy] = useState(false);
    const [message, setMessage] = useState(null);

    const setStatus = async (status) => {
        setBusy(true);
        setMessage(null);
        try {
            await updateDoc(doc(db, "requests", request.id), { status, updatedAt: new Date() });
            setMessage({ kind: "success", text: `Marked as ${status}.` });
        } catch (error) {
            console.error("Error updating request:", error);
            setMessage({ kind: "error", text: "Couldn't update the status. Please try again." });
        } finally {
            setBusy(false);
        }
    };

    const approve = async () => {
        if (!location.trim()) {
            setMessage({ kind: "error", text: "Please add a location before approving." });
            return;
        }
        setBusy(true);
        setMessage(null);
        try {
            const response = await fetch("/api/send-appointment-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${await getIdToken()}`,
                },
                body: JSON.stringify({
                    requestId: request.id,
                    appointmentTime: time,
                    location: location.trim(),
                    duration: 60,
                }),
            });
            const result = await response.json();
            if (!result.success) throw new Error(result.error || "Unknown error");
            setMessage({ kind: "success", text: "Approved! A confirmation email is on its way." });
        } catch (error) {
            console.error("Error approving request:", error);
            setMessage({ kind: "error", text: "Couldn't approve the request. Please try again." });
        } finally {
            setBusy(false);
        }
    };

    const participants = participantsOf(request);

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div
                className="glass modal"
                role="dialog"
                aria-modal="true"
                aria-label={request.serviceName}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modalHeader">
                    <div>
                        <span className={`pill pill-${request.status}`}>{request.status}</span>
                        <h2 className="sectionTitle">{request.serviceName}</h2>
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={onClose} aria-label="Close">
                        ✕
                    </button>
                </div>

                <div className="detailGrid">
                    <p><strong>Requested by:</strong> {request.name}</p>
                    <p><strong>Account:</strong> {roleLabel(request.type)}</p>
                    <p><strong>Email:</strong> {request.email}</p>
                    {participants && <p><strong>Participants:</strong> {participants}</p>}
                    <p><strong>Preferred date:</strong> {formatDate(request.requestedDate)}</p>
                    <p><strong>Submitted:</strong> {formatDate(request.createdAt)}</p>
                    {request.location && <p><strong>Location:</strong> {request.location}</p>}
                </div>
                <p className="glassInset itemCard">
                    <strong>Notes:</strong> {request.notes || "No additional notes."}
                </p>

                {request.status === "pending" && (
                    <div className="stack mt-5">
                        <h3 className="fieldLabel">Confirm appointment details</h3>
                        <div className="detailGrid">
                            <div className="field">
                                <label htmlFor="appt-time">Time</label>
                                <input
                                    id="appt-time"
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="appt-location">Location</label>
                                <input
                                    id="appt-location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Organization name and address"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {message && (
                    <p className={`notice notice-${message.kind} mt-4`} role="status">
                        {message.text}
                    </p>
                )}

                <div className="btnRow mt-5">
                    {request.status === "pending" && (
                        <button className="btn" onClick={approve} disabled={busy}>
                            {busy ? "Working…" : "Approve & Send Confirmation"}
                        </button>
                    )}
                    {request.status === "approved" && (
                        <button className="btn" onClick={() => setStatus("completed")} disabled={busy}>
                            Mark Completed
                        </button>
                    )}
                    {request.status !== "pending" && (
                        <button className="btn btn-ghost" onClick={() => setStatus("pending")} disabled={busy}>
                            Move Back to Pending
                        </button>
                    )}
                    {request.status !== "rejected" && request.status !== "completed" && (
                        <button
                            className="btn btn-ghost btn-danger"
                            onClick={() => setStatus("rejected")}
                            disabled={busy}
                        >
                            Decline
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
