import { useState, useEffect } from 'react';
import './RideManagement.css';
import RideForm from './RideForm';

const RideManagement = ({ organizer }) => {
  const [rides, setRides] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRide, setEditingRide] = useState(null);

  useEffect(() => {
    // Load rides from localStorage
    const allRides = JSON.parse(localStorage.getItem('organizerRides')) || [];
    const organizerRides = allRides.filter(r => r.organizerName === organizer.organizerName);
    setRides(organizerRides);
  }, [organizer]);

  const handleAddRide = (rideData) => {
    const allRides = JSON.parse(localStorage.getItem('organizerRides')) || [];
    const newRide = {
      ...rideData,
      id: Date.now(),
      organizerName: organizer.organizerName,
      registrationClosed: false,
      createdAt: new Date().toISOString(),
    };
    allRides.push(newRide);
    localStorage.setItem('organizerRides', JSON.stringify(allRides));
    setRides([...rides, newRide]);
    setShowForm(false);
    alert('Ride added successfully!');
  };

  const handleUpdateRide = (rideData) => {
    const allRides = JSON.parse(localStorage.getItem('organizerRides')) || [];
    const updatedRides = allRides.map(r => 
      r.id === editingRide.id ? { ...r, ...rideData } : r
    );
    localStorage.setItem('organizerRides', JSON.stringify(updatedRides));
    setRides(rides.map(r => 
      r.id === editingRide.id ? { ...r, ...rideData } : r
    ));
    setEditingRide(null);
    setShowForm(false);
    alert('Ride updated successfully!');
  };

  const handleDeleteRide = (rideId) => {
    if (window.confirm('Are you sure you want to delete this ride?')) {
      const allRides = JSON.parse(localStorage.getItem('organizerRides')) || [];
      const updatedRides = allRides.filter(r => r.id !== rideId);
      localStorage.setItem('organizerRides', JSON.stringify(updatedRides));
      setRides(rides.filter(r => r.id !== rideId));
      alert('Ride deleted successfully!');
    }
  };

  const handleCloseRegistration = (rideId) => {
    const allRides = JSON.parse(localStorage.getItem('organizerRides')) || [];
    const updatedRides = allRides.map(r => 
      r.id === rideId ? { ...r, registrationClosed: true } : r
    );
    localStorage.setItem('organizerRides', JSON.stringify(updatedRides));
    setRides(rides.map(r => 
      r.id === rideId ? { ...r, registrationClosed: true } : r
    ));
    alert('Registration closed for this ride!');
  };

  return (
    <div className="ride-management">
      <div className="management-header">
        <h3>Manage Your Rides</h3>
        <button 
          className="btn-add-ride"
          onClick={() => {
            setEditingRide(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? '✕ Close' : '➕ Add New Ride'}
        </button>
      </div>

      {showForm && (
        <RideForm 
          onSubmit={editingRide ? handleUpdateRide : handleAddRide}
          initialData={editingRide}
          isEditing={!!editingRide}
        />
      )}

      {rides.length === 0 ? (
        <div className="no-rides">
          <p>No rides created yet. Add your first ride to get started!</p>
        </div>
      ) : (
        <div className="rides-table">
          <table>
            <thead>
              <tr>
                <th>Ride Title</th>
                <th>Date</th>
                <th>Location</th>
                <th>Available Seats</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rides.map(ride => (
                <tr key={ride.id}>
                  <td><strong>{ride.title}</strong></td>
                  <td>{new Date(ride.date).toLocaleDateString()}</td>
                  <td>{ride.location}</td>
                  <td>{ride.availableSeats}/{ride.totalSeats}</td>
                  <td>{ride.price === 0 ? 'FREE' : `NPR ${ride.price}`}</td>
                  <td>
                    {ride.registrationClosed ? (
                      <span className="status-closed">🔒 Closed</span>
                    ) : (
                      <span className="status-open">🟢 Open</span>
                    )}
                  </td>
                  <td className="actions">
                    <button 
                      className="btn-edit"
                      onClick={() => {
                        setEditingRide(ride);
                        setShowForm(true);
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="btn-close"
                      onClick={() => handleCloseRegistration(ride.id)}
                      disabled={ride.registrationClosed}
                    >
                      🔒 Close
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteRide(ride.id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RideManagement;
