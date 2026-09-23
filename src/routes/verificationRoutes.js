const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/verificationController');
const { protectAdmin } = require('../middleware/auth');
const verificationUpload = require('../middleware/verificationUpload');

// Agent Routes
router.get('/agent/verify', protectAdmin, verificationController.getVerificationPage);
router.post(
  '/agent/verify',
  protectAdmin,
  verificationUpload.fields([
    { name: 'governmentIdDoc', maxCount: 1 },
    { name: 'cacCertDoc', maxCount: 1 },
  ]),
  verificationController.submitVerification
);

// Admin Queue Routes
router.get('/admin/verifications', protectAdmin, verificationController.getPendingVerifications);
router.post('/admin/verifications/review', protectAdmin, verificationController.reviewAgentVerification);

module.exports = router;