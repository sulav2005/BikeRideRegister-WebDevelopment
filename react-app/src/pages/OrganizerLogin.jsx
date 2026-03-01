// src/pages/OrganizerLogin.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useRole } from '../context/RoleContext';
import './OrganizerLogin.css';

const OrganizerLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { loginOrganizer } = useRole();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (data) => {
    setErrorMessage('');

    // Simple validation - in production, this should be checked against a backend
    if (!data.organizerName?.trim() || !data.password?.trim()) {
      setErrorMessage('All fields are required.');
      return;
    }

    // In production, validate against actual organizer credentials from backend
    if (data.password === 'organizer123') {
      const organizerData = {
        organizerName: data.organizerName,
        email: data.organizerEmail || `${data.organizerName.toLowerCase()}@biketours.com`,
        loginTime: new Date().toISOString()
      };
      
      // Store organizer session using role context
      loginOrganizer(organizerData);
      
      // Navigate to organizer dashboard
      navigate('/organizer');
    } else {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="organizer-login-container">
        <div className="organizer-login">
          <div className="organizer-login-header">
            <h1>Organizer Login</h1>
            <p>Access the Organizer Dashboard</p>
          </div>

          {errorMessage && (
            <div className="error-banner">
              <span className="error-icon">⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="organizer-login-form">
            <div className="form-group floating-group">
              <input
                id="organizer-name"
                type="text"
                placeholder=" "
                {...register('organizerName', { 
                  required: 'Organizer name is required'
                })}
                onFocus={() => setFocusedField('organizerName')}
                onBlur={() => setFocusedField(null)}
              />
              <label htmlFor="organizer-name">Organizer Name</label>
              {errors.organizerName && <span className="error">{errors.organizerName.message}</span>}
            </div>

            <div className="form-group floating-group password-group">
              <div className="password-input-wrapper">
                <input
                  id="organizer-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder=" "
                  {...register('password', { required: 'Password is required' })}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />
                <label htmlFor="organizer-password">Password</label>
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '⊘' : '👁️'}
                </button>
              </div>
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>

            <button type="submit" className="organizer-submit-btn">Login to Dashboard</button>
          </form>

          <div className="organizer-login-footer">
            <p className="demo-credentials">
              Demo Credentials:<br />
              Organizer Name: <code>Demo Organizer</code><br />
              Password: <code>organizer123</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerLogin;
