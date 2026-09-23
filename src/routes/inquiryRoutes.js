const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');

// Ensure inquiryController.createInquiry matches the exact function name exported in the controller
router.post('/', inquiryController.createInquiry);

module.exports = router;