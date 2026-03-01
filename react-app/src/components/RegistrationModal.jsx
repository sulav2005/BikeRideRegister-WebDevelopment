import { useState } from 'react';
import './RegistrationModal.css';

const RegistrationModal = ({ ride, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    emergencyContact: '',
    bikeModel: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = 'Emergency contact is required';
    } else if (!/^\d{10}$/.test(formData.emergencyContact.replace(/\D/g, ''))) {
      newErrors.emergencyContact = 'Emergency contact must be 10 digits';
    }

    if (!formData.bikeModel.trim()) {
      newErrors.bikeModel = 'Bike model is required';
    } else if (formData.bikeModel.trim().length < 2) {
      newErrors.bikeModel = 'Bike model must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ ...formData, rideId: ride.id, rideName: ride.title });
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        emergencyContact: '',
        bikeModel: '',
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Register for Ride</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="ride-details-summary">
          <div className="summary-item">
            <span className="summary-label">📍 Ride:</span>
            <span className="summary-value">{ride.title}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">📅 Date:</span>
            <span className="summary-value">
              {new Date(ride.date).toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">💰 Price:</span>
            <span className="summary-value">NPR {ride.price.toLocaleString('en-US')}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9801234567"
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="emergencyContact">Emergency Contact (Phone) *</label>
            <input
              id="emergencyContact"
              type="tel"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="9801234567"
              className={errors.emergencyContact ? 'error' : ''}
            />
            {errors.emergencyContact && <span className="error-message">{errors.emergencyContact}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="bikeModel">Bike Model *</label>
            <input
              id="bikeModel"
              type="text"
              name="bikeModel"
              value={formData.bikeModel}
              onChange={handleChange}
              placeholder="e.g., Royal Enfield Classic 350"
              className={errors.bikeModel ? 'error' : ''}
            />
            {errors.bikeModel && <span className="error-message">{errors.bikeModel}</span>}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-register">
              Confirm Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
