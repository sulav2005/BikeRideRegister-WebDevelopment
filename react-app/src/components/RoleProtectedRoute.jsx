// src/components/RoleProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';

const RoleProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { currentUser, loading } = useRole();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  // If not authenticated, redirect to appropriate login
  if (!currentUser) {
    // Default to rider login
    return <Navigate to="/login" />;
  }

  // Check if user has required role
  if (requiredRoles.length > 0 && !requiredRoles.includes(currentUser.role)) {
    // User is logged in but doesn't have required role
    return (
      <div style={{ textAlign: 'center', padding: '2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1>🚫 Access Denied</h1>
        <p>You do not have permission to access this page.</p>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>Your role: <strong>{currentUser.role.toUpperCase()}</strong></p>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>Required role(s): <strong>{requiredRoles.map(r => r.toUpperCase()).join(', ')}</strong></p>
        <a href="/" style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Go back to Home</a>
      </div>
    );
  }

  return children;
};

export default RoleProtectedRoute;
