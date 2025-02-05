import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createBooking = async (bookingData) => {
    try {
        const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = bookingData;

        // Validate required fields
        if (!userId || !propertyId || !checkinDate || !checkoutDate || !numberOfGuests || !totalPrice || !bookingStatus) {
            throw new Error("All booking fields are required.");
        }

        // Check if user exists
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error(`User with id ${userId} does not exist.`);
        }

        // Check if property exists
        const property = await prisma.property.findUnique({ where: { id: propertyId } });
        if (!property) {
            throw new Error(`Property with id ${propertyId} does not exist.`);
        }

        // Create the booking
        const newBooking = await prisma.booking.create({
            data: { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus },
        });

        return newBooking;
    } catch (error) {
        throw new Error(`Error creating booking: ${error.message}`);
    } finally {
        await prisma.$disconnect();
    }
};

export default createBooking;
