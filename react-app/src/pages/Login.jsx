// src/pages/Login.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useRole } from '../context/RoleContext';
import './Login.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { loginRider } = useRole();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (data) => {
    const riderUser = JSON.parse(localStorage.getItem('riderUser'));
    if (riderUser && riderUser.email === data.email && riderUser.password === data.password) {
      loginRider(riderUser);
      alert('Login successful!');
      navigate('/');
    } else {
      setErrorMessage('Invalid credentials. Please check your email and password.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login">
        <h2>Login to Bike Tours</h2>
        {errorMessage && (
          <div className="error-banner">
            <span className="error-icon">⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
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
          <button type="submit" className="submit-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;