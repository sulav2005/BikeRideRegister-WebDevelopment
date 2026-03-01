// src/context/RideContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const RideContext = createContext();

export const RideProvider = ({ children }) => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    // Load rides from localStorage on mount
    const savedRides = localStorage.getItem('allRides');
    if (savedRides) {
      setRides(JSON.parse(savedRides));
    } else {
      // Initialize with demo rides (all approved)
      const demoRides = [
        {
          id: 1,
          title: 'Himalayan Adventure',
          location: 'Himachal Pradesh',
          date: '2026-03-15',
          duration: '3 days',
          price: 2500,
          totalSeats: 20,
          availableSeats: 15,
          registrations: 5,
          status: 'active',
          approved: true,
          rejectionReason: null,
          description: 'Exciting mountain bike tour',
          bikeType: 'Mountain Bike',
          organizer: 'Demo Organizer',
          registeredRiders: [],
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Coastal Ride',
          location: 'Goa',
          date: '2026-03-20',
          duration: '2 days',
          price: 1800,
          totalSeats: 25,
          availableSeats: 10,
          registrations: 15,
          status: 'active',
          approved: true,
          rejectionReason: null,
          description: 'Scenic coastal bike route',
          bikeType: 'Road Bike',
          organizer: 'Demo Organizer',
          registeredRiders: [],
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          title: 'Desert Explorer',
          location: 'Rajasthan',
          date: '2026-04-01',
          duration: '4 days',
          price: 3000,
          totalSeats: 15,
          availableSeats: 8,
          registrations: 7,
          status: 'active',
          approved: true,
          rejectionReason: null,
          description: 'Desert sand dunes exploration',
          bikeType: 'Adventure Bike',
          organizer: 'Demo Organizer',
          registeredRiders: [],
          createdAt: new Date().toISOString()
        }
      ];
      setRides(demoRides);
      localStorage.setItem('allRides', JSON.stringify(demoRides));
    }
  }, []);

  const addRide = (rideData) => {
    const newRide = {
      id: Date.now(),
      ...rideData,
      registrations: 0,
      status: 'active',
      approved: false,
      rejectionReason: null,
      registeredRiders: [],
      createdAt: new Date().toISOString()
    };
    const updatedRides = [...rides, newRide];
    setRides(updatedRides);
    localStorage.setItem('allRides', JSON.stringify(updatedRides));
    return newRide;
  };

  const updateRide = (rideId, updatedData) => {
    const updatedRides = rides.map(ride =>
      ride.id === rideId ? { ...ride, ...updatedData } : ride
    );
    setRides(updatedRides);
    localStorage.setItem('allRides', JSON.stringify(updatedRides));
  };

  const deleteRide = (rideId) => {
    const updatedRides = rides.filter(ride => ride.id !== rideId);
    setRides(updatedRides);
    localStorage.setItem('allRides', JSON.stringify(updatedRides));
  };

  const approveRide = (rideId) => {
    updateRide(rideId, { approved: true, rejectionReason: null });
  };

  const rejectRide = (rideId, reason) => {
    updateRide(rideId, { approved: false, rejectionReason: reason });
  };

  const registerRider = (rideId, riderData) => {
    const updatedRides = rides.map(ride => {
      if (ride.id === rideId && ride.availableSeats > 0) {
        return {
          ...ride,
          registrations: ride.registrations + 1,
          availableSeats: ride.availableSeats - 1,
          registeredRiders: [...ride.registeredRiders, riderData]
        };
      }
      return ride;
    });
    setRides(updatedRides);
    localStorage.setItem('allRides', JSON.stringify(updatedRides));
  };

  const unregisterRider = (rideId, riderEmail) => {
    const updatedRides = rides.map(ride => {
      if (ride.id === rideId) {
        return {
          ...ride,
          registrations: Math.max(0, ride.registrations - 1),
          availableSeats: ride.availableSeats + 1,
          registeredRiders: ride.registeredRiders.filter(r => r.email !== riderEmail)
        };
      }
      return ride;
    });
    setRides(updatedRides);
    localStorage.setItem('allRides', JSON.stringify(updatedRides));
  };

  const closeRegistration = (rideId) => {
    updateRide(rideId, { status: 'closed' });
  };

  const reopenRegistration = (rideId) => {
    updateRide(rideId, { status: 'active' });
  };

  return (
    <RideContext.Provider value={{ 
      rides, 
      addRide, 
      updateRide, 
      deleteRide,
      approveRide,
      rejectRide,
      registerRider,
      unregisterRider,
      closeRegistration,
      reopenRegistration
    }}>
      {children}
    </RideContext.Provider>
  );
};

export const useRide = () => {
  const context = useContext(RideContext);
  if (!context) {
    throw new Error('useRide must be used within RideProvider');
  }
  return context;
};

export default RideContext;
