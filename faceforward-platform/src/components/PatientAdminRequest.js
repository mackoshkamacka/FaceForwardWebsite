import React, { useState } from "react"; 
import { db, auth } from "../firebase"; 
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function PatientAdminRequest() {
    const [service, setService] = useState("makeup"); 
    const [hospital, setHospital] = useState(""); 
    const [notes, setNotes] = useState(""); 
    const [submitted, setSubmitted] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            await addDoc(collection(db, "requests"), {
                userId: auth.currentUser.uid, 
                service, 
                hospital, 
                notes, 
                status: "pending", 
                createdAt: Timestamp.now()
            }); 

            setSubmitted(true); 
        } catch (error) {
            console.error("Error submitting request: ", error); 
            alert("Something went wrong. Please try again"); 
        }
    }; 

    return (
        <div>    
          {submitted ? (
            <p>Your request has been submitted!</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                Service:
                <select value={service} onChange={(e) => setService(e.target.value)}>
                  <option value="makeup">Makeup</option>
                  <option value="face painting">Face Painting</option>
                  <option value="manicure">Manicure</option>
                  <option value="hair styling"> Hair Styling</option>
                </select>
              </label>
    
              <br />
    
              <label>
                Hospital / Location:
                <input
                  type="text"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  required
                />
              </label>
    
              <br />
    
              <label>
                Additional Notes:
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional details like event, room #, etc."
                />
              </label>
    
              <br />
    
              <button type="submit">Submit Request</button>
            </form>
          )}
        </div>
    );
}
