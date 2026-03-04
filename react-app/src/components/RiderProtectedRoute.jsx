// src/components/RiderProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useRole } from '../context/RoleContext';

const RiderProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useRole();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  // If not authenticated, redirect to rider login and preserve destination
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If not a rider, show access denied
  if (currentUser.role !== 'rider') {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1>🚫 Access Denied</h1>
        <p>Only registered riders can access this page.</p>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>Your role: <strong>{currentUser.role.toUpperCase()}</strong></p>
        <a href="/" style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Go back to Home</a>
      </div>
    );
  }

  return children;
};

export default RiderProtectedRoute;
