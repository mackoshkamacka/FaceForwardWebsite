"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from "../../../src/firebase";
import { useDashboardUser } from "../../lib/useCurrentUser";
import { formatDate } from "../../lib/platform";

/** Organization/client widget: live list of the user's own requests. */
export default function ClientRequests() {
    const { user } = useDashboardUser();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showClosed, setShowClosed] = useState(false);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const q = query(collection(db, "requests"), where("userId", "==", user.uid));
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

    const isClosed = (r) => r.status === "completed" || r.status === "rejected";
    const visible = showClosed ? requests : requests.filter((r) => !isClosed(r));
    const selectedLive = selected && requests.find((r) => r.id === selected);

    return (
        <div className="widget">
            <div className="widgetHeader">
                <h2 className="sectionTitle">Your Requests</h2>
                {requests.some(isClosed) && (
                    <label className="inlineFilter">
                        <input
                            type="checkbox"
                            checked={showClosed}
                            onChange={() => setShowClosed(!showClosed)}
                        />
                        Show completed &amp; declined
                    </label>
                )}
            </div>

            {loading ? (
                <div className="spinner" role="status" aria-label="Loading requests" />
            ) : visible.length === 0 ? (
                <div className="glassInset emptyState">
                    <strong>{requests.length === 0 ? "No requests yet" : "No open requests"}</strong>
                    {requests.length === 0
                        ? "Choose a service to send your first request."
                        : "Everything is wrapped up. Requests you send will show here."}
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
                                <span>Preferred date: {formatDate(request.requestedDate)}</span>
                                <span>Sent: {formatDate(request.createdAt)}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {selectedLive && (
                <div className="modalOverlay" onClick={() => setSelected(null)}>
                    <div
                        className="glass modal"
                        role="dialog"
                        aria-modal="true"
                        aria-label={selectedLive.serviceName}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modalHeader">
                            <div>
                                <span className={`pill pill-${selectedLive.status}`}>{selectedLive.status}</span>
                                <h2 className="sectionTitle">{selectedLive.serviceName}</h2>
                            </div>
                            <button className="btn btn-ghost btn-sm" onClick={() => setSelected(null)} aria-label="Close">
                                ✕
                            </button>
                        </div>
                        <div className="detailGrid">
                            <p><strong>Preferred date:</strong> {formatDate(selectedLive.requestedDate)}</p>
                            <p><strong>Sent:</strong> {formatDate(selectedLive.createdAt)}</p>
                            {selectedLive.location && <p><strong>Location:</strong> {selectedLive.location}</p>}
                            {(selectedLive.numberOfParticipants ?? selectedLive.numberOfPatients) && (
                                <p>
                                    <strong>Participants:</strong>{" "}
                                    {selectedLive.numberOfParticipants ?? selectedLive.numberOfPatients}
                                </p>
                            )}
                        </div>
                        <p className="glassInset itemCard">
                            <strong>Notes:</strong> {selectedLive.notes || "No additional notes."}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
