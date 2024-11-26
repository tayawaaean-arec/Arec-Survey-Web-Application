import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/MainDashboard';
import CreateAccountPage from './pages/CreateAccountPage';
import SocioEcon from './pages/SocioEconData';
import Technical from './pages/TechnicalData';
import About from './pages/About';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/socio-econ" element={<SocioEcon />} />
        <Route path="/technical" element={<Technical />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
