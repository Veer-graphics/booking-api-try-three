import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updateBooking = async (id, bookingData) => {
    try {
        // Validate the ID
        if (!id || typeof id !== "string" || id.trim() === "") {
            throw new Error("Invalid booking ID.");
        }

        // Validate input data (ensure valid keys)
        const allowedFields = [
            "propertyId", "checkinDate", "checkoutDate", 
            "numberOfGuests", "totalPrice", "bookingStatus", "hostId"
        ];
        const validData = Object.keys(bookingData)
            .filter(key => allowedFields.includes(key))
            .reduce((obj, key) => {
                obj[key] = bookingData[key];
                return obj;
            }, {});

        if (Object.keys(validData).length === 0) {
            throw new Error("No valid fields provided for update.");
        }

        // Update booking
        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: validData,
        });

        return updatedBooking;
    } catch (error) {
        throw new Error(`Error updating booking: ${error.message}`);
    } finally {
        await prisma.$disconnect(); // Ensure proper disconnection
    }
};

export default updateBooking;
