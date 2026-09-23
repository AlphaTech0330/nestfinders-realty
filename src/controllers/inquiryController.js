const Inquiry = require('../models/Inquiry');
const nodemailer = require('nodemailer');

exports.submitInquiry = async (req, res) => {
  try {
    const { name, email, phone, message, property } = req.body;

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      message,
      property: property || null,
    });

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.SMTP_USER,
        to: process.env.EMAIL_TO || process.env.SMTP_USER,
        subject: `New Inquiry from ${name}`,
        html: `
          <h3>New Client Inquiry</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      }).catch(err => console.error('SMTP Error:', err.message));
    }

    res.status(201).json({ success: true, message: 'Inquiry submitted successfully', data: inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error handling inquiry' });
  }
};