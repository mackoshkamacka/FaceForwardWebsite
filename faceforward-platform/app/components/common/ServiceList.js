"use client"; 

import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, where, addDoc, doc, getDoc } from 'firebase/firestore';
import { auth } from '../../firebase';

export default function ServiceList() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [requestDetails, setRequestDetails] = useState({
        date: '',
        notes: ''
    });
    const [userData, setUserData] = useState(null);

    //Fetch user data when component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.currentUser) {
                const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                }
            }
        };
        fetchUserData();
    }, []);

    //Fetch all active services
    useEffect(() => {
        const fetchServices = async () => {
            const q = query(
                collection(db, 'services'),
                where('status', '==', 'active')
            );
            const snapshot = await getDocs(q);
            setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchServices();
    }, []);

    const handleRequest = async () => {
        try {
            await addDoc(collection(db, 'requests'), {
                type: 'patient',
                serviceId: selectedService.id,
                artistId: selectedService.artistId,
                userId: auth.currentUser.uid,
                name: userData?.name || userData?.displayName || 'Unknown', // Use from userData
                email: auth.currentUser.email, // From auth
                serviceName: selectedService.title, // Add service name for easier display
                status: 'pending',
                requestedDate: requestDetails.date,
                notes: requestDetails.notes,
                createdAt: new Date()
            });
            alert('Request submitted successfully!');
            setSelectedService(null);
        } catch (error) {
            console.error('Error submitting request:', error);
            alert('Failed to submit request');
        }
    };

    return (
        <div className="services-container">
            <h2>Available Services</h2>
            <div className="services-grid">
                {services.map(service => (
                    <div key={service.id} className="service-card">
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                        <p>Price: ${service.price}</p>
                        <p>Type: {service.type}</p>
                        <button onClick={() => setSelectedService(service)}>
                            Request Service
                        </button>
                    </div>
                ))}
            </div>

            {/* Request Modal */}
            {selectedService && (
                <div className="request-modal">
                    <h3>Request {selectedService.title}</h3>
                    <label>
                        Preferred Date:
                        <input
                            type="date"
                            value={requestDetails.date}
                            onChange={(e) => setRequestDetails({
                                ...requestDetails,
                                date: e.target.value
                            })}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </label>
                    <label>
                        Additional Notes:
                        <textarea
                            value={requestDetails.notes}
                            onChange={(e) => setRequestDetails({
                                ...requestDetails,
                                notes: e.target.value
                            })}
                        />
                    </label>
                    <button onClick={handleRequest}>Submit Request</button>
                    <button onClick={() => setSelectedService(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}