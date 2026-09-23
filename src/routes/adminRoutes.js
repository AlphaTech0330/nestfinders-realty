const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/auth');

// Redirect /admin directly to /admin/login or /admin/dashboard
router.get('/', (req, res) => {
  res.redirect('/admin/login');
});

// GET & POST Admin Login
router.get('/login', adminController.getLoginPage);
router.post('/login', adminController.loginAdmin);

// Protected Admin Dashboard
router.get('/dashboard', protectAdmin, adminController.getDashboard);

// Logout Route
router.get('/logout', adminController.logoutAdmin);

module.exports = router;