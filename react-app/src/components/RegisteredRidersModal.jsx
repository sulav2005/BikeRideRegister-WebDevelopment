// src/components/RegisteredRidersModal.jsx
import { useRide } from '../context/RideContext';
import './RegisteredRidersModal.css';

const RegisteredRidersModal = ({ ride, onClose }) => {
  const { unregisterRider } = useRide();
  const riders = ride?.registeredRiders || [];

  const handleRemoveRider = (riderEmail) => {
    unregisterRider(ride.id, riderEmail);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Registered Riders - {ride?.title}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="riders-list">
          {riders.length > 0 ? (
            <div className="riders-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {riders.map((rider, index) => (
                    <tr key={index}>
                      <td>{rider.name || 'N/A'}</td>
                      <td>{rider.email}</td>
                      <td>{rider.phone || 'N/A'}</td>
                      <td>
                        <button
                          className="btn-remove"
                          onClick={() => handleRemoveRider(rider.email)}
                          title="Remove rider"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <p>No riders registered for this ride yet</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default RegisteredRidersModal;
