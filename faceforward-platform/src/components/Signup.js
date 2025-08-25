import React, { useState } from "react"; 
import {createUserWithEmailAndPassword } from "firebase/auth"; 
import { auth, db } from "../firebase"; 
import { setDoc, doc } from "firebase/firestore"; 

export default function Signup() {                  //Component setup (exports a function when called)
    const [email, setEmail] = useState('');         //Each useState creates pieces of state 
    const [password, setPassword] = useState('');   //email, password, role, name = pieces of state  
    const [role, setRole] = useState("patient");    //set_X_ updates the values when inputs change 
    const [name, setName] = useState('');           //Note: state = data component keeps track of i.e. memory (React rerenders it) 
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false); 
    
    const handleSignup = async (e) => {             //Signup function runs when form is 'submitted' 
        e.preventDefault();                         //Prevents browser from reloading the page 
        setError(null);                             //"There are no errors"
        setLoading(true);                           //"Signup is still in progress"

        try {
            //Calls Firebase Auth to create a new user account with the given email and password 
            //Returns a userCred object (containing user, uid, etc.)
            const userCred = await createUserWithEmailAndPassword(auth, email, password); 
            
            //Creates a user document in Firestore - under collection "users" with 'uid' as the document ID
            //Stores email, name, role and creation date 
            await setDoc(doc(db, "users", userCred.user.uid), {
                email, 
                name, 
                role, 
                createdAt: new Date()
            }); 

            try {
                //Send welcome email
                await fetch('/api/sendWelcomeEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName: name.split(' ')[0], //take first name only
                        email: email
                    })
                });
            
                alert("Sign up successful, email sent!");
            
            } catch (err) {
                console.error("Failed to send welcome email:", err);
                alert("Sign up successful, but email failed to send.");
            }


        } catch (err) {
            console.error("Error code:", err.code, "Message:", err.message);
            setError(err.message); //Error state updated (no longer null)
            
            // Specific error messages
            if (err.code === "auth/email-already-in-use") {
                alert("This email is already registered.");
            } else if (err.code === "auth/weak-password") {
                alert("Password should be at least 6 characters.");
            } else {
                alert("Signup failed: " + err.message);
            }
        } finally { 
            setLoading(false); //Submission "complete" - state updated.
        }
    }; //handleSignup function is now defined 

    //The SignUp() returns the following: 
    return (
        <form onSubmit={handleSignup}> {/*form is rendered, and when it is submitted, runs handleSignup*/} 
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
              <option value = "hospital">Hospital Management</option>
            </select>     
            <button type = "submit">Sign Up</button>
        </form>
    ); 
}
