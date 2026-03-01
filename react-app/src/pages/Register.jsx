// src/pages/Register.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useRole } from '../context/RoleContext';
import './Register.css';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { loginRider } = useRole();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const onSubmit = (data) => {
    // Register as a rider
    loginRider(data);
    alert('Registration successful!');
    navigate('/login');
  };

  return (
    <div>
      <Navbar />
      <div className="register">
        <h2>Register for Bike Tours</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          <div className="form-group floating-group">
            <input
              id="name"
              type="text"
              placeholder=" "
              {...register('name', { required: 'Name is required' })}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
            />
            <label htmlFor="name">Name</label>
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>
          <div className="form-group floating-group">
            <input
              id="email"
              type="email"
              placeholder=" "
              {...register('email', { required: 'Email is required' })}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
            />
            <label htmlFor="email">Email</label>
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>
          <div className="form-group floating-group">
            <input
              id="phone"
              type="tel"
              placeholder=" "
              {...register('phone', { required: 'Phone is required' })}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField(null)}
            />
            <label htmlFor="phone">Phone</label>
            {errors.phone && <span className="error">{errors.phone.message}</span>}
          </div>
          <div className="form-group floating-group password-group">
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder=" "
                {...register('password', { required: 'Password is required' })}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
              />
              <label htmlFor="password">Password</label>
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
          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;