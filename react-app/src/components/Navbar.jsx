// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useRole();
  const isRider = currentUser?.role === 'rider';
  const isOrganizer = currentUser?.role === 'organizer';
  const isAdmin = currentUser?.role === 'admin';

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Bike Tours</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        
        {/* Unauthenticated User Links */}
        {!currentUser && <li><Link to="/register">Register</Link></li>}
        {!currentUser && <li><Link to="/login">Rider Login</Link></li>}
        
        {/* Rider Links */}
        {isRider && <li><Link to="/my-registrations">My Registrations</Link></li>}
        {isRider && <li><button onClick={handleLogout}>Logout</button></li>}
        
        {/* Organizer Links */}
        {isOrganizer && <li><Link to="/organizer">Organizer Dashboard</Link></li>}
        {isOrganizer && <li><button onClick={handleLogout}>Logout</button></li>}
        
        {/* Admin Links */}
        {isAdmin && <li><Link to="/admin/dashboard" className="admin-link">Admin Dashboard</Link></li>}
        {isAdmin && <li><Link to="/data">Data</Link></li>}
        {isAdmin && <li><button onClick={handleLogout} className="admin-logout">Admin Logout</button></li>}
        
        {/* Public Admin/Organizer Access */}
        {!isAdmin && <li><Link to="/admin/login" className="admin-link">Admin</Link></li>}
        {!isOrganizer && !isRider && <li><Link to="/organizer/login" className="organizer-link">Organizer</Link></li>}
      </ul>
    </nav>
  );
};

export default Navbar;