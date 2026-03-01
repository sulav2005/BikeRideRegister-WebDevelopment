import { useState, useEffect } from 'react';
import './RegisteredRiders.css';

const RegisteredRiders = ({ organizer }) => {
  const [registrations, setRegistrations] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [rides, setRides] = useState([]);

  useEffect(() => {
    // Load organizer's rides
    const allRides = JSON.parse(localStorage.getItem('organizerRides')) || [];
    const organizerRides = allRides.filter(r => r.organizerName === organizer.organizerName);
    setRides(organizerRides);

    // Load all registrations
    const allRegistrations = JSON.parse(localStorage.getItem('registrations')) || [];
    setRegistrations(allRegistrations);
  }, [organizer]);

  const getRegistrationsForRide = (rideId) => {
    return registrations.filter(r => r.rideId === rideId);
  };

  const getRideTitle = (rideId) => {
    const ride = rides.find(r => r.id === rideId);
    return ride?.title || 'Unknown Ride';
  };

  const handleRemoveRegistration = (registrationId) => {
    if (window.confirm('Remove this registration?')) {
      const updatedRegistrations = registrations.filter(r => r.id !== registrationId);
      localStorage.setItem('registrations', JSON.stringify(updatedRegistrations));
      setRegistrations(updatedRegistrations);
      alert('Registration removed!');
    }
  };

  if (rides.length === 0) {
    return (
      <div className="registered-riders">
        <div className="no-data">
          <p>No rides created yet. Create a ride first to see registrations.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="registered-riders">
      <div className="riders-header">
        <h3>Registered Riders</h3>
        <div className="ride-filter">
          <label>Filter by Ride:</label>
          <select 
            value={selectedRide || ''} 
            onChange={(e) => setSelectedRide(e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">All Rides</option>
            {rides.map(ride => (
              <option key={ride.id} value={ride.id}>
                {ride.title} ({getRegistrationsForRide(ride.id).length} registrations)
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedRide ? (
        <RideRegistrationsList 
          rideId={selectedRide}
          rideTitle={getRideTitle(selectedRide)}
          registrations={getRegistrationsForRide(selectedRide)}
          onRemove={handleRemoveRegistration}
        />
      ) : (
        <AllRegistrationsList 
          rides={rides}
          registrations={registrations}
          getRideTitle={getRideTitle}
          onRemove={handleRemoveRegistration}
        />
      )}
    </div>
  );
};

const RideRegistrationsList = ({ rideId, rideTitle, registrations, onRemove }) => {
  return (
    <div className="registrations-list">
      <h4>Registrations for: {rideTitle}</h4>
      {registrations.length === 0 ? (
        <div className="no-data">
          <p>No registrations yet for this ride.</p>
        </div>
      ) : (
        <div className="registrations-table">
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Bike Model</th>
                <th>Emergency Contact</th>
                <th>Registered On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map(reg => (
                <tr key={reg.id}>
                  <td>{reg.fullName}</td>
                  <td>{reg.email}</td>
                  <td>{reg.phone}</td>
                  <td>{reg.bikeModel}</td>
                  <td>{reg.emergencyContact}</td>
                  <td>{new Date(reg.registrationDate).toLocaleDateString()}</td>
                  <td>
                    <button 
                      className="btn-remove"
                      onClick={() => onRemove(reg.id)}
                    >
                      ✕ Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="registrations-summary">
            <strong>Total Registrations: {registrations.length}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

const AllRegistrationsList = ({ rides, registrations, getRideTitle, onRemove }) => {
  return (
    <div className="registrations-list">
      <h4>All Registrations Across Your Rides</h4>
      {registrations.length === 0 ? (
        <div className="no-data">
          <p>No registrations yet.</p>
        </div>
      ) : (
        <div className="registrations-table">
          <table>
            <thead>
              <tr>
                <th>Ride</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Bike Model</th>
                <th>Registered On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map(reg => (
                <tr key={reg.id}>
                  <td><strong>{getRideTitle(reg.rideId)}</strong></td>
                  <td>{reg.fullName}</td>
                  <td>{reg.email}</td>
                  <td>{reg.phone}</td>
                  <td>{reg.bikeModel}</td>
                  <td>{new Date(reg.registrationDate).toLocaleDateString()}</td>
                  <td>
                    <button 
                      className="btn-remove"
                      onClick={() => onRemove(reg.id)}
                    >
                      ✕ Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="registrations-summary">
            <strong>Total Registrations: {registrations.length}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisteredRiders;
