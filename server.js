const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Optional: serve contact.html directly
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

// Handle form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  console.log("Message received from:", name, email, message);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aditi20singh04@gmail.com',
      pass: 'imiehnlpvapnvorg'  // your Google App Password (no space here!)
    }
  });

  const mailOptions = {
    from: email,
    to: 'aditi20singh04@gmail.com',
    subject: `New Contact from ${name}`,
    text: `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('❌ Error sending email:', err);
      return res.status(500).send('Failed to send message');
    } else {
      console.log('✅ Email sent:', info.response);
      // Return a simple confirmation page or alert
    //   return res.send('<script>alert("Message Sent Successfully!"); window.location.href="contact.html";</script>');
    res.send(`
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const toast = document.createElement('div');
      toast.innerText = "✅ Message Sent Successfully!";
      toast.className = "toast show";
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.classList.remove('show');
        toast.remove();
        window.location.href = 'contact.html';
      }, 3000);
    });
  </script>
  <style>
    .toast {
      visibility: hidden;
      min-width: 260px;
      background-color: #28a745;
      color: white;
      text-align: center;
      border-radius: 12px;
      padding: 16px;
      position: fixed;
      z-index: 1000;
      left: 50%;
      bottom: 30px;
      transform: translateX(-50%);
      font-size: 1rem;
      opacity: 0;
      transition: opacity 0.5s ease, bottom 0.5s ease;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    .toast.show {
      visibility: visible;
      opacity: 1;
      bottom: 50px;
    }
  </style>
`);

    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});



// imie hnlp vapn vorg