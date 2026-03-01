import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import RideListingCard from '../components/RideListingCard';
import RegistrationModal from '../components/RegistrationModal';
import { useRide } from '../context/RideContext';
import './Home.css';

const Home = () => {
  const { rides, registerRider } = useRide();
  const [selectedOrganizer, setSelectedOrganizer] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);

  // Filter for only approved and active rides
  const approvedRides = useMemo(() => 
    rides.filter(ride => ride.approved && ride.status === 'active'),
    [rides]
  );

  // Get unique organizers from approved rides
  const organizers = useMemo(() => 
    ['All', ...new Set(approvedRides.map(ride => ride.organizer))],
    [approvedRides]
  );

  // Filter rides based on selected organizer
  const filteredRides = selectedOrganizer === 'All' 
    ? approvedRides 
    : approvedRides.filter(ride => ride.organizer === selectedOrganizer);

  const handleRegisterRide = (ride) => {
    setSelectedRide(ride);
    setShowModal(true);
  };

  const handleModalSubmit = (formData) => {
    // Register rider using RideContext
    registerRider(formData.rideId, {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      bikeModel: formData.bikeModel,
      emergencyContact: formData.emergencyContact,
      registrationDate: new Date().toISOString()
    });

    setShowModal(false);
    setSelectedRide(null);
    alert(`✅ Successfully registered for ${formData.rideName}!`);
  };

  return (
    <div>
      <Navbar />
      <div className="home">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Join Organized Rides Across Nepal</h1>
            <p>Experience the thrill of biking through Nepal's most scenic routes</p>
          </div>
        </section>

        {/* Upcoming Rides This Month Section */}
        <section className="upcoming-rides-section">
          <div className="section-header">
            <h2>🚴 Upcoming Rides This Month</h2>
            <p>Discover exciting approved rides happening in the next 30 days</p>
          </div>

          {/* Filter Buttons */}
          <div className="filter-container">
            <span className="filter-label">Filter by Organizer:</span>
            <div className="filter-buttons">
              {organizers.map(org => (
                <button
                  key={org}
                  className={`filter-btn ${selectedOrganizer === org ? 'active' : ''}`}
                  onClick={() => setSelectedOrganizer(org)}
                >
                  {org}
                </button>
              ))}
            </div>
          </div>

          <div className="ride-listing-grid">
            {filteredRides.length > 0 ? (
              filteredRides.map(ride => (
                <RideListingCard 
                  key={ride.id} 
                  ride={ride}
                  onRegister={handleRegisterRide}
                />
              ))
            ) : (
              <p className="no-rides">No approved rides found. Check back soon or try another organizer filter!</p>
            )}
          </div>
        </section>

        {/* Registration Modal */}
        {showModal && selectedRide && (
          <RegistrationModal
            ride={selectedRide}
            onClose={() => {
              setShowModal(false);
              setSelectedRide(null);
            }}
            onSubmit={handleModalSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Home;