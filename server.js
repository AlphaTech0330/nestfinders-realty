const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// 1. Load environment variables at the top
dotenv.config();

// 2. Connect to Database
const connectDB = require('./src/config/db');
connectDB();

const app = express();

// 3. Request Parsing & Cookie Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 4. Serve Static Files (CSS, JS, Images, File Uploads)
app.use(express.static(path.join(__dirname, 'public')));

// 5. Template Engine Setup (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 6. Application Routes
app.use('/', require('./src/routes/pageRoutes'));
app.use('/properties', require('./src/routes/propertyRoutes'));
app.use('/api/inquiries', require('./src/routes/inquiryRoutes'));
app.use('/admin', require('./src/routes/adminRoutes'));
app.use('/', require('./src/routes/verificationRoutes'));
app.use('/agent', require('./src/routes/agentRoutes'));

// 7. Global 404 Handler
app.use((req, res) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found | Nestfinders Realty' });
});

// 8. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




