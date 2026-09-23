const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// 1. Explicitly load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// 2. Import Models
const Property = require('../src/models/Property');
const User = require('../src/models/User');

// Sample real estate listings for Nestfinders Realty
const sampleProperties = [
  {
    title: '4 Bedroom Luxury Terrace Duplex',
    description: 'Contemporary 4-bedroom terrace duplex featuring fully fitted kitchen, bulletproof security doors, 24/7 power backup, and a swimming pool.',
    price: 120000000,
    location: 'Alausa, Ikeja, Lagos',
    category: 'For Sale',
    bedrooms: 4,
    bathrooms: 4,
    images: ['/images/default-property.jpg'],
    isFeatured: true,
  },
  {
    title: 'Modern 3 Bedroom Apartment',
    description: 'Spacious 3-bedroom apartment with all rooms ensuite, water treatment plant, fitted wardrobes, and dedicated parking space.',
    price: 4500000,
    location: 'Allen Avenue, Ikeja, Lagos',
    category: 'For Rent',
    bedrooms: 3,
    bathrooms: 3,
    images: ['/images/default-property.jpg'],
    isFeatured: false,
  },
  {
    title: 'The Nest Residences Phase II',
    description: 'Off-plan residential development project offering modern smart apartments, underground drainage, and solar streetlights.',
    price: 85000000,
    location: 'CBD, Alausa, Lagos',
    category: 'Development',
    bedrooms: 3,
    bathrooms: 3,
    images: ['/images/default-property.jpg'],
    isFeatured: true,
  },
  {
    title: '5 Bedroom Detached Villa with BQ',
    description: 'Ultra-modern 5-bedroom villa with smart home automation, private cinema, rooftop terrace, and a 2-room boys quarters.',
    price: 250000000,
    location: 'Gbagada Phase 2, Lagos',
    category: 'For Sale',
    bedrooms: 5,
    bathrooms: 6,
    images: ['/images/default-property.jpg'],
    isFeatured: true,
  },
  {
    title: 'Commercial Office Space',
    description: 'Open-plan commercial office floor available for lease, equipped with elevators, security, and central HVAC systems.',
    price: 12000000,
    location: 'Ikeja GRA, Lagos',
    category: 'For Rent',
    bedrooms: 0,
    bathrooms: 2,
    images: ['/images/default-property.jpg'],
    isFeatured: false,
  },
];

const seedDatabase = async () => {
  try {
    // Determine database connection URI
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error('Database connection URI (MONGODB_URI or MONGO_URI) is missing from your .env file!');
    }

    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected successfully.');

    // Fetch an admin/agent user to associate with seeded properties
    const sampleUser = await User.findOne();

    // Attach user ID as the posting agent if a user exists
    const propertiesToSeed = sampleProperties.map((prop) => ({
      ...prop,
      agent: sampleUser ? sampleUser._id : null,
    }));

    // Clear existing properties and insert seed properties
    await Property.deleteMany();
    console.log('Cleared existing property records.');

    const createdProperties = await Property.insertMany(propertiesToSeed);
    console.log(`Successfully seeded ${createdProperties.length} properties for Nestfinders Realty!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding properties database:', error.message);
    process.exit(1);
  }
};

seedDatabase();