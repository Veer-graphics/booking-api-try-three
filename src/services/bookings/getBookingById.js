import { PrismaClient } from '@prisma/client';

const getBookingById = async (id) => {
    const prisma = await new PrismaClient();
    return await prisma.booking.findUnique({
        where: { id },
        include: { user: true, property: true },
    });
};

export default getBookingById;
