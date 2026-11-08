"use client";

import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";

import { db } from "../../../src/firebase";
import { useDashboardUser } from "../../lib/useCurrentUser";
import { SERVICE_TYPES, serviceLabel } from "../../lib/platform";

/** Artist widget: list, edit, pause and delete the artist's own services. */
export default function ArtistServices() {
    const { user } = useDashboardUser();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null); // { id, title, type, description }
    const [error, setError] = useState("");

    useEffect(() => {
        const q = query(collection(db, "services"), where("artistId", "==", user.uid));
        return onSnapshot(
            q,
            (snapshot) => {
                setServices(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching services:", err);
                setLoading(false);
            }
        );
    }, [user.uid]);

    const run = async (action, failureText) => {
        setError("");
        try {
            await action();
        } catch (err) {
            console.error(failureText, err);
            setError(failureText);
        }
    };

    const saveEdit = (e) => {
        e.preventDefault();
        const { id, ...fields } = editing;
        run(async () => {
            await updateDoc(doc(db, "services", id), fields);
            setEditing(null);
        }, "Couldn't save your changes. Please try again.");
    };

    const toggleStatus = (service) =>
        run(
            () =>
                updateDoc(doc(db, "services", service.id), {
                    status: service.status === "active" ? "paused" : "active",
                }),
            "Couldn't update the service status."
        );

    const remove = (service) => {
        if (!window.confirm(`Permanently delete "${service.title}"?`)) return;
        run(() => deleteDoc(doc(db, "services", service.id)), "Couldn't delete the service.");
    };

    return (
        <div className="widget">
            <h2 className="sectionTitle widgetHeader">Your Services</h2>

            {error && <p className="notice notice-error" role="alert">{error}</p>}

            {loading ? (
                <div className="spinner" role="status" aria-label="Loading services" />
            ) : services.length === 0 ? (
                <div className="glassInset emptyState">
                    <strong>No services yet</strong>
                    Use &ldquo;New Service&rdquo; above to offer your first one.
                </div>
            ) : (
                <div className="cardList">
                    {services.map((service) =>
                        editing?.id === service.id ? (
                            <form key={service.id} className="glassInset itemCard stack" onSubmit={saveEdit}>
                                <div className="field">
                                    <label>Title</label>
                                    <input
                                        value={editing.title}
                                        onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="field">
                                    <label>Service type</label>
                                    <select
                                        value={editing.type}
                                        onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                                    >
                                        {SERVICE_TYPES.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="field">
                                    <label>Description</label>
                                    <textarea
                                        value={editing.description}
                                        onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="btnRow">
                                    <button type="submit" className="btn btn-sm">Save</button>
                                    <button
                                        type="button"
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => setEditing(null)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <article key={service.id} className="glassInset itemCard">
                                <div className="itemCardHeader">
                                    <h3 className="itemCardTitle">{service.title}</h3>
                                    <span className="pill">{service.status === "active" ? "Active" : "Paused"}</span>
                                </div>
                                <div className="itemMeta">
                                    <span>{serviceLabel(service.type)}</span>
                                    <span>Free of charge</span>
                                </div>
                                <p className="itemBody">{service.description}</p>
                                <div className="btnRow itemActions">
                                    <button
                                        className="btn btn-sm"
                                        onClick={() =>
                                            setEditing({
                                                id: service.id,
                                                title: service.title,
                                                type: service.type,
                                                description: service.description,
                                            })
                                        }
                                    >
                                        Edit
                                    </button>
                                    <button className="btn btn-ghost btn-sm" onClick={() => toggleStatus(service)}>
                                        {service.status === "active" ? "Pause" : "Activate"}
                                    </button>
                                    <button className="btn btn-ghost btn-danger btn-sm" onClick={() => remove(service)}>
                                        Delete
                                    </button>
                                </div>
                            </article>
                        )
                    )}
                </div>
            )}
        </div>
    );
}
