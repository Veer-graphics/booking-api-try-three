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
        const booking = await getBookingById(id);

        if (!booking) {
            res.status(404).json({ message: `Booking with id ${id} not found` });
        } else {
            res.json(booking);
        }
    } catch (error) {
        next(error);
    }
});

// Create a new booking
router.post('/', auth, async (req, res, next) => {
    try {
        const bookingData = req.body;
        const newBooking = await createBooking(bookingData);
        res.status(201).json(newBooking);
    } catch (error) {
        next(error);
    }
});

// Update a booking by ID
router.put('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const bookingData = req.body;
        const updatedBooking = await updateBooking(id, bookingData);

        if (!updatedBooking) {
            res.status(404).json({ message: `Booking with id ${id} not found` });
        } else {
            res.json(updatedBooking);
        }
    } catch (error) {
        next(error);
    }
});

// Delete a booking by ID
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedBooking = await deleteBooking(id);

        if (!deletedBooking) {
            res.status(404).json({ message: `Booking with id ${id} not found` });
        } else {
            res.status(200).json(deletedBooking);
        }
    } catch (error) {
        next(error);
    }
});

export default router;
