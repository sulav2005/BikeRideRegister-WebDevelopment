// src/data/rides.js

// Helper function to add days to a date
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Local group names
const localGroups = ['Bhatbhatey Nepal', 'Street Swift', 'Apex Alliance'];

// Helper to get random local group name
const getRandomLocalGroup = () => localGroups[Math.floor(Math.random() * localGroups.length)];

// Helper to calculate price based on duration
const getPriceByDuration = (durationHours) => {
  if (durationHours >= 2 && durationHours <= 4) {
    return 0; // FREE for short rides
  } else if (durationHours >= 5 && durationHours <= 8) {
    return Math.floor(Math.random() * 1000) + 500; // NPR 500-1500 for day rides
  }
  return 2000; // Default for very long rides
};

const today = new Date();

export const upcomingRides = [
  {
    id: 1,
    title: "Nagarkot Sunrise Ride",
    organizer: "Royal Enfield",
    organizerLogo: "🔴",
    location: "Kathmandu → Nagarkot",
    date: addDays(today, 3),
    price: getPriceByDuration(7.5),
    availableSeats: 12,
    totalSeats: 15,
    duration: "7-8 hours",
    durationValue: 7.5,
    allowedBikes: ["Royal Enfield"],
    description: "Experience breathtaking sunrise from Nagarkot with fellow bikers.",
  },
  {
    id: 2,
    title: "Mountain Trail Challenge",
    organizer: "KTM Riders",
    organizerLogo: "🟠",
    location: "Bhaktapur → Changu Narayan",
    date: addDays(today, 5),
    price: getPriceByDuration(5.5),
    availableSeats: 8,
    totalSeats: 12,
    duration: "5-6 hours",
    durationValue: 5.5,
    allowedBikes: ["KTM"],
    description: "Challenging mountain trails for experienced riders.",
  },
  {
    id: 3,
    title: "City Coffee Ride",
    organizer: getRandomLocalGroup(),
    organizerLogo: "🟡",
    location: "Thamel → Various Cafes",
    date: addDays(today, 2),
    price: getPriceByDuration(3.5),
    availableSeats: 20,
    totalSeats: 25,
    duration: "3-4 hours",
    durationValue: 3.5,
    allowedBikes: ["All"],
    description: "Leisurely ride through Kathmandu with coffee breaks at popular spots.",
  },
  {
    id: 4,
    title: "Forest Trail Expedition",
    organizer: "Yamaha Club",
    organizerLogo: "🔵",
    location: "Dhulikhel → Forest Trails",
    date: addDays(today, 8),
    price: getPriceByDuration(6.5),
    availableSeats: 5,
    totalSeats: 10,
    duration: "6-7 hours",
    durationValue: 6.5,
    allowedBikes: ["Yamaha"],
    description: "Adventure through dense forests with scenic mountain views.",
  },
  {
    id: 5,
    title: "Panauti Valley Expedition",
    organizer: "Bike Nepal",
    organizerLogo: "🟢",
    location: "Dhulikhel → Panauti",
    date: addDays(today, 12),
    price: getPriceByDuration(8.5),
    availableSeats: 15,
    totalSeats: 18,
    duration: "8-9 hours",
    durationValue: 8.5,
    allowedBikes: ["All"],
    description: "Explore the historic Panauti valley with expert guides.",
  },
  {
    id: 6,
    title: "Godavari Loop Ride",
    organizer: "Royal Enfield",
    organizerLogo: "🔴",
    location: "Godavari → Phulchoki",
    date: addDays(today, 15),
    price: getPriceByDuration(6.5),
    availableSeats: 18,
    totalSeats: 20,
    duration: "6-7 hours",
    durationValue: 6.5,
    allowedBikes: ["Royal Enfield"],
    description: "Beautiful loop ride through Godavari with cultural stops.",
  },
  {
    id: 7,
    title: "Weekend Group Ride",
    organizer: "KTM Riders",
    organizerLogo: "🟠",
    location: "Kathmandu → Namobuddha",
    date: addDays(today, 1),
    price: getPriceByDuration(7.5),
    availableSeats: 3,
    totalSeats: 15,
    duration: "7-8 hours",
    durationValue: 7.5,
    allowedBikes: ["KTM"],
    description: "Popular weekend ride to the sacred Namobuddha.",
  },
  {
    id: 8,
    title: "Casual Evening Ride",
    organizer: getRandomLocalGroup(),
    organizerLogo: "🟡",
    location: "Central Kathmandu",
    date: addDays(today, 4),
    price: getPriceByDuration(2.5),
    availableSeats: 25,
    totalSeats: 30,
    duration: "2-3 hours",
    durationValue: 2.5,
    allowedBikes: ["All"],
    description: "Easy evening ride perfect for beginners and relaxation.",
  },
  {
    id: 9,
    title: "Triumph Heritage Ride",
    organizer: "Triumph Riders",
    organizerLogo: "🔶",
    location: "Kathmandu → Dhulikhel",
    date: addDays(today, 6),
    price: getPriceByDuration(6),
    availableSeats: 10,
    totalSeats: 14,
    duration: "6-7 hours",
    durationValue: 6,
    allowedBikes: ["Triumph"],
    description: "Premium ride for Triumph enthusiasts through scenic routes.",
  },
  {
    id: 10,
    title: "TVS Speed Challenge",
    organizer: "TVS Riders",
    organizerLogo: "🟣",
    location: "Bhaktapur → Changu Narayan",
    date: addDays(today, 10),
    price: getPriceByDuration(5),
    availableSeats: 15,
    totalSeats: 20,
    duration: "5-6 hours",
    durationValue: 5,
    allowedBikes: ["TVS"],
    description: "High-speed adventure ride for TVS riders across challenging terrain.",
  },
  {
    id: 11,
    title: "Cross-Brand Gathering",
    organizer: "BikeMandu",
    organizerLogo: "🏍️",
    location: "Central Kathmandu → Surrounding Hills",
    date: addDays(today, 7),
    price: getPriceByDuration(4),
    availableSeats: 30,
    totalSeats: 40,
    duration: "4-5 hours",
    durationValue: 4.5,
    allowedBikes: ["All"],
    description: "A gathering for all bike enthusiasts regardless of brand.",
  },
];

export const getUpcomingRidesThisMonth = () => {
  const thirtyDaysFromNow = addDays(today, 30);
  
  return upcomingRides
    .filter(ride => ride.date <= thirtyDaysFromNow && ride.date >= today)
    .sort((a, b) => a.date - b.date);
};

export const isUrgentRide = (date) => {
  const daysUntilRide = Math.floor((date - today) / (1000 * 60 * 60 * 24));
  return daysUntilRide <= 7;
};
