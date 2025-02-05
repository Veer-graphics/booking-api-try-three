import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const deleteBooking = async (id) => {
    try {
        // Validate the ID
        if (!id || typeof id !== "string" || id.trim() === "") {
            throw new Error("Invalid booking ID.");
        }

        // Check if the booking exists
        const booking = await prisma.booking.findUnique({ where: { id } });

        if (!booking) {
            return null; // Return null instead of throwing an error
        }

        // Delete the booking
        const deletedBooking = await prisma.booking.delete({
            where: { id },
        });

        return deletedBooking;
    } catch (error) {
        throw new Error(`Error deleting booking: ${error.message}`);
    } finally {
        await prisma.$disconnect();
    }
};

export default deleteBooking;
