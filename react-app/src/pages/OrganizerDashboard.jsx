import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { useRide } from '../context/RideContext';
import OrganizerRideForm from '../components/OrganizerRideForm';
import RideTable from '../components/RideTable';
import './OrganizerDashboard.css';

const OrganizerDashboard = () => {
  const [activeTab, setActiveTab] = useState('rides');
  const { currentUser, logout } = useRole();
  const { rides } = useRide();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Filter rides for this organizer
  const organizerRides = rides.filter(ride => ride.organizer === currentUser.organizerName);

  const approvedRides = organizerRides.filter(ride => ride.approved);
  const pendingRides = organizerRides.filter(ride => !ride.approved);

  return (
    <div className="organizer-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>🏍️ Organizer Dashboard</h1>
        </div>
        <div className="header-right">
          <div className="organizer-info">
            <span className="organizer-name">{currentUser.organizerName}</span>
            <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h4>Approved Rides</h4>
            <p className="stat-value">{approvedRides.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h4>Pending Approval</h4>
            <p className="stat-value">{pendingRides.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h4>Total Registrations</h4>
            <p className="stat-value">{organizerRides.reduce((sum, ride) => sum + ride.registrations, 0)}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h4>Total Revenue</h4>
            <p className="stat-value">₹{approvedRides.reduce((sum, ride) => sum + (ride.price * ride.registrations), 0)}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          ➕ Create Ride
        </button>
        <button 
          className={`tab-btn ${activeTab === 'rides' ? 'active' : ''}`}
          onClick={() => setActiveTab('rides')}
        >
          🏍️ My Rides ({organizerRides.length})
        </button>
        {pendingRides.length > 0 && (
          <button 
            className={`tab-btn pending ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            ⏳ Pending ({pendingRides.length})
          </button>
        )}
      </div>

      {/* Content */}
      <div className="dashboard-content">
        {activeTab === 'create' && (
          <div className="content-section">
            <OrganizerRideForm organizerName={currentUser.organizerName} />
          </div>
        )}

        {activeTab === 'rides' && (
          <div className="content-section">
            <h2>My Approved Rides</h2>
            {approvedRides.length === 0 ? (
              <div className="empty-state">
                <p>📭 You have no approved rides yet.</p>
                <button className="btn-create" onClick={() => setActiveTab('create')}>
                  Create your first ride
                </button>
              </div>
            ) : (
              <RideTable organizerName={currentUser.organizerName} isApprovedOnly={true} />
            )}
          </div>
        )}

        {activeTab === 'pending' && pendingRides.length > 0 && (
          <div className="content-section">
            <h2>⏳ Pending Approval</h2>
            <div className="pending-rides-list">
              {pendingRides.map(ride => (
                <div key={ride.id} className="pending-ride-card">
                  <div className="ride-header">
                    <h3>{ride.title}</h3>
                    <span className="pending-badge">⏳ Pending</span>
                  </div>
                  <div className="ride-details">
                    <p><strong>📍 Location:</strong> {ride.location}</p>
                    <p><strong>📅 Date:</strong> {new Date(ride.date).toLocaleDateString()}</p>
                    <p><strong>⏱️ Duration:</strong> {ride.duration}</p>
                    <p><strong>💰 Price:</strong> ₹{ride.price}</p>
                    <p><strong>👥 Seats:</strong> {ride.totalSeats}</p>
                  </div>
                  <div className="ride-info">
                    <p>Your ride is under admin review. You'll be notified once approved or rejected.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizerDashboard;
