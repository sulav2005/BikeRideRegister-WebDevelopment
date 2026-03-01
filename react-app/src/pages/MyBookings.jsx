// src/pages/MyBookings.jsx
import { useState } from 'react';
import { useRole } from '../context/RoleContext';
import { useRide } from '../context/RideContext';
import Navbar from '../components/Navbar';
import RiderProtectedRoute from '../components/RiderProtectedRoute';
import './MyBookings.css';

const MyRegistrations = () => {
  const { currentUser } = useRole();
  const { rides, unregisterRider } = useRide();
  const [cancellingId, setCancellingId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedRideToCancel, setSelectedRideToCancel] = useState(null);

  // Filter rides where current user is registered
  const myRegistrations = rides.filter(ride => 
    ride.registeredRiders && 
    ride.registeredRiders.some(rider => rider.email === currentUser?.email)
  );

  const handleCancelClick = (ride) => {
    setSelectedRideToCancel(ride);
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = () => {
    if (selectedRideToCancel && currentUser) {
      unregisterRider(selectedRideToCancel.id, currentUser.email);
      setCancellingId(null);
      setShowConfirmModal(false);
      setSelectedRideToCancel(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <RiderProtectedRoute>
      <div>
        <Navbar />
        <div className="confirmed-registrations-wrapper">
          <div className="confirmed-header">
            <h1>✅ Confirmed Registrations</h1>
            <p className="subtitle">Your registered bike tours and rides</p>
          </div>

          {myRegistrations.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏍️</div>
              <h2>No Confirmed Registrations Yet</h2>
              <p>You haven't registered for any rides yet. Browse available rides and register to join the adventure!</p>
              <a href="/" className="btn-browse">Browse Rides</a>
            </div>
          ) : (
            <div className="registrations-container">
              <div className="registrations-count">
                You have <strong>{myRegistrations.length}</strong> confirmed registration{myRegistrations.length !== 1 ? 's' : ''}
              </div>
              
              <div className="registrations-grid">
                {myRegistrations.map(ride => (
                  <div key={ride.id} className="registration-card">
                    <div className="card-header">
                      <h3 className="ride-title">{ride.title}</h3>
                      <span className={`status-badge status-${ride.status}`}>
                        {ride.status === 'active' ? '🟢 Active' : '🔴 Closed'}
                      </span>
                    </div>

                    <div className="card-body">
                      <div className="info-row">
                        <span className="label">📍 Location:</span>
                        <span className="value">{ride.location}</span>
                      </div>

                      <div className="info-row">
                        <span className="label">📅 Date:</span>
                        <span className="value">{formatDate(ride.date)}</span>
                      </div>

                      <div className="info-row">
                        <span className="label">🏢 Organizer:</span>
                        <span className="value">{ride.organizer}</span>
                      </div>

                      <div className="info-row">
                        <span className="label">💰 Price:</span>
                        <span className="value price">₹{ride.price}</span>
                      </div>

                      <div className="info-row">
                        <span className="label">👥 Participants:</span>
                        <span className="value">{ride.registrations} / {ride.totalSeats}</span>
                      </div>

                      <div className="info-row">
                        <span className="label">📊 Status:</span>
                        <span className="value status-text">
                          {ride.status === 'active' ? '✅ Registration Open' : '🔒 Registration Closed'}
                        </span>
                      </div>
                    </div>

                    <div className="card-footer">
                      <button 
                        className="btn-cancel"
                        onClick={() => handleCancelClick(ride)}
                        disabled={cancellingId === ride.id}
                      >
                        {cancellingId === ride.id ? '⏳ Cancelling...' : '❌ Cancel Registration'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && selectedRideToCancel && (
          <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
            <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>⚠️ Cancel Registration?</h2>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to cancel your registration for:</p>
                <p className="ride-name"><strong>{selectedRideToCancel.title}</strong></p>
                <p className="ride-date">📅 {formatDate(selectedRideToCancel.date)}</p>
                <p className="warning-text">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Keep Registration
                </button>
                <button 
                  className="btn-danger"
                  onClick={handleConfirmCancel}
                >
                  Yes, Cancel Registration
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RiderProtectedRoute>
  );
};

export default MyRegistrations;