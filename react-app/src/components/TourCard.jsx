// src/components/TourCard.jsx
import { Link } from 'react-router-dom';
import './TourCard.css';

const TourCard = ({ tour }) => {
  const displayPrice = typeof tour.price === 'number' 
    ? `NPR ${tour.price.toLocaleString('en-US')}` 
    : tour.price;

  return (
    <div className="tour-card">
      <img src={tour.image} alt={tour.name} className="tour-image" />
      <div className="tour-info">
        <h3>{tour.name}</h3>
        <p>{tour.description}</p>
        <p><strong>Price:</strong> {displayPrice}</p>
        <p><strong>Duration:</strong> {tour.duration}</p>
        <Link to={`/booking/${tour.id}`} className="book-now-btn">Book Now</Link>
      </div>
    </div>
  );
};

export default TourCard;