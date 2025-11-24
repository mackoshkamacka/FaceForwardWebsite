"use client";

import "./styling/ServiceRequest.css";

import { useState, useEffect } from "react";
import { db, auth } from "../../../src/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    getDocs,
    query,
    where,
    addDoc,
    doc,
    getDoc,
    Timestamp,
} from "firebase/firestore";

export default function ServiceRequest() {
    const [userType, setUserType] = useState(null);
    const [userData, setUserData] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);

    // Patient-specific fields
    const [patientForm, setPatientForm] = useState({
        service: "makeup",
        hospital: "",
        notes: "",
    });

    // Hospital-specific fields
    const [hospitalForm, setHospitalForm] = useState({
        date: "",
        notes: "",
        numberOfPatients: 1,
    });

    // Wait for auth state to be ready
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("Auth state changed:", user?.uid);
            setCurrentUser(user);
            if (!user) {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    // Fetch user data and get their role once auth is ready
    useEffect(() => {
        const fetchUserData = async () => {
            if (!currentUser) {
                console.log("No authenticated user");
                return;
            }

            try {
                console.log("Fetching user data for:", currentUser.uid);
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    console.log("User data:", data);
                    console.log("User role:", data.role);
                    setUserData(data);
                    setUserType(data.role);
                } else {
                    console.log("User document does not exist");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
            setLoading(false);
        };

        if (currentUser) {
            fetchUserData();
        }
    }, [currentUser]);

    // Fetch all active services (for hospitals)
    useEffect(() => {
        if (userType === "hospital") {
            const fetchServices = async () => {
                const q = query(collection(db, "services"), where("status", "==", "active"));
                const snapshot = await getDocs(q);
                setServices(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            };
            fetchServices();
        }
    }, [userType]);

    // Handle Patient Request Submission
    const handlePatientSubmit = async (e) => {
        e.preventDefault();
        
        // Add validation checks
        if (!currentUser) {
            alert("Please log in to submit a request");
            return;
        }
    
        if (!patientForm.service || !patientForm.hospital) {
            alert("Please fill in all required fields");
            return;
        }
    
        try {
            await addDoc(collection(db, "requests"), {
                type: "patient",
                userId: currentUser.uid,
                name: userData?.name || currentUser.displayName || "Patient",
                email: currentUser.email,
                serviceName: patientForm.service,
                hospital: patientForm.hospital,
                notes: patientForm.notes || "", // Ensure notes is never undefined
                status: "pending",
                createdAt: Timestamp.now(),
            });
            
            alert("Request submitted successfully!");
            setSubmitted(true);
            setPatientForm({ service: "makeup", hospital: "", notes: "" });
        } catch (error) {
            console.error("Error submitting request:", error);
            console.error("Error details:", error.message);
            alert(`Failed to submit request: ${error.message}`);
        }
    };

    // Handle Hospital Request Submission
    const handleHospitalSubmit = async () => {
        if (!selectedService) {
            alert("Please select a service");
            return;
        }

        if (!hospitalForm.date) {
            alert("Please select a date");
            return;
        }

        try {
            await addDoc(collection(db, "requests"), {
                type: "hospital",
                serviceId: selectedService.id,
                artistId: selectedService.artistId,
                userId: currentUser.uid,
                name: userData?.name || currentUser.displayName || "Unknown Hospital",
                email: currentUser.email,
                serviceName: selectedService.title,
                status: "pending",
                requestedDate: hospitalForm.date,
                numberOfPatients: hospitalForm.numberOfPatients,
                notes: hospitalForm.notes,
                createdAt: Timestamp.now(),
            });

            alert("Hospital request submitted!");
            setSelectedService(null);
            setSubmitted(true);
            setHospitalForm({ date: "", notes: "", numberOfPatients: 1 });
        } catch (error) {
            console.error("Error submitting request:", error);
            alert("Failed to submit request");
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading...</p>
            </div>
        );
    }

    // Not authenticated
    if (!currentUser) {
        return (
            <div className="error-message">
                <p>Please log in to request services.</p>
            </div>
        );
    }

    // No role found
    if (!userType) {
        return (
            <div className="error-message">
                <p>Unable to determine user role.</p>
                <p>User ID: {currentUser?.uid}</p>
                <p>User Data: {userData ? JSON.stringify(userData) : "No data found"}</p>
                <p>Please contact support or update your profile.</p>
            </div>
        );
    }

    // Success message
    if (submitted) {
        return (
            <div className="success-message">
                <p>Your request has been submitted successfully!</p>
                <button onClick={() => setSubmitted(false)}>Submit Another Request</button>
            </div>
        );
    }

    // PATIENT FORM
    if (userType === "patient") {
        return (
            <div className="request-container">
                <h2>Request a Service</h2>
                <form onSubmit={handlePatientSubmit}>
                    <div className="form-group">
                        <label>Service:*</label>
                        <select
                            value={patientForm.service}
                            onChange={(e) => setPatientForm({ ...patientForm, service: e.target.value })}
                            required
                        >
                            <option value="makeup">Makeup</option>
                            <option value="face-painting">Face Painting</option>
                            <option value="manicure">Manicure</option>
                            <option value="hair-styling">Hair Styling</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Hospital / Location:*</label>
                        <input
                            type="text"
                            value={patientForm.hospital}
                            onChange={(e) => setPatientForm({ ...patientForm, hospital: e.target.value })}
                            placeholder="Enter hospital or location name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Additional Notes:</label>
                        <textarea
                            value={patientForm.notes}
                            onChange={(e) => setPatientForm({ ...patientForm, notes: e.target.value })}
                            placeholder="Optional details like event, room #, etc."
                            rows="4"
                        />
                    </div>

                    <button type="submit" className="submit-btn">Submit Request</button>
                </form>
            </div>
        );
    }

    // HOSPITAL FORM
    if (userType === "hospital") {
        return (
            <div className="request-container">
                <h2>Available Artist Services</h2>
                
                {services.length === 0 ? (
                    <div className="empty-state">
                        <p>No services available at the moment.</p>
                        <p>Please check back later.</p>
                    </div>
                ) : (
                    <div className="services-grid">
                        {services.map((service) => (
                            <div key={service.id} className="service-card">
                                <h3>{service.title}</h3>
                                <p className="description">{service.description}</p>
                                <p className="price">Price: ${service.price}</p>
                                <p className="type">Type: {service.type}</p>
                                <button 
                                    className="request-service-btn"
                                    onClick={() => setSelectedService(service)}
                                >
                                    Request Service
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Hospital Request Modal */}
                {selectedService && (
                    <div className="modal-overlay" onClick={() => setSelectedService(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3>Hospital Request: {selectedService.title}</h3>
                            
                            <div className="form-group">
                                <label>Preferred Date:*</label>
                                <input
                                    type="date"
                                    value={hospitalForm.date}
                                    onChange={(e) =>
                                        setHospitalForm({ ...hospitalForm, date: e.target.value })
                                    }
                                    min={new Date().toISOString().split("T")[0]}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Number of Patients:*</label>
                                <input
                                    type="number"
                                    value={hospitalForm.numberOfPatients}
                                    onChange={(e) =>
                                        setHospitalForm({
                                            ...hospitalForm,
                                            numberOfPatients: Number(e.target.value),
                                        })
                                    }
                                    min="1"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Additional Notes:</label>
                                <textarea
                                    value={hospitalForm.notes}
                                    onChange={(e) =>
                                        setHospitalForm({ ...hospitalForm, notes: e.target.value })
                                    }
                                    placeholder="Any special requirements or details"
                                    rows="4"
                                />
                            </div>

                            <div className="modal-actions">
                                <button onClick={handleHospitalSubmit} className="submit-btn">
                                    Submit Hospital Request
                                </button>
                                <button onClick={() => setSelectedService(null)} className="cancel-btn">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Fallback for unknown role
    return (
        <div className="error-message">
            <p>Unknown user role: {userType}</p>
            <p>Please contact support.</p>
        </div>
    );
}