import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Booking from './pages/Booking';
import MyRegistrations from './pages/MyBookings';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import OrganizerLogin from './pages/OrganizerLogin';
import OrganizerDashboard from './pages/OrganizerDashboard';
import DataPage from './pages/DataPage';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import OrganizerProtectedRoute from './components/OrganizerProtectedRoute';
import RiderProtectedRoute from './components/RiderProtectedRoute';
import { RoleProvider } from './context/RoleContext';
import { RideProvider } from './context/RideContext';
import './App.css'

function App() {
  return (
    <RoleProvider>
      <RideProvider>
        <div style={{ minHeight: '100vh' }}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/booking/:id" 
              element={
                <RiderProtectedRoute>
                  <Booking />
                </RiderProtectedRoute>
              } 
            />
            <Route 
              path="/my-registrations" 
              element={
                <RiderProtectedRoute>
                  <MyRegistrations />
                </RiderProtectedRoute>
              } 
            />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              } 
            />
            <Route path="/organizer/login" element={<OrganizerLogin />} />
            <Route 
              path="/organizer" 
              element={
                <OrganizerProtectedRoute>
                  <OrganizerDashboard />
                </OrganizerProtectedRoute>
              } 
            />
            {/* data debug page */}
            <Route path="/data" element={<DataPage />} />
          </Routes>
        </Router>
        </div>
      </RideProvider>
    </RoleProvider>
  )
}

export default App
