import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth.js';
import getBookings from '../services/bookings/getBookings.js';
import getBookingById from '../services/bookings/getBookingById.js';
import createBooking from '../services/bookings/createBooking.js';
import updateBooking from '../services/bookings/updateBooking.js';
import deleteBooking from '../services/bookings/deleteBooking.js';

// Get all bookings or filter by userId
router.get('/', async (req, res, next) => {
    try {
        const { userId } = req.query;
        const bookings = await getBookings(userId);
        res.json(bookings);
    } catch (error) {
        next(error);
    }
});

// Get booking by ID
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id || typeof id !== "string" || id.trim() === "") {
            return res.status(400).json({ message: "Invalid booking ID." });
        }

        const booking = await getBookingById(id);

        if (!booking) {
            return res.status(404).json({ message: `Booking with ID ${id} not found.` });
        }

        res.status(200).json(booking);
    } catch (error) {
        next(error);
    }
});


// Create a new booking
router.post('/', auth, async (req, res, next) => {
    try {
        const bookingData = req.body;

        if (!bookingData || Object.keys(bookingData).length === 0) {
            return res.status(400).json({ message: "Booking data is required." });
        }

        const newBooking = await createBooking(bookingData);
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Update a booking by ID
router.put('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const bookingData = req.body;

        if (!id || typeof id !== "string" || id.trim() === "") {
            return res.status(400).json({ message: "Invalid booking ID." });
        }

        const updatedBooking = await updateBooking(id, bookingData);

        if (!updatedBooking) {
            return res.status(404).json({ message: `Booking with ID ${id} not found.` });
        }

        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete a booking by ID
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id || typeof id !== "string" || id.trim() === "") {
            return res.status(400).json({ message: "Invalid booking ID." });
        }

        const deletedBooking = await deleteBooking(id);

        if (!deletedBooking) {
            return res.status(404).json({ message: `Booking with ID ${id} not found.` });
        }

        res.status(200).json({ message: `Booking with ID ${id} deleted successfully.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;
