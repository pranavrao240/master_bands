const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Parse JSON and URL-encoded bodies from the request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a route to handle the email sending
app.post('/send-email', (req, res) => {
  const { clientEmail, subject, message } = req.body;

  // Create a nodemailer transporter with your SMTP configuration
  const transporter = nodemailer.createTransport({
    host: 'your-smtp-host',
    port: 587,
    secure: false,
    auth: {
      user: 'your-email@example.com',
      pass: 'your-email-password',
    },
  });

  // Prepare the email options
  const mailOptions = {
    from: 'vikastile200@gmail.com',
    to: 'pranavrao210@gmail.com',
    subject: subject,
    text: `From: ${clientEmail}\n\n${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Failed to send email');
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
