import { PrismaClient } from '@prisma/client';

const deleteBooking = async (id) => {
    const prisma = await new PrismaClient();
    const booking = await prisma.booking.findUnique({ where: { id } });

    if (!booking) {
        throw new Error(`Booking with id ${id} not found.`);
    }

    return await prisma.booking.delete({
        where: { id },
    });
};

export default deleteBooking;
