import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../../src/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ProtectedRoute({ children, role }) {
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true); // New loading state
  
    useEffect(() => {
      const fetchRole = async () => {
        try {
          if (auth.currentUser) {
            const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
            setUserRole(userDoc.data()?.role);
          }
        } catch (error) {
          console.error("Role fetch error:", error);
        } finally {
          setLoading(false); // Always set loading to false
        }
      };
      fetchRole();
    }, []);
  
    if (loading) {
      return <div>Verifying permissions...</div>; // Show loader
    }
  
    if (!auth.currentUser) {
      return <Navigate to="/login" replace />;
    }
  
    if (role && userRole !== role) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  }