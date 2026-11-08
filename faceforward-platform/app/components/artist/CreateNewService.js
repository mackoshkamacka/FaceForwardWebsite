"use client";

import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";

import { db } from "../../../src/firebase";
import { useDashboardUser } from "../../lib/useCurrentUser";
import { SERVICE_TYPES } from "../../lib/platform";

const EMPTY_SERVICE = { title: "", type: SERVICE_TYPES[0].value, description: "" };

/** Artist widget: publish a new (free) service. */
export default function CreateNewService() {
    const { user } = useDashboardUser();
    const [open, setOpen] = useState(false);
    const [service, setService] = useState(EMPTY_SERVICE);
    const [message, setMessage] = useState(null);
    const [saving, setSaving] = useState(false);

    const update = (key) => (e) => setService({ ...service, [key]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            await addDoc(collection(db, "services"), {
                title: service.title.trim(),
                type: service.type,
                description: service.description.trim(),
                artistId: user.uid,
                status: "active",
                createdAt: Timestamp.now(),
            });
            setService(EMPTY_SERVICE);
            setOpen(false);
            setMessage({
                kind: "success",
                text: "Service published! Partner organizations and clients can now request it.",
            });
        } catch (error) {
            console.error("Error adding service:", error);
            setMessage({ kind: "error", text: "Couldn't publish the service. Please try again." });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="widget">
            <div className="widgetHeader">
                <h2 className="sectionTitle">Offer a Service</h2>
                <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                >
                    {open ? "Close" : "+ New Service"}
                </button>
            </div>

            {message && (
                <p className={`notice notice-${message.kind}`} role="status">
                    {message.text}
                </p>
            )}

            {open && (
                <form className="stack glassInset createServiceForm" onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="service-title">Title</label>
                        <input
                            id="service-title"
                            value={service.title}
                            onChange={update("title")}
                            placeholder="e.g. Natural everyday makeup"
                            required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="service-type">Service type</label>
                        <select id="service-type" value={service.type} onChange={update("type")}>
                            {SERVICE_TYPES.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="service-description">Description</label>
                        <textarea
                            id="service-description"
                            value={service.description}
                            onChange={update("description")}
                            placeholder="What you offer, how long it takes, and any products you can adapt (e.g. fragrance-free)."
                            required
                        />
                    </div>
                    <button type="submit" className="btn" disabled={saving}>
                        {saving ? "Publishing…" : "Publish Service"}
                    </button>
                </form>
            )}
        </div>
    );
}
