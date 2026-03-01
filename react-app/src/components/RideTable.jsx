// src/components/RideTable.jsx
import { useState } from 'react';
import { useRide } from '../context/RideContext';
import './RideTable.css';

const RideTable = ({ onEdit, onViewRiders, isAdmin = false, organizerName = null }) => {
  const { rides, deleteRide, closeRegistration, reopenRegistration } = useRide();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const rideList = organizerName 
    ? rides.filter(ride => ride.organizer === organizerName)
    : rides;

  const handleDelete = (rideId) => {
    deleteRide(rideId);
    setDeleteConfirm(null);
  };

  const handleToggleRegistration = (rideId, currentStatus) => {
    if (currentStatus === 'active') {
      closeRegistration(rideId);
    } else {
      reopenRegistration(rideId);
    }
  };

  return (
    <div className="ride-table-container">
      <table className="ride-table">
        <thead>
          <tr>
            <th>Ride Title</th>
            <th>Location</th>
            <th>Date</th>
            <th>Price</th>
            <th>Seats</th>
            <th>Registrations</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rideList.length > 0 ? (
            rideList.map(ride => (
              <tr key={ride.id} className={`ride-row ${ride.status}`}>
                <td className="ride-title">{ride.title}</td>
                <td>{ride.location}</td>
                <td>{new Date(ride.date).toLocaleDateString()}</td>
                <td>₹{ride.price}</td>
                <td>
                  <span className="seats-badge">
                    {ride.availableSeats}/{ride.totalSeats}
                  </span>
                </td>
                <td>{ride.registrations}</td>
                <td>
                  <span className={`status-badge ${ride.status}`}>
                    {ride.status === 'active' ? '🟢 Active' : '🔴 Closed'}
                  </span>
                </td>
                <td className="actions-cell">
                  <button
                    className="btn-small btn-edit"
                    onClick={() => onEdit(ride)}
                    title="Edit ride"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn-small btn-view"
                    onClick={() => onViewRiders(ride)}
                    title="View registered riders"
                  >
                    👥 Riders
                  </button>
                  <button
                    className={`btn-small ${ride.status === 'active' ? 'btn-close' : 'btn-reopen'}`}
                    onClick={() => handleToggleRegistration(ride.id, ride.status)}
                    title={ride.status === 'active' ? 'Close registration' : 'Reopen registration'}
                  >
                    {ride.status === 'active' ? '🔒 Close' : '🔓 Open'}
                  </button>
                  <button
                    className="btn-small btn-delete"
                    onClick={() => setDeleteConfirm(ride.id)}
                    title="Delete ride"
                  >
                    🗑️ Delete
                  </button>
                  {deleteConfirm === ride.id && (
                    <div className="delete-confirm">
                      <p>Delete this ride?</p>
                      <button
                        className="btn-confirm btn-yes"
                        onClick={() => handleDelete(ride.id)}
                      >
                        Yes
                      </button>
                      <button
                        className="btn-confirm btn-no"
                        onClick={() => setDeleteConfirm(null)}
                      >
                        No
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="empty-message">
                No rides available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RideTable;
