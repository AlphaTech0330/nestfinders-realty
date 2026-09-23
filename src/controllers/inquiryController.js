const Inquiry = require('../models/Inquiry');
const sendEmail = require('../utils/sendEmail');

// POST /api/inquiries - Create new inquiry
exports.createInquiry = async (req, res) => {
  try {
    const { name, email, phone, propertyId, message } = req.body;

    const newInquiry = await Inquiry.create({
      name,
      email,
      phone,
      property: propertyId || null,
      message,
    });

    // Send email notifications if configured
    if (process.env.SMTP_HOST) {
      try {
        await sendEmail({
          email: process.env.ADMIN_EMAIL || email,
          subject: `New Property Inquiry from ${name}`,
          html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Message:</strong> ${message}</p>`,
        });
      } catch (mailError) {
        console.error('Email alert failed:', mailError.message);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully!',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit inquiry.',
    });
  }
};