import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// Components
import Signup from "../app/components/noLogin/Signup";
import Login from "../app/components/noLogin/Login";
import ProtectedRoute from '../app/components/ProtectedRoute';
import ArtistDashboard from '../app/components/artist/ArtistDashboard';
import PatientDashboard from '../app/components/patient-and-hospital/PatientDashboard';
import HospitalDashboard from '../app/components/patient-and-hospital/HospitalDashboard'; 
import Home from "../app/components/noLogin/Home"; 
import About from "../app/components/noLogin/About"; 

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="navBar">
            <Link to="/" style={{ padding: '0.5rem' }}>Home</Link>
            <Link to="/about" style={{ padding: '0.5rem' }} >About</Link>
            <Link to="/signup" style={{ padding: '0.5rem' }}>Signup</Link>
            <Link to="/login" style={{ padding: '0.5rem' }}>Login</Link>
        </nav>

        {/* Routes */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
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
