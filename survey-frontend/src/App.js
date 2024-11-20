import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/MainDashboard';
import CreateAccountPage from './pages/CreateAccountPage';
import SocioEcon from './pages/SocioEconData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/socio-econ" element={<SocioEcon />} />
      </Routes>
    </Router>
  );
}

export default App;
