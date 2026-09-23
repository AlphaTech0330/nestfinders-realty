const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protectAdmin = async (req, res, next) => {
  let token = req.cookies.adminToken;

  if (!token) {
    return res.redirect('/admin/login'); // <-- Redirects unauthenticated users to login
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey123');
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.redirect('/admin/login');
    }
    next();
  } catch (error) {
    res.clearCookie('adminToken');
    return res.redirect('/admin/login');
  }
};