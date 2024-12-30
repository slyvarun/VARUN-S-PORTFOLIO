const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST route to handle form submission
app.post('/send', async (req, res) => {
    const { name, email, message } = req.body;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
        service: 'degalasaivarun5002@gmail.com', // Use your email provider (e.g., Gmail, Outlook)
        auth: {
            user: 'your_email@gmail.com', // Your email
            pass: 'your_email_password'  // Your email password or app password
        }
    });

    const mailOptions = {
        from: email,
        to: 'degalasaivarun5002@gmail.com', // Your email where you want to receive submissions
        subject: `Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Message sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send message.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
