const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth'); // Optional: Add if route protection is enabled

// Public Property List Page
router.get('/', propertyController.getAllProperties);

// Render Property Creation Form
router.get('/add', propertyController.getAddPropertyForm);

// Submit New Property Listing (With Cloudinary Multi-part Form Upload)
router.post('/add', upload.single('image'), propertyController.createProperty);

// Public Property Detail View Page
router.get('/:id', propertyController.getPropertyById);

// Delete Property Endpoint
router.post('/:id/delete', propertyController.deleteProperty);

module.exports = router;