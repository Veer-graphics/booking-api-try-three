import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getBookingById = async (id) => {
    try {
        // Validate the ID
        if (!id || typeof id !== "string" || id.trim() === "") {
            throw new Error("Booking ID must be a non-empty string.");
        }

        // Fetch the booking with user and property details
        const booking = await prisma.booking.findUnique({
            where: { id },
            include: { user: true, property: true },
        });

        // Ensure required fields exist
        if (!booking) {
            return null;
        }

        if (!booking.userId || !booking.propertyId) {
            throw new Error("Booking must have a valid userId and propertyId.");
        }

        return booking;
    } catch (error) {
        throw new Error(`Error fetching booking: ${error.message}`);
    } finally {
        await prisma.$disconnect(); // Ensure proper disconnection
    }
};

export default getBookingById;
