import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LeadFormPage from './pages/LeadFormPage';
import ThankYouPage from './pages/ThankYouPage';
import AdminLoginPage from './pages/AdminLoginPage';
import DashboardPage from './pages/DashboardPage';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();
  if (loading) return <div className="page-loader"><div className="loader-ring"></div></div>;
  return admin ? children : <Navigate to="/admin/login" replace />;
};

const PublicAdminRoute = ({ children }) => {
  const { admin, loading } = useAuth();
  if (loading) return <div className="page-loader"><div className="loader-ring"></div></div>;
  return admin ? <Navigate to="/admin/dashboard" replace /> : children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LeadFormPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/admin/login" element={<PublicAdminRoute><AdminLoginPage /></PublicAdminRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
