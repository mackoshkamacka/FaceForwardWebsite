import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // 1. Authenticate
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            
            // 2. Get user document
            const userDocRef = doc(db, "users", userCred.user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) {
                throw new Error("User document not found");
            }

            // 3. Get role and redirect
            const userData = userDocSnap.data();
            const userRole = userData.role;
            
            navigate(userRole === "artist" ? "/artist-dashboard" : "/patient-dashboard");
            
        } catch (err) {
            console.error("Full error:", err);
            alert(`Login failed: ${err.message}`);
        }
    };
    
    return (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
    );
}
  