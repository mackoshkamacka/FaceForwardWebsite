import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 

// Firebase configuration 
const firebaseConfig = {
  apiKey: "AIzaSyClkLmkI-oPdsUgQnCmx2ErF5sRKnBBRDA",
  authDomain: "faceforwardplatform.firebaseapp.com",
  projectId: "faceforwardplatform",
  storageBucket: "faceforwardplatform.firebasestorage.app",
  messagingSenderId: "772019153036",
  appId: "1:772019153036:web:46b839500a99e754b0b3a9",
  measurementId: "G-1BP4PL9NFD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); 
export const db = getFirestore(app); 