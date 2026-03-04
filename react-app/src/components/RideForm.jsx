// src/components/RideForm.jsx
import { useState, useEffect } from 'react';
import { useRide } from '../context/RideContext';
import './RideForm.css';

const RideForm = ({ ride = null, onClose, organizerName }) => {
  const { addRide, updateRide } = useRide();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    price: '',
    totalSeats: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (ride) {
      setFormData({
        title: ride.title,
        location: ride.location,
        date: ride.date,
        price: ride.price,
        totalSeats: ride.totalSeats,
        description: ride.description || ''
      });
    }
  }, [ride]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Ride title is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.totalSeats || formData.totalSeats <= 0) newErrors.totalSeats = 'Valid seat count is required';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (ride) {
      // Update existing ride
      updateRide(ride.id, {
        ...formData,
        price: parseFloat(formData.price),
        totalSeats: parseInt(formData.totalSeats)
      });
    } else {
      // Add new ride
      addRide({
        ...formData,
        price: parseFloat(formData.price),
        totalSeats: parseInt(formData.totalSeats),
        organizer: organizerName
      });
    }

    onClose();
  };

  return (
    <div className="ride-form-overlay">
      <div className="ride-form-modal">
        <div className="form-header">
          <h2>{ride ? 'Edit Ride' : 'Add New Ride'}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="ride-form">
          <div className="form-group">
            <label htmlFor="title">Ride Title *</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Himalayan Adventure"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                id="location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Himachal Pradesh"
                className={errors.location ? 'error' : ''}
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={errors.date ? 'error' : ''}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price (NPR) *</label>
              <input
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 2500"
                className={errors.price ? 'error' : ''}
              />
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="totalSeats">Total Seats *</label>
              <input
                id="totalSeats"
                type="number"
                name="totalSeats"
                value={formData.totalSeats}
                onChange={handleChange}
                placeholder="e.g., 20"
                className={errors.totalSeats ? 'error' : ''}
              />
              {errors.totalSeats && <span className="error-message">{errors.totalSeats}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the ride experience..."
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {ride ? 'Update Ride' : 'Create Ride'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RideForm;
