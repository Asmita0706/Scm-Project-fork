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

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong on the server!' });
});

// Mock Database (Replace this with actual DB integration)
const bookings = [];

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Booking route
app.post('/book', (req, res, next) => {
    try {
        const { checkIn, checkOut, adult, child } = req.body;

        console.log("Booking Received:", { checkIn, checkOut, adult, child });

        if (!checkIn || !checkOut || !adult || !child) {
            return res.status(400).json({ message: 'Please fill all the required fields' });
        }

        // Mock logic to save booking
        const newBooking = {
            id: bookings.length + 1,
            checkIn,
            checkOut,
            adult: parseInt(adult, 10),
            child: parseInt(child, 10),
            createdAt: new Date(),
        };

        bookings.push(newBooking);

        res.status(201).json({ message: 'Booking submitted successfully!', booking: newBooking });
    } catch (error) {
        next(error); // Pass error to centralized error handler
    }
});

// List bookings (for debugging or admin)
app.get('/bookings', (req, res, next) => {
    try {
        res.status(200).json({ bookings });
    } catch (error) {
        next(error);
    }
});

// Invalid route handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});

