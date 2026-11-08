"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, query, Timestamp, where } from "firebase/firestore";

import { db } from "../../../src/firebase";
import { useDashboardUser } from "../../lib/useCurrentUser";
import { ROLES, SERVICE_TYPES, serviceLabel } from "../../lib/platform";

/** Today's date as YYYY-MM-DD in the user's own timezone (for the date picker's min). */
const today = () => {
    const d = new Date();
    return [d.getFullYear(), d.getMonth() + 1, d.getDate()]
        .map((n) => String(n).padStart(2, "0"))
        .join("-");
};

/**
 * Organization/client widget: browse active artist services and request one.
 * Organizations also give a participant count; clients request for themselves.
 */
export default function ServiceRequest() {
    const { user, profile } = useDashboardUser();
    const isOrganization = profile.role === ROLES.ORGANIZATION;

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [typeFilter, setTypeFilter] = useState("all");
    const [selected, setSelected] = useState(null);
    const [sentMessage, setSentMessage] = useState("");

    useEffect(() => {
        getDocs(query(collection(db, "services"), where("status", "==", "active")))
            .then((snapshot) => setServices(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))))
            .catch((err) => console.error("Error fetching services:", err))
            .finally(() => setLoading(false));
    }, []);

    const visible = services.filter((s) => typeFilter === "all" || s.type === typeFilter);

    return (
        <div className="widget">
            <div className="widgetHeader">
                <h2 className="sectionTitle">Available Services</h2>
                {services.length > 0 && (
                    <label className="inlineFilter">
                        Type
                        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                            <option value="all">All</option>
                            {SERVICE_TYPES.map((t) => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                        </select>
                    </label>
                )}
            </div>

            {sentMessage && <p className="notice notice-success mb-4" role="status">{sentMessage}</p>}

            {loading ? (
                <div className="spinner" role="status" aria-label="Loading services" />
            ) : visible.length === 0 ? (
                <div className="glassInset emptyState">
                    <strong>No services available right now</strong>
                    Our volunteer artists add new services regularly. Please check back soon.
                </div>
            ) : (
                <div className="cardList">
                    {visible.map((service) => (
                        <article key={service.id} className="glassInset itemCard">
                            <div className="itemCardHeader">
                                <h3 className="itemCardTitle">{service.title}</h3>
                                <span className="pill">Free</span>
                            </div>
                            <div className="itemMeta">
                                <span>{serviceLabel(service.type)}</span>
                            </div>
                            <p className="itemBody">{service.description}</p>
                            <div className="itemActions">
                                <button
                                    className="btn btn-sm"
                                    onClick={() => {
                                        setSentMessage("");
                                        setSelected(service);
                                    }}
                                >
                                    Request This Service
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {selected && (
                <RequestForm
                    service={selected}
                    user={user}
                    profile={profile}
                    isOrganization={isOrganization}
                    onClose={() => setSelected(null)}
                    onSent={() => {
                        setSelected(null);
                        setSentMessage(
                            "Request sent! You'll get an email as soon as the artist confirms."
                        );
                    }}
                />
            )}
        </div>
    );
}

function RequestForm({ service, user, profile, isOrganization, onClose, onSent }) {
    const [form, setForm] = useState({ date: "", location: "", participants: 1, notes: "" });
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);

    const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setError("");

        try {
            await addDoc(collection(db, "requests"), {
                type: profile.role,
                serviceId: service.id,
                serviceName: service.title,
                serviceType: service.type,
                artistId: service.artistId,
                userId: user.uid,
                name: profile.name || user.email,
                email: user.email,
                requestedDate: form.date,
                location: form.location.trim(),
                ...(isOrganization && { numberOfParticipants: Number(form.participants) }),
                notes: form.notes.trim(),
                status: "pending",
                createdAt: Timestamp.now(),
            });
            onSent();
        } catch (err) {
            console.error("Error submitting request:", err);
            setError("Couldn't send your request. Please try again.");
            setSending(false);
        }
    };

    return (
        <div className="modalOverlay" onClick={onClose}>
            <form
                className="glass modal stack"
                role="dialog"
                aria-modal="true"
                aria-label={`Request ${service.title}`}
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
            >
                <div className="modalHeader">
                    <div>
                        <p className="eyebrow">{serviceLabel(service.type)}</p>
                        <h2 className="sectionTitle">{service.title}</h2>
                    </div>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={onClose} aria-label="Close">
                        ✕
                    </button>
                </div>

                <div className="field">
                    <label htmlFor="req-date">Preferred date</label>
                    <input id="req-date" type="date" min={today()} value={form.date} onChange={update("date")} required />
                </div>

                <div className="field">
                    <label htmlFor="req-location">Where should this take place?</label>
                    <input
                        id="req-location"
                        value={form.location}
                        onChange={update("location")}
                        placeholder={isOrganization ? "Organization name and address" : "e.g. the shelter or centre you're staying at"}
                        required
                    />
                </div>

                {isOrganization && (
                    <div className="field">
                        <label htmlFor="req-participants">Expected number of participants</label>
                        <input
                            id="req-participants"
                            type="number"
                            min="1"
                            value={form.participants}
                            onChange={update("participants")}
                            required
                        />
                    </div>
                )}

                <div className="field">
                    <label htmlFor="req-notes">Notes (optional)</label>
                    <textarea
                        id="req-notes"
                        value={form.notes}
                        onChange={update("notes")}
                        placeholder="Accessibility needs, skin sensitivities, product preferences (e.g. fragrance-free), or the occasion."
                    />
                </div>

                {error && <p className="notice notice-error" role="alert">{error}</p>}

                <div className="btnRow">
                    <button type="submit" className="btn" disabled={sending}>
                        {sending ? "Sending…" : "Send Request"}
                    </button>
                    <button type="button" className="btn btn-ghost" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
