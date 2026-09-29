const mongoose = require('mongoose');
const Property = require('../src/models/Property');
require('dotenv').config();

const seedData = [
  {
    title: "Lekki Phase 1 Luxury Duplex",
    price: 180000000,
    location: "Lekki Phase 1, Lagos",
    description: "Exquisite 5 bedroom fully detached duplex featuring modern architecture, smart home automation, private swimming pool, and 24/7 security.",
    bedrooms: 5,
    bathrooms: 6,
    type: "Residential",
    featured: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Ikoyi Executive Waterfront Apartment",
    price: 250000000,
    location: "Ikoyi, Lagos",
    description: "Premium 3 bedroom waterfront apartment with panoramic ocean views, gym access, underground parking, and high-speed elevators.",
    bedrooms: 3,
    bathrooms: 4,
    type: "Residential",
    featured: true,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Victoria Island Commercial Office Complex",
    price: 95000000,
    location: "Victoria Island, Lagos",
    description: "Open-plan corporate office space located in the prime business district of Victoria Island with central air conditioning and backup power generators.",
    bedrooms: 0,
    bathrooms: 2,
    type: "Commercial",
    featured: true,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Property.deleteMany({});
    await Property.insertMany(seedData);
    console.log("Database successfully seeded with properties and high-res image URLs!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();