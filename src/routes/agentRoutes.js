const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { protectAdmin } = require('../middleware/auth');

// Protected Agent Listing Routes
router.get('/properties', protectAdmin, propertyController.getAgentProperties);

module.exports = router;