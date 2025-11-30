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
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [appointmentTime, setAppointmentTime] = useState('10:00');
    const [appointmentLocation, setAppointmentLocation] = useState('Face Forward LA Clinic');
    const [isApproving, setIsApproving] = useState(false);

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
            setLoading(false);
        }, (error) => {
            console.error("Error fetching requests:", error);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const handleStatusUpdate = async (requestId, newStatus) => {
        try {
            await updateDoc(doc(db, 'requests', requestId), {
                status: newStatus,
                updatedAt: new Date()
            });
            alert('Request status updated!');
        } catch (error) {
            console.error('Error updating request:', error);
            alert('Failed to update status');
        }
    };

    const handleApproveRequest = async (requestId) => {
        if (isApproving) return; // Prevent double-clicks
        
        setIsApproving(true);
        try {
            // Send the confirmation email (API will also update status to approved)
            const response = await fetch('/api/send-appointment-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    requestId: requestId,
                    appointmentTime: appointmentTime,
                    location: appointmentLocation,
                    duration: 60,
                }),
            });

            const result = await response.json();

            if (result.success) {
                alert('Request approved and confirmation email sent!');
                setSelectedRequest(null); // Close modal
            } else {
                console.error('Failed to send email:', result.error);
                alert(`Failed to approve request: ${result.error}`);
            }
        } catch (error) {
            console.error('Error approving request:', error);
            alert('Failed to approve request. Please try again.');
        } finally {
            setIsApproving(false);
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
                <label className="filterLabel">Filter by status: </label>
                <select className="filterBox" value={filter} onChange={(e) => setFilter(e.target.value)}>
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
                            onClick={() => {
                                setSelectedRequest(request);
                                // Reset appointment details when opening modal
                                setAppointmentTime(request.appointmentTime || '10:00');
                                setAppointmentLocation('Face Forward LA Clinic');
                            }}
                        >
                            <h3 className="serviceHeader">{request.serviceName}</h3>
                            <div className="sub">
                                <p className="blob">Status: {request.status}</p>
                                <p className="blob">Date: {request.requestedDate}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedRequest && (
                <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
                    <div className="modal-content2" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-footer">
                            <button className="btn btn-close" onClick={() => setSelectedRequest(null)}>
                                X
                            </button>
                        </div>
                        
                        <h2 className="serviceName">{selectedRequest.serviceName}</h2>
                        
                        <div className="request-details">
                            <div className="stats">
                                <div className="personalInformation">
                                    <h3 className="modalHeader3">Client Information</h3>
                                    <p><strong>Name:</strong> {selectedRequest.name}</p>
                                    <p><strong>Email:</strong> {selectedRequest.email}</p>
                                    <p><strong>Type:</strong> {selectedRequest.type}</p>
                                    {selectedRequest.numberOfPatients && (
                                        <p><strong>Number of Patients:</strong> {selectedRequest.numberOfPatients}</p>
                                    )}
                                </div>
                                <div className="requestInformation">
                                    <h3 className="modalHeader3">Request Details</h3>
                                    <p><strong>Requested Date:</strong> {selectedRequest.requestedDate}</p>
                                    <p><strong>Status:</strong> {selectedRequest.status}</p>
                                    <p><strong>Created:</strong> {selectedRequest.createdAt?.toDate().toLocaleDateString()}</p>


                                    {selectedRequest.updatedAt && (
                                        <p><strong>Updated:</strong> {selectedRequest.updatedAt?.toDate().toLocaleDateString()}</p>
                                    )}
                                </div>
                            </div>
                            <p className="requestNotes"><strong>Notes:</strong> {selectedRequest.notes || 'No additional notes'}</p>
                        </div>

                        {/* Appointment details for approval */}
                        {selectedRequest.status === 'pending' && (
                            <div className="appointment-details">
                                <h3 className="modalHeader3">Appointment Details</h3>
                                <div className="appointment-inputs">
                                    <div className="input-group">
                                        <label><strong>Time:</strong></label>
                                        <input
                                            type="time"
                                            value={appointmentTime}
                                            onChange={(e) => setAppointmentTime(e.target.value)}
                                            className="time-input"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label><strong>Location:</strong></label>
                                        <input
                                            type="text"
                                            value={appointmentLocation}
                                            onChange={(e) => setAppointmentLocation(e.target.value)}
                                            className="location-input"
                                            placeholder="Enter location"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

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
                                onClick={() => handleApproveRequest(selectedRequest.id)}
                                disabled={selectedRequest.status === 'approved' || isApproving}
                            >
                                {isApproving ? 'Approving...' : 'Approve & Send Email'}
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
                    </div>
                </div>
            )}
        </div>
    );
}