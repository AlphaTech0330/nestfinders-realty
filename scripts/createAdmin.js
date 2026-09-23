const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load .env from root directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const User = require('../src/models/User');

const createAdmin = async () => {
  try {
    // Matches MONGODB_URI in your .env file
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGODB_URI is undefined in your .env file!');
    }

    await mongoose.connect(mongoUri);

    const adminExists = await User.findOne({ email: 'admin@nestfindersrealty.com' });
    if (adminExists) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    await User.create({
      name: 'Master Admin',
      email: 'admin@nestfindersrealty.com',
      password: 'SecurePassword123!',
      role: 'admin',
    });

    console.log('Admin user created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();