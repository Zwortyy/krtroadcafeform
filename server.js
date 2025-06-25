const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// 🔒 CORS özelleştirilmiş şekilde tanımlanıyor
app.use(cors({
  origin: ['http://localhost:5173',
    'https://roadcafebuilders.com',
    'https://krtroadcafeform-m15w.vercel.app'],
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_RECEIVER,
      subject: 'New Contact Form Submission',
      html: `
        <h3>New message from ${firstName} ${lastName}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ message: 'Email sending failed.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
