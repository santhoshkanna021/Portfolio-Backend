const nodemailer = require('nodemailer');
require('dotenv').config();

const Contact = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS, // Use an App Password if 2FA is enabled
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: `Contact from Portfolio: ${subject || 'No Subject'}`,
    replyTo: email,
    text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}
Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('❌ Mail error:', err);
    res.status(500).json({ success: false, message: 'Server error: email not sent' });
  }
};

module.exports = { Contact };
