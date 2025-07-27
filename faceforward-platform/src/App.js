import './App.css';
import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoute from './components/ProtectedRoute';
import ArtistDashboard from './components/ArtistDashboard';
import PatientDashboard from './components/PatientDashboard';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ padding: '1rem' }}>
          <Link to="/" style={{ marginRight: '1rem' }}>Signup</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/patient-dashboard" element={
            <ProtectedRoute role="patient">
                <PatientDashboard />
            </ProtectedRoute>} />
          <Route path="/artist-dashboard" element={
            <ProtectedRoute role="artist"> 
                <ArtistDashboard />
            </ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;