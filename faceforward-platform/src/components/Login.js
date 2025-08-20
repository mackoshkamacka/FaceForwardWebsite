import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); //Allows for page changing (e.g. go to /artist-dashboard is login is valid, and artist)

    const handleLogin = async (e) => {
        e.preventDefault(); //Stops page from refreshing
        try {
            //Authenticate = ensure that the password, and email match the Firebase Authentication
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            
            //Assuming userCred it correct, userDocRef makes reference to the user's document in Firestore
            //then getDoc(userDocRef) actually fetches the document 
            const userDocRef = doc(db, "users", userCred.user.uid);
            const userDocSnap = await getDoc(userDocRef);

            //If anything goes wrong (causing the userDocSnap to not exist), an error is thrown
            if (!userDocSnap.exists()) {
                throw new Error("User document not found");
            }

            //Gets the data from the userDocSnap, then gets the role
            const userData = userDocSnap.data();
            const userRole = userData.role;
            
            //With the userRole, navigation proceeds. 
            if (userRole === "artist") {
                navigate("/artist-dashboard");
              } else if (userRole === "patient") {
                navigate("/patient-dashboard");
              } else if (userRole === "hospital") {
                navigate("/hospital-dashboard");
              } else {
                navigate("/"); // fallback if role is undefined
            }
            
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
  