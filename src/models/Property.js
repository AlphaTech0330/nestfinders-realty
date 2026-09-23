const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a property title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  location: {
    type: String,
    required: [true, 'Please specify the location'],
  },
  category: {
    type: String,
    enum: ['For Sale', 'For Rent', 'Development'],
    default: 'For Sale',
  },
  bedrooms: { 
    type: Number, 
    default: 0 
  },
  bathrooms: { 
    type: Number, 
    default: 0 
  },
  images: [{ 
    type: String 
  }],
  isFeatured: { 
    type: Boolean, 
    default: false 
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // References the logged-in agent or admin
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model('Property', propertySchema);