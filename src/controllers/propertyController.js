const Property = require('../models/Property');

// GET all public properties with optional search/filter queries
exports.getProperties = async (req, res) => {
  try {
    const { category, location, minPrice, maxPrice } = req.query;
    let query = {};

    if (category) query.category = category;
    if (location) query.location = { $regex: location,$options: 'i' };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(query).sort({ createdAt: -1 });

    res.render('listings', {
      pageTitle: 'Property Listings | Nestfinders Realty',
      properties,
      filters: req.query,
    });
  } catch (error) {
    res.status(500).render('error', { message: error.message });
  }
};

// GET single property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('agent', 'name email phone');
    if (!property) return res.status(404).render('404');

    res.render('property-detail', {
      pageTitle: `${property.title} | Nestfinders Realty`,
      property,
    });
  } catch (error) {
    res.status(500).render('error', { message: error.message });
  }
};

// POST create new property listing
exports.createProperty = async (req, res) => {
  try {
    const { title, description, price, location, category, bedrooms, bathrooms, isFeatured } = req.body;

    // Collect uploaded image paths relative to public directory
    const imagePaths = req.files && req.files.length > 0 
      ? req.files.map(file => `/uploads/${file.filename}`)
      : ['/images/default-property.jpg'];

    const newProperty = new Property({
      title,
      description,
      price: Number(price),
      location,
      category,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      images: imagePaths,
      isFeatured: isFeatured === 'on' || isFeatured === true,
      agent: req.user ? req.user.id : null,
    });

    await newProperty.save();

    // Redirect based on user role
    if (req.user && req.user.role === 'admin') {
      return res.redirect('/admin/properties');
    }
    res.redirect('/agent/properties');
  } catch (error) {
    res.status(400).send('Error creating property listing: ' + error.message);
  }
};

// GET agent properties portal
exports.getAgentProperties = async (req, res) => {
  try {
    const properties = await Property.find({ agent: req.user.id }).sort({ createdAt: -1 });
    res.render('agent/properties', {
      pageTitle: 'My Listed Properties | Nestfinders Realty',
      properties,
      user: req.user,
    });
  } catch (error) {
    res.status(500).send('Server Error: ' + error.message);
  }
};