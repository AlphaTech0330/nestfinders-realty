const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.get('/', pageController.getHomePage);
router.get('/about', pageController.getAboutPage);
router.get('/services', pageController.getServicesPage);
router.get('/developments', pageController.getDevelopmentsPage);
router.get('/contact', pageController.getContactPage);

module.exports = router;