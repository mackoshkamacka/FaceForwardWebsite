import React, { useState } from "react"; 
import {createUserWithEmailAndPassword } from "firebase/auth"; 
import { auth, db } from "../firebase"; 
import { setDoc, doc } from "firebase/firestore"; 


export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [role, setRole] = useState("patient"); 
    const [name, setName] = useState(''); 
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false); 
    
    const handleSignup = async (e) => {
        e.preventDefault(); 
        setError(null); 
        setLoading(true); 
        try {
            //This creates a user auth
            const userCred = await createUserWithEmailAndPassword(auth, email, password); 
            
            //Creates a user dosument in Firestore 
            await setDoc(doc(db, "users", userCred.user.uid), {
                email, 
                name, 
                role, 
                createdAt: new Date()
            }); 

            //logging 
            console.log("User created:", userCred.user); 
            alert("Sign up successful"); 

        } catch (err) {
            console.error("Error code:", err.code, "Message:", err.message);
            setError(err.message);
            
            // Specific error messages
            if (err.code === "auth/email-already-in-use") {
                alert("This email is already registered.");
            } else if (err.code === "auth/weak-password") {
                alert("Password should be at least 6 characters.");
            } else {
                alert("Signup failed: " + err.message);
            }
        } finally {
            setLoading(false);
        }
    }; 

    return (
        <form onSubmit={handleSignup}>
            <input type ="name" 
                   value={name} 
                   placeholder="Name (First and Last)" 
                   onChange={(e) => setName(e.target.value)} 
                   required />
            <input type ="email" 
                   value={email} 
                   placeholder="Email" 
                   onChange={(e) => setEmail(e.target.value)} 
                   required />
            <input type = "password" 
                   value={password} 
                   placeholder = "Password" 
                   onChange={(e) => setPassword(e.target.value)} 
                   required />
            <select onChange={(e) => setRole(e.target.value)} value ={role}>
              <option value = "patient">Patient</option>
              <option value = "artist">Artist</option>   
            </select>     
            <button type = "submit">Sign Up</button>
        </form>
    ); 

}
