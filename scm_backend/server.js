const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static frontend files (e.g. index.html, main.js, CSS)
const publicPath = path.join(__dirname, '..'); // Go up one level from scmbackend
app.use(express.static(publicPath));

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Booking route
app.post('/book', (req, res) => {
    const { checkIn, checkOut, adult, child } = req.body;

    console.log("Booking Received:", { checkIn, checkOut, adult, child });

    if (!checkIn || !checkOut || !adult || !child) {
        return res.status(400).json({ message: 'Please fill all the credentials' });
    }

    res.json({ message: 'Booking submitted successfully!' });
});

// Start server
app.listen(PORT, () => {
    console.log(✅ Server is running on http://localhost:${PORT});
});