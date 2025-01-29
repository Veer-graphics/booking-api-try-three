import { PrismaClient } from '@prisma/client';

const updateBooking = async (id, bookingData) => {
    const prisma = await new PrismaClient();
    return await prisma.booking.update({
        where: { id },
        data: bookingData,
    });
};

export default updateBooking;
