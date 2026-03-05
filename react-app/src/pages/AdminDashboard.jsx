// src/pages/AdminDashboard.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { useRide } from '../context/RideContext';
import RideTable from '../components/RideTable';
import RideForm from '../components/RideForm';
import RegisteredRidersModal from '../components/RegisteredRidersModal';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { currentUser, logout } = useRole();
  const { rides, approveRide, rejectRide } = useRide();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('rides');
  const [showRideForm, setShowRideForm] = useState(false);
  const [editingRide, setEditingRide] = useState(null);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showRidersModal, setShowRidersModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  const handleRefresh = () => {
    // simple refresh to re-render / refetch data (backend endpoints may be added)
    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEditRide = (ride) => {
    setEditingRide(ride);
    setShowRideForm(true);
  };

  const handleViewRiders = (ride) => {
    setSelectedRide(ride);
    setShowRidersModal(true);
  };

  const handleCloseForm = () => {
    setShowRideForm(false);
    setEditingRide(null);
  };

  const handleApproveRide = (rideId) => {
    approveRide(rideId);
  };

  const handleRejectRide = (rideId) => {
    if (rejectionReason.trim()) {
      rejectRide(rideId, rejectionReason);
      setShowRejectForm(null);
      setRejectionReason('');
    }
  };

  const pendingRides = rides.filter(ride => !ride.approved);
  const approvedRides = rides.filter(ride => ride.approved);
  
  const totalUsers = rides ? rides.length : 0;
  const totalRegistrations = approvedRides.reduce((sum, ride) => sum + ride.registrations, 0);
  const totalRides = approvedRides.length;

  return (
    <div className="admin-dashboard-wrapper">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="admin-logo">🔐 ADMIN</div>
          <p className="app-name">Bike Tours</p>
        </div>

        <nav className="sidebar-menu">
          <button
            className={`menu-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button
            className={`menu-item ${activeTab === 'rides' ? 'active' : ''}`}
            onClick={() => setActiveTab('rides')}
          >
            🏍️ Manage Rides
          </button>
          {pendingRides.length > 0 && (
            <button
              className={`menu-item pending ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              ⏳ Pending Approvals ({pendingRides.length})
            </button>
          )}
          <button
            className={`menu-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Users
          </button>
          <button
            className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Settings
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        {/* Header */}
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="admin-header-info">
            <div className="admin-greeting">
              Welcome, <strong>{currentUser.email}</strong>
            </div>
            <div className="admin-controls">
              <div className="current-date">{new Date().toLocaleDateString()}</div>
              <button className="btn-refresh" onClick={handleRefresh}>🔄 Refresh</button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="admin-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-content overview-tab">
              <h2>Dashboard Overview</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <h3>Total Users</h3>
                    <p className="stat-number">{totalUsers}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">🏍️</div>
                  <div className="stat-info">
                    <h3>Approved Rides</h3>
                    <p className="stat-number">{totalRides}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">⏳</div>
                  <div className="stat-info">
                    <h3>Pending Approval</h3>
                    <p className="stat-number">{pendingRides.length}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">✅</div>
                  <div className="stat-info">
                    <h3>Total Registrations</h3>
                    <p className="stat-number">{totalRegistrations}</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">💰</div>
                  <div className="stat-info">
                    <h3>Revenue</h3>
                    <p className="stat-number">NPR {approvedRides.reduce((sum, ride) => sum + (ride.price * ride.registrations), 0)}</p>
                  </div>
                </div>
              </div>

              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                  <button className="action-card" onClick={() => { setActiveTab('rides'); setShowRideForm(true); }}>
                    <span className="action-icon">➕</span>
                    <span className="action-label">Add New Ride</span>
                  </button>
                  <button className="action-card" onClick={() => setActiveTab('rides')}>
                    <span className="action-icon">🏍️</span>
                    <span className="action-label">View All Rides</span>
                  </button>
                  {pendingRides.length > 0 && (
                    <button className="action-card" onClick={() => setActiveTab('pending')}>
                      <span className="action-icon">⏳</span>
                      <span className="action-label">Review Pending</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Rides Tab */}
          {activeTab === 'rides' && (
            <div className="tab-content rides-tab">
              <div className="rides-header">
                <h2>Manage Approved Rides</h2>
                <button 
                  className="btn-add-ride"
                  onClick={() => { setEditingRide(null); setShowRideForm(true); }}
                >
                  ➕ Add New Ride
                </button>
              </div>
              <RideTable 
                onEdit={handleEditRide}
                onViewRiders={handleViewRiders}
                isAdmin={true}
              />
            </div>
          )}

          {/* Pending Approvals Tab */}
          {activeTab === 'pending' && (
            <div className="tab-content pending-tab">
              <h2>⏳ Pending Ride Approvals</h2>
              {pendingRides.length === 0 ? (
                <div className="empty-state">
                  <p>✅ No pending rides. All rides have been reviewed!</p>
                </div>
              ) : (
                <div className="pending-rides-container">
                  <div className="pending-count">
                    <strong>{pendingRides.length}</strong> ride(s) awaiting approval
                  </div>
                  <div className="pending-rides-grid">
                    {pendingRides.map(ride => (
                      <div key={ride.id} className="pending-ride-card">
                        <div className="ride-card-header">
                          <h3>{ride.title}</h3>
                          <span className="pending-badge">⏳ Pending</span>
                        </div>

                        <div className="ride-card-body">
                          <div className="ride-info-row">
                            <span className="label">📍 Location:</span>
                            <span className="value">{ride.location}</span>
                          </div>
                          <div className="ride-info-row">
                            <span className="label">📅 Date:</span>
                            <span className="value">{new Date(ride.date).toLocaleDateString()}</span>
                          </div>
                          <div className="ride-info-row">
                            <span className="label">⏱️ Duration:</span>
                            <span className="value">{ride.duration}</span>
                          </div>
                          <div className="ride-info-row">
                            <span className="label">💰 Price:</span>
                            <span className="value">NPR {ride.price}</span>
                          </div>
                          <div className="ride-info-row">
                            <span className="label">👥 Seats:</span>
                            <span className="value">{ride.totalSeats}</span>
                          </div>
                          <div className="ride-info-row">
                            <span className="label">🏍️ Bike Type:</span>
                            <span className="value">{ride.bikeType}</span>
                          </div>
                          <div className="ride-info-row">
                            <span className="label">🏢 Organizer:</span>
                            <span className="value">{ride.organizer}</span>
                          </div>
                          {ride.description && (
                            <div className="ride-description">
                              <p><strong>Description:</strong> {ride.description}</p>
                            </div>
                          )}
                        </div>

                        <div className="ride-card-actions">
                          <button 
                            className="btn-approve"
                            onClick={() => handleApproveRide(ride.id)}
                          >
                            ✅ Approve
                          </button>
                          <button 
                            className="btn-reject"
                            onClick={() => setShowRejectForm(ride.id)}
                          >
                            ❌ Reject
                          </button>
                        </div>

                        {showRejectForm === ride.id && (
                          <div className="rejection-form">
                            <h4>Rejection Reason</h4>
                            <textarea
                              value={rejectionReason}
                              onChange={(e) => setRejectionReason(e.target.value)}
                              placeholder="Explain why this ride is being rejected..."
                              rows="3"
                            />
                            <div className="rejection-actions">
                              <button 
                                className="btn-cancel-reject"
                                onClick={() => { setShowRejectForm(null); setRejectionReason(''); }}
                              >
                                Cancel
                              </button>
                              <button 
                                className="btn-confirm-reject"
                                onClick={() => handleRejectRide(ride.id)}
                                disabled={!rejectionReason.trim()}
                              >
                                Confirm Rejection
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="tab-content users-tab">
              <h2>User Management</h2>
              <div className="info-message">
                <p>📋 User management features would be displayed here.</p>
                <p>In production, this would connect to a backend API to fetch and manage users.</p>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="tab-content settings-tab">
              <h2>System Settings</h2>
              <div className="settings-section">
                <h3>Admin Account</h3>
                <div className="setting-item">
                  <span>Email:</span>
                  <strong>{currentUser.email}</strong>
                </div>
                <div className="setting-item">
                  <span>Role:</span>
                  <strong>{currentUser.role.toUpperCase()}</strong>
                </div>
                <div className="setting-item">
                  <span>Login Time:</span>
                  <strong>{new Date(currentUser.loginTime).toLocaleString()}</strong>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {showRideForm && (
        <RideForm 
          ride={editingRide}
          onClose={handleCloseForm}
          organizerName="Direct Admin"
        />
      )}

      {showRidersModal && selectedRide && (
        <RegisteredRidersModal 
          ride={selectedRide}
          onClose={() => setShowRidersModal(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
