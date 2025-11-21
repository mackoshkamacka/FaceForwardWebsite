"use client";

import "./styling/ArtistRequest.css";

import { useState, useEffect } from 'react';
import { db, auth } from '../../../src/firebase';
import {
    collection, query, where,
    updateDoc, doc,
    onSnapshot
} from 'firebase/firestore';

export default function ArtistRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [filter, setFilter] = useState('all');
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        if (!auth.currentUser) {
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'requests'),
            where('artistId', '==', auth.currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setRequests(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
            setLoading(false); // Set loading to false when data arrives
        }, (error) => {
            console.error("Error fetching requests:", error);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const handleStatusUpdate = async (requestId, newStatus) => {
        try {
            await updateDoc(doc(db, 'requests', requestId), {
                status: newStatus
            });
            alert('Request status updated!');
        } catch (error) {
            console.error('Error updating request:', error);
            alert('Failed to update status');
        }
    };

    const filteredRequests = requests.filter(req =>
        filter === 'all' || req.status === filter
    );

    // Loading state UI
    if (loading) {
        return (
            <div className="artist-requests">
                <h2 className="requestHeader">Service Requests</h2>
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Loading your requests...</p>
                </div>
            </div>
        );
    }

    // Empty state UI
    if (requests.length === 0) {
        return (
            <div className="artist-requests">
                <h2 className="requestHeader">Service Requests</h2>
                <div className="empty-state">
                    <p>No service requests yet.</p>
                    <p>Requests will appear here when clients book your services!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="artist-requests">
            <h2 className="requestHeader">Service Requests</h2>
            
            <div className="filter">
                <label>Filter by status: </label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {filteredRequests.length === 0 ? (
                <div className="empty-state">
                    <p>No {filter} requests found.</p>
                    <p>Try selecting a different filter.</p>
                </div>
            ) : (
                <div className="requests-grid">
                    {filteredRequests.map(request => (
                        <div
                            key={request.id}
                            className="request-card"
                            onClick={() => setSelectedRequest(request)}
                        >
                            <h3 className="serviceHeader">{request.serviceTitle}</h3>
                            <div className="sub">
                                <p className="blob">Status: {request.status}</p>
                                <p className="blob">Date: {request.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedRequest && (
                <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedRequest.serviceTitle}</h2>
                        <div className="request-details">
                            <div className="stats">
                                <div className="personalInformation">
                                    <h3>Client Information</h3>
                                    <p><strong>Name:</strong> {selectedRequest.clientName}</p>
                                    <p><strong>Email:</strong> {selectedRequest.clientEmail}</p>
                                    <p><strong>Phone:</strong> {selectedRequest.clientPhone}</p>
                                </div>
                                <div className="requestInformation">
                                    <h3>Request Details</h3>
                                    <p><strong>Date:</strong> {selectedRequest.date}</p>
                                    <p><strong>Time:</strong> {selectedRequest.time}</p>
                                    <p><strong>Status:</strong> {selectedRequest.status}</p>
                                </div>
                            </div>
                            <p><strong>Notes:</strong> {selectedRequest.notes || 'No additional notes'}</p>
                        </div>

                        <div className="status-buttons">
                            <button
                                className={`btn btn-pending ${selectedRequest.status === 'pending' ? 'btn-disabled' : ''}`}
                                onClick={() => handleStatusUpdate(selectedRequest.id, 'pending')}
                                disabled={selectedRequest.status === 'pending'}
                            >
                                Mark Pending
                            </button>
                            <button
                                className={`btn btn-approve ${selectedRequest.status === 'approved' ? 'btn-disabled' : ''}`}
                                onClick={() => handleStatusUpdate(selectedRequest.id, 'approved')}
                                disabled={selectedRequest.status === 'approved'}
                            >
                                Approve
                            </button>
                            <button
                                className={`btn btn-complete ${selectedRequest.status === 'completed' ? 'btn-disabled' : ''}`}
                                onClick={() => handleStatusUpdate(selectedRequest.id, 'completed')}
                                disabled={selectedRequest.status === 'completed'}
                            >
                                Complete
                            </button>
                            <button
                                className={`btn btn-reject ${selectedRequest.status === 'rejected' ? 'btn-disabled' : ''}`}
                                onClick={() => handleStatusUpdate(selectedRequest.id, 'rejected')}
                                disabled={selectedRequest.status === 'rejected'}
                            >
                                Reject
                            </button>
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-close"
                                onClick={() => setSelectedRequest(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}