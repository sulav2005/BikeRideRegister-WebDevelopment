// src/context/RoleContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for logged-in user from localStorage
    const riderUser = localStorage.getItem('riderUser');
    const organizerUser = localStorage.getItem('organizerUser');
    const adminUser = localStorage.getItem('adminUser');

    if (riderUser) {
      setCurrentUser(JSON.parse(riderUser));
    } else if (organizerUser) {
      setCurrentUser(JSON.parse(organizerUser));
    } else if (adminUser) {
      setCurrentUser(JSON.parse(adminUser));
    }

    setLoading(false);
  }, []);

  const loginRider = (userData) => {
    const riderData = { ...userData, role: 'rider' };
    localStorage.setItem('riderUser', JSON.stringify(riderData));
    setCurrentUser(riderData);
  };

  const loginOrganizer = (userData) => {
    const organizerData = { ...userData, role: 'organizer' };
    localStorage.setItem('organizerUser', JSON.stringify(organizerData));
    setCurrentUser(organizerData);
  };

  const loginAdmin = (userData) => {
    const adminData = { ...userData, role: 'admin' };
    localStorage.setItem('adminUser', JSON.stringify(adminData));
    setCurrentUser(adminData);
  };

  const logout = () => {
    localStorage.removeItem('riderUser');
    localStorage.removeItem('organizerUser');
    localStorage.removeItem('adminUser');
    setCurrentUser(null);
  };

  const hasRole = (role) => currentUser?.role === role;
  const hasAnyRole = (roles) => currentUser && roles.includes(currentUser.role);

  return (
    <RoleContext.Provider value={{ currentUser, loading, loginRider, loginOrganizer, loginAdmin, logout, hasRole, hasAnyRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within RoleProvider');
  }
  return context;
};

export default RoleContext;
