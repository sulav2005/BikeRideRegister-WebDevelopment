// src/components/RideEditModal.jsx
import { useState } from 'react';
import { useRide } from '../context/RideContext';
import './RideEditModal.css';

const RideEditModal = ({ ride, onClose }) => {
  const { updateRide } = useRide();
  const [formData, setFormData] = useState({
    title: ride?.title || '',
    location: ride?.location || '',
    date: ride?.date || '',
    duration: ride?.duration || '',
    price: ride?.price || '',
    totalSeats: ride?.totalSeats || '',
    description: ride?.description || ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Ride title is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.totalSeats || formData.totalSeats <= 0) newErrors.totalSeats = 'Available seats must be greater than 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const updatedRide = {
        ...ride,
        title: formData.title,
        location: formData.location,
        date: formData.date,
        duration: formData.duration,
        price: parseInt(formData.price),
        totalSeats: parseInt(formData.totalSeats),
        description: formData.description
      };

      updateRide(ride.id, updatedRide);
      onClose();
    } catch (error) {
      console.error('Failed to update ride:', error);
      setErrors({ submit: 'Failed to update ride' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content edit-modal">
        <div className="modal-header">
          <h2>Edit Ride - {ride?.title}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}

          <div className="form-group">
            <label htmlFor="title">Ride Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={errors.location ? 'error' : ''}
              />
              {errors.location && <span className="error-text">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={errors.date ? 'error' : ''}
              />
              {errors.date && <span className="error-text">{errors.date}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className={errors.duration ? 'error' : ''}
                placeholder="e.g., 3 hours"
              />
              {errors.duration && <span className="error-text">{errors.duration}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (NPR)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={errors.price ? 'error' : ''}
              />
              {errors.price && <span className="error-text">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="totalSeats">Total Seats</label>
              <input
                type="number"
                id="totalSeats"
                name="totalSeats"
                value={formData.totalSeats}
                onChange={handleChange}
                className={errors.totalSeats ? 'error' : ''}
              />
              {errors.totalSeats && <span className="error-text">{errors.totalSeats}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-save"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RideEditModal;
