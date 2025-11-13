"use client"; 

import "./styling/ArtistServices.css"

import { useState, useEffect } from 'react';
import { db, auth } from '../../../src/firebase';
import {
    collection, query, where,
    updateDoc, doc, deleteDoc,
    onSnapshot  // Added for real-time updates
} from 'firebase/firestore';

export default function ArtistServicesList() {
    const [services, setServices] = useState([]);
    const [editingService, setEditingService] = useState(null);
    const [editForm, setEditForm] = useState({
        title: '',
        description: '',
        price: '',
        type: 'makeup',  // Default value
        status: 'active' // Required for your rules
    });

    useEffect(() => {
        if (!auth.currentUser) return; //if not the artist, quit

        const q = query(
            collection(db, 'services'),
            where('artistId', '==', auth.currentUser.uid)
        );

        //real-time updates for artist's services, keeps listening for 
        //changes made in the database. Whenever q is added, updated, or deleted, 
        //Firestore calls the callback function to rerender UI 
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setServices(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
        });

        return unsubscribe;
    }, []);

    //allows for edits to be made 
    const handleEditClick = (service) => {
        setEditingService(service);
        setEditForm({
            title: service.title,
            description: service.description,
            price: service.price.toString(), // Ensure string for controlled input
            type: service.type,
            status: service.status // Maintain existing status
        });
    };

    const handleUpdate = async () => {
        if (!editingService) return;

        try {
            await updateDoc(doc(db, 'services', editingService.id), {
                ...editForm,
                price: Number(editForm.price) // Convert to number for Firestore
            });
            setEditingService(null);
            alert('Service updated successfully!');
        } catch (error) {
            console.error('Error updating service:', error);
            alert(`Update failed: ${error.message}`);
        }
    };

    //deletes a service if permissions are met. 
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

    return (
        <div className="artist-services">
            <h2>Manage My Services</h2>
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
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <p>Price: ${service.price}</p>
                                <p>Type: {service.type}</p>
                                <p>Status: {service.status}</p>

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