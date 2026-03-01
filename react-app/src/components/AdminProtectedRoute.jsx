// src/components/AdminProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';

const AdminProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useRole();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  // If not authenticated, redirect to admin login
  if (!currentUser) {
    return <Navigate to="/admin/login" />;
  }

  // If not admin, show access denied
  if (currentUser.role !== 'admin') {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1>🚫 Access Denied</h1>
        <p>Only administrators can access this page.</p>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>Your role: <strong>{currentUser.role.toUpperCase()}</strong></p>
        <a href="/" style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Go back to Home</a>
      </div>
    );
  }

  return children;
};

export default AdminProtectedRoute;
