const Property = require('../models/Property');

// @desc    Get all properties (with optional filter/search)
// @route   GET /properties
exports.getAllProperties = async (req, res) => {
  try {
    const { location, type, minPrice, maxPrice } = req.query;
    let filter = {};

    if (location) filter.location = { $regex: location,$options: 'i' };
    if (type) filter.type = type;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(filter).sort({ createdAt: -1 });
    res.render('listings', { properties, query: req.query });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).render('404', { message: 'Failed to retrieve property listings' });
  }
};

// @desc    Get single property details
// @route   GET /properties/:id
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).render('404', { message: 'Property not found' });
    }
    res.render('developments', { property });
  } catch (error) {
    console.error('Error fetching property details:', error);
    res.status(500).render('404', { message: 'Invalid property ID or server error' });
  }
};

// @desc    Render property creation form page
// @route   GET /properties/add
exports.getAddPropertyForm = (req, res) => {
  res.render('agent/properties');
};

// @desc    Create a new property listing with Cloudinary image upload
// @route   POST /properties/add
exports.createProperty = async (req, res) => {
  try {
    const { title, price, location, description, bedrooms, bathrooms, type, featured } = req.body;

    // req.file.path contains the persistent Cloudinary HTTPS URL from upload middleware
    const imageUrl = req.file ? req.file.path : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';

    const newProperty = await Property.create({
      title,
      price: Number(price),
      location,
      description,
      bedrooms: Number(bedrooms) || 0,
      bathrooms: Number(bathrooms) || 0,
      type: type || 'Residential',
      featured: featured === 'on' || featured === 'true' || featured === true,
      image: imageUrl,
    });

    res.redirect(`/properties/${newProperty._id}`);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).render('404', { message: 'Failed to publish new property listing' });
  }
};

// @desc    Delete a property listing
// @route   DELETE /properties/:id
exports.deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.redirect('/properties');
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).render('404', { message: 'Failed to delete property' });
  }
};