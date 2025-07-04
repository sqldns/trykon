const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Configure nodemailer transporter (placeholder credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // TODO: Replace with your email
    pass: 'your-email-password',  // TODO: Replace with your app password
  },
});

// Endpoint to send 2FA code
app.post('/api/2fa/send', async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ error: 'Missing email or code' });
  try {
    await transporter.sendMail({
      from: 'TRYKON <your-email@gmail.com>',
      to: email,
      subject: 'Your TRYKON 2FA Code',
      text: `Your 2FA code is: ${code}`,
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Endpoint to handle support form submissions
app.post('/api/support', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
  try {
    await transporter.sendMail({
      from: 'TRYKON <your-email@gmail.com>',
      to: 'support@trykonsupport.com', // TODO: Replace with your support email
      subject: `Support Request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send support message' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
}); 