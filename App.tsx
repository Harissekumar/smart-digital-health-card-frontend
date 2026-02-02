
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import EmergencyScan from './pages/EmergencyScan';
import PatientDetails from './pages/PatientDetails';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import { User, UserRole } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (mockUser: User) => {
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/emergency-scan" element={<EmergencyScan />} />
        <Route path="/patient/:id" element={<PatientDetails />} />
        
        <Route element={<Layout user={user} onLogout={handleLogout} />}>
          <Route 
            path="/admin/*" 
            element={user?.role === UserRole.ADMIN ? <AdminDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/doctor/*" 
            element={user?.role === UserRole.DOCTOR ? <DoctorDashboard /> : <Navigate to="/login" />} 
          />
          <Route path="/settings" element={<Settings user={user} onLogout={handleLogout} />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
