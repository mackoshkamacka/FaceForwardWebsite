import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// Components
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoute from './components/ProtectedRoute';
import ArtistDashboard from './components/ArtistDashboard';
import PatientDashboard from './components/patient-and-hospital/PatientDashboard';
import HospitalDashboard from './components/HospitalDashboard'; 

function App() {
  return (
    <Router>
      <div className="App">
        {/* Simple Navbar */}
        <nav style={{ padding: '1rem' }}>
          <Link to="/" style={{ marginRight: '1rem' }}>Signup</Link>
          <Link to="/login">Login</Link>
        </nav>

        {/* Routes */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route 
            path="/patient-dashboard" 
            element={
              <ProtectedRoute role="patient">
                <PatientDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/artist-dashboard" 
            element={
              <ProtectedRoute role="artist"> 
                <ArtistDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/hospital-dashboard" 
            element={
              <ProtectedRoute role="hospital"> 
                <HospitalDashboard />
              </ProtectedRoute>
            } 
          />


          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
