const Property = require('../models/Property');

// @desc    Render Homepage with dynamic property listings
// @route   GET /
exports.getHomePage = async (req, res) => {
  try {
    const featuredProperties = await Property.find().sort({ createdAt: -1 }).limit(6);
    res.render('index', { properties: featuredProperties });
  } catch (error) {
    console.error('Error fetching homepage properties:', error);
    res.render('index', { properties: [] });
  }
};

// @desc    Render About Page
// @route   GET /about
exports.getAboutPage = (req, res) => {
  res.render('about');
};

// @desc    Render Services Page
// @route   GET /services
exports.getServicesPage = (req, res) => {
  res.render('services');
};

// @desc    Render Contact Page (supports pre-selecting a property)
// @route   GET /contact
exports.getContactPage = (req, res) => {
  res.render('contact', { propertyId: req.query.property || null });
};