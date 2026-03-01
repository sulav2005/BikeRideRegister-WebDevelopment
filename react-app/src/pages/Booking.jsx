// src/pages/Booking.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';
import { tours } from '../data/tours';
import './Booking.css';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tour = tours.find(t => t.id === parseInt(id));
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const booking = {
      ...data,
      tourId: tour.id,
      userEmail: user.email,
      id: Date.now(), // Simple ID
    };
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    alert('Booking successful!');
    navigate('/my-registrations');
  };

  if (!tour) return <div>Tour not found</div>;

  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        <div className="booking">
          <h2>Book {tour.name}</h2>
          <div className="tour-details">
            <img src={tour.image} alt={tour.name} />
            <div>
              <p>{tour.description}</p>
              <p><strong>Price:</strong> NPR {tour.price?.toLocaleString('en-US') || 'Free'}</p>
              <p><strong>Duration:</strong> {tour.duration}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="booking-form">
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                {...register('date', { required: 'Date is required' })}
              />
              {errors.date && <span className="error">{errors.date.message}</span>}
            </div>
            <div className="form-group">
              <label>Number of Riders:</label>
              <input
                type="number"
                min="1"
                {...register('riders', { required: 'Number of riders is required', min: 1 })}
              />
              {errors.riders && <span className="error">{errors.riders.message}</span>}
            </div>
            <button type="submit">Confirm Booking</button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Booking;