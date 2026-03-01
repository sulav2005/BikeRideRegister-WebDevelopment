// src/pages/AdminLogin.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useRole } from '../context/RoleContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { loginAdmin } = useRole();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Admin credentials (in production, this should be validated against a backend API)
  const ADMIN_CREDENTIALS = {
    email: 'admin@biketours.com',
    password: 'admin123'
  };

  const onSubmit = (data) => {
    setErrorMessage('');

    // Validate credentials
    if (data.email === ADMIN_CREDENTIALS.email && data.password === ADMIN_CREDENTIALS.password) {
      const adminData = {
        email: data.email,
        loginTime: new Date().toISOString()
      };
      
      // Store admin session using role context
      loginAdmin(adminData);
      
      // Navigate to admin dashboard
      navigate('/admin/dashboard');
    } else {
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="admin-login-container">
        <div className="admin-login">
          <div className="admin-login-header">
            <h1>Admin Login</h1>
            <p>Access the Admin Dashboard</p>
          </div>

          {errorMessage && (
            <div className="error-banner">
              <span className="error-icon">⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="admin-login-form">
            <div className="form-group floating-group">
              <input
                id="admin-email"
                type="email"
                placeholder=" "
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
              <label htmlFor="admin-email">Email</label>
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <div className="form-group floating-group password-group">
              <div className="password-input-wrapper">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder=" "
                  {...register('password', { required: 'Password is required' })}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />
                <label htmlFor="admin-password">Password</label>
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

            <button type="submit" className="admin-submit-btn">Login to Admin Dashboard</button>
          </form>

          <div className="admin-login-footer">
            <p className="demo-credentials">
              Demo Credentials:<br />
              Email: <code>admin@biketours.com</code><br />
              Password: <code>admin123</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
