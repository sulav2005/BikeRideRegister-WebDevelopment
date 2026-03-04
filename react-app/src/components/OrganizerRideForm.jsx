// src/components/OrganizerRideForm.jsx
import { useState } from 'react';
import { useRide } from '../context/RideContext';
import './OrganizerRideForm.css';

const OrganizerRideForm = ({ organizerName, onRideCreated }) => {
  const { addRide } = useRide();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    duration: '',
    price: '',
    totalSeats: '',
    bikeType: 'All',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const bikeTypes = ['All', 'Mountain Bike', 'Road Bike', 'Adventure Bike', 'Hybrid Bike', 'Electric Bike'];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Ride title is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.totalSeats || formData.totalSeats <= 0) newErrors.totalSeats = 'Available seats must be greater than 0';

    // Validate date is in future
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      newErrors.date = 'Date must be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const newRide = addRide({
        title: formData.title,
        location: formData.location,
        date: formData.date,
        duration: formData.duration,
        price: parseInt(formData.price),
        totalSeats: parseInt(formData.totalSeats),
        availableSeats: parseInt(formData.totalSeats),
        bikeType: formData.bikeType,
        description: formData.description,
        organizer: organizerName
      });

      setSuccessMessage('✅ Ride created successfully! Waiting for admin approval...');
      
      // Reset form
      setFormData({
        title: '',
        location: '',
        date: '',
        duration: '',
        price: '',
        totalSeats: '',
        bikeType: 'All',
        description: ''
      });
      setErrors({});
      setShowForm(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);

      if (onRideCreated) {
        onRideCreated(newRide);
      }
    } catch (error) {
      setErrors({ submit: 'Failed to create ride. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  if (!showForm) {
    return (
      <div className="organizer-ride-form-wrapper">
        {successMessage && (
          <div className="success-banner">
            {successMessage}
          </div>
        )}
        <button 
          className="btn-create-ride"
          onClick={() => setShowForm(true)}
        >
          ➕ Create New Ride
        </button>
      </div>
    );
  }

  return (
    <div className="organizer-ride-form-wrapper">
      <div className="form-container">
        <div className="form-header">
          <h2>🏍️ Create New Ride</h2>
          <p className="form-subtitle">Fill in the details to create a new bike tour ride</p>
          <button className="close-btn" onClick={() => setShowForm(false)}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="ride-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            
            <div className="form-group">
              <label htmlFor="title">🏷️ Ride Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Himalayan Mountain Adventure"
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="location">📍 Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Himachal Pradesh"
                className={errors.location ? 'error' : ''}
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">📝 Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the ride experience..."
                rows="3"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Schedule & Duration</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">📅 Start Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={minDate}
                  className={errors.date ? 'error' : ''}
                />
                {errors.date && <span className="error-message">{errors.date}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="duration">⏱️ Duration *</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 3 days, 5 hours"
                  className={errors.duration ? 'error' : ''}
                />
                {errors.duration && <span className="error-message">{errors.duration}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Pricing & Seats</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">💰 Price (NPR) *</label>
                <div className="input-with-icon">
                  <span className="currency">NPR</span>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="2500"
                    min="0"
                    className={errors.price ? 'error' : ''}
                  />
                </div>
                {errors.price && <span className="error-message">{errors.price}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="totalSeats">👥 Available Seats *</label>
                <input
                  type="number"
                  id="totalSeats"
                  name="totalSeats"
                  value={formData.totalSeats}
                  onChange={handleChange}
                  placeholder="20"
                  min="1"
                  max="100"
                  className={errors.totalSeats ? 'error' : ''}
                />
                {errors.totalSeats && <span className="error-message">{errors.totalSeats}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Bike Requirements</h3>
            
            <div className="form-group">
              <label htmlFor="bikeType">🏍️ Bike Type Restriction *</label>
              <select
                id="bikeType"
                name="bikeType"
                value={formData.bikeType}
                onChange={handleChange}
              >
                {bikeTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <p className="field-hint">Select the appropriate bike type for this ride</p>
            </div>
          </div>

          {errors.submit && (
            <div className="form-error">
              {errors.submit}
            </div>
          )}

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading}
            >
              {loading ? '⏳ Creating...' : '✅ Create Ride'}
            </button>
          </div>

          <div className="form-info">
            <p>📌 <strong>Note:</strong> New rides must be approved by an admin before they appear in the listing.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganizerRideForm;
