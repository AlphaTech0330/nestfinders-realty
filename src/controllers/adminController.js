const User = require('../models/User');
const Property = require('../models/Property');
const Inquiry = require('../models/Inquiry');
const jwt = require('jsonwebtoken');

// GET /admin/login
exports.getLoginPage = (req, res) => {
  res.render('admin/login', { 
    pageTitle: 'Admin Login | Nestfinders Realty',
    error: null 
  });
};

// POST /admin/login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.render('admin/login', {
        pageTitle: 'Admin Login | Nestfinders Realty',
        error: 'Invalid email or password credentials',
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secretkey123',
      { expiresIn: '1d' }
    );

    // Set HTTP-Only Cookie
    res.cookie('adminToken', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.redirect('/admin/dashboard');
  } catch (error) {
    res.render('admin/login', {
      pageTitle: 'Admin Login | Nestfinders Realty',
      error: 'An error occurred during authentication.',
    });
  }
};

// GET /admin/dashboard
exports.getDashboard = async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();
    const totalInquiries = await Inquiry.countDocuments();
    const pendingInquiries = await Inquiry.countDocuments({ status: 'Pending' });
    const pendingVerificationsCount = await User.countDocuments({ verificationStatus: 'pending' });

    const inquiries = await Inquiry.find()
      .populate('property', 'title')
      .sort({ createdAt: -1 })
      .limit(10);

    res.render('admin/dashboard', {
      pageTitle: 'Admin Dashboard | Nestfinders Realty',
      user: req.user,
      stats: { totalProperties, totalInquiries, pendingInquiries },
      pendingVerificationsCount,
      inquiries,
    });
  } catch (error) {
    res.status(500).send('Server Error loading dashboard');
  }
};

// GET /admin/logout
exports.logoutAdmin = (req, res) => {
  res.clearCookie('adminToken');
  res.redirect('/admin/login');
};