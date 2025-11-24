"use client"; 

import "./styling/ArtistServices.css"

import { useState, useEffect } from 'react';
import { db, auth } from '../../../src/firebase';
import {
    collection, query, where,
    updateDoc, doc, deleteDoc,
    onSnapshot
} from 'firebase/firestore';

export default function ArtistServicesList() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [editingService, setEditingService] = useState(null);
    const [editForm, setEditForm] = useState({
        title: '',
        description: '',
        price: '',
        type: 'makeup',
        status: 'active'
    });

    useEffect(() => {
        if (!auth.currentUser) {
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'services'),
            where('artistId', '==', auth.currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setServices(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
            setLoading(false); // Set loading to false when data arrives
        }, (error) => {
            console.error("Error fetching services:", error);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const handleEditClick = (service) => {
        setEditingService(service);
        setEditForm({
            title: service.title,
            description: service.description,
            price: service.price.toString(),
            type: service.type,
            status: service.status
        });
    };

    const handleUpdate = async () => {
        if (!editingService) return;

        try {
            await updateDoc(doc(db, 'services', editingService.id), {
                ...editForm,
                price: Number(editForm.price)
            });
            setEditingService(null);
            alert('Service updated successfully!');
        } catch (error) {
            console.error('Error updating service:', error);
            alert(`Update failed: ${error.message}`);
        } 
    };

    const handleDelete = async (serviceId) => {
        if (window.confirm('Permanently delete this service?')) {
            try {
                await deleteDoc(doc(db, 'services', serviceId));
            } catch (error) {
                console.error('Error deleting service:', error);
                alert('Delete failed: Missing permissions');
            }
        }
    };

    // Loading state UI
    if (loading) {
        return (
            <div className="artist-services">
                <h2 className="manageHeader">Manage Services</h2>
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Loading your services...</p>
                </div>
            </div>
        );
    }

    // Empty state UI
    if (services.length === 0) {
        return (
            <div className="artist-services">
                <h2 className="manageHeader">Manage Services</h2>
                <div className="empty-state">
                    <p>You haven't created any services yet.</p>
                    <p>Create your first service above to get started!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="artist-services">
            <h2 className="manageHeader">Manage Services</h2>
            <div className="services-grid">
                {services.map(service => (
                    <div key={service.id} className="service-card">
                        {editingService?.id === service.id ? (
                            <div className="edit-form">
                                <label>
                                    Title:
                                    <input
                                        value={editForm.title}
                                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                        required
                                    />
                                </label>
                                <label>
                                    Description:
                                    <textarea
                                        value={editForm.description}
                                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                        required
                                    />
                                </label>
                                <label>
                                    Price ($):
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={editForm.price}
                                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                        required
                                    />
                                </label>
                                <label>
                                    Type:
                                    <select
                                        value={editForm.type}
                                        onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                                    >
                                        <option value="makeup">Makeup</option>
                                        <option value="face-painting">Face Painting</option>
                                        <option value="manicure">Manicure</option>
                                        <option value="hair-styling">Hair Styling</option>
                                    </select>
                                </label>
                                <div className="form-actions">
                                    <button onClick={handleUpdate}>Save Changes</button>
                                    <button onClick={() => setEditingService(null)}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h3 className="serviceHeader">{service.title}</h3>
                                <p className = "manageDesc">Description: {service.description}</p>
                                <div className = "manageInfoContainer">
                                    <p className = "manageInfo"> ${service.price}</p>
                                    <p className = "manageInfo"> {service.type}</p>
                                    <p className = "manageInfo"> {service.status}</p>
                                </div>
                                

                                <div className="card-actions">
                                    <button
                                        onClick={() => handleEditClick(service)}
                                        className="edit-btn"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service.id)}
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}