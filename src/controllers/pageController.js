// Render Homepage
exports.getHomePage = (req, res) => {
  res.render('index', { pageTitle: 'Nestfinders Realty - Home' });
};

// Render About Page
exports.getAboutPage = (req, res) => {
  res.render('about', { pageTitle: 'About Us | Nestfinders Realty' });
};

// Render Services Page
exports.getServicesPage = (req, res) => {
  res.render('services', { pageTitle: 'Our Services | Nestfinders Realty' });
};

// Render Developments Page
exports.getDevelopmentsPage = (req, res) => {
  res.render('developments', { pageTitle: 'Developments | Nestfinders Realty' });
};

// Render Contact Page
exports.getContactPage = (req, res) => {
  res.render('contact', { pageTitle: 'Contact Us | Nestfinders Realty' });
};