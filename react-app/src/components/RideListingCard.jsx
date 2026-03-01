import { Link } from 'react-router-dom';
import { isUrgentRide } from '../data/rides';
import './RideListingCard.css';

const RideListingCard = ({ ride, onRegister }) => {
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const isUrgent = isUrgentRide(ride.date);
  const seatsPercentage = (ride.availableSeats / ride.totalSeats) * 100;
  const isFreeRide = ride.price === 0;
  const allowsAllBikes = ride.allowedBikes && ride.allowedBikes.includes('All');

  const displayPrice = isFreeRide 
    ? 'FREE' 
    : `NPR ${ride.price.toLocaleString('en-US')}`;

  return (
    <div className={`ride-card ${isUrgent ? 'urgent' : ''}`}>
      <div className="ride-card-header">
        <div className="ride-header-top">
          <h3 className="ride-title">{ride.title}</h3>
          <div className="badges">
            {isUrgent && <span className="urgent-badge">⚡ URGENT</span>}
            {isFreeRide && <span className="free-badge">🎉 Free Ride</span>}
            {allowsAllBikes && <span className="all-bikes-badge">🏍️ All Bikes</span>}
          </div>
        </div>
        <div className="organizer-badge">
          <span className="organizer-logo">{ride.organizerLogo}</span>
          <span className="organizer-name">{ride.organizer}</span>
        </div>
      </div>

      <div className="ride-card-body">
        <div className="ride-info-row">
          <span className="ride-info-label">📍 Location</span>
          <span className="ride-info-value">{ride.location}</span>
        </div>

        <div className="ride-info-row">
          <span className="ride-info-label">📅 Date</span>
          <span className="ride-info-value">{formatDate(ride.date)}</span>
        </div>

        <div className="ride-info-row">
          <span className="ride-info-label">⏱️ Duration</span>
          <span className="ride-info-value">{ride.duration}</span>
        </div>

        <div className={`ride-info-row price-row ${isFreeRide ? 'free' : ''}`}>
          <span className="ride-info-label">💰 Price</span>
          <span className={`ride-price ${isFreeRide ? 'free-price' : ''}`}>{displayPrice}</span>
        </div>

        <div className="seats-section">
          <div className="seats-info">
            <span className="seats-label">🪑 Available Seats</span>
            <span className="seats-count">{ride.availableSeats}/{ride.totalSeats}</span>
          </div>
          <div className="seats-bar">
            <div 
              className={`seats-filled ${seatsPercentage <= 25 ? 'critical' : seatsPercentage <= 50 ? 'warning' : 'good'}`}
              style={{ width: `${seatsPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="ride-card-footer">
        <button 
          className={`register-btn ${ride.availableSeats === 0 ? 'disabled' : ''}`}
          onClick={() => onRegister && onRegister(ride)}
          disabled={ride.availableSeats === 0}
        >
          {ride.availableSeats === 0 ? 'Fully Booked' : 'Register Now'}
        </button>
      </div>
    </div>
  );
};

export default RideListingCard;
