import { PrismaClient } from '@prisma/client';

const getBookings = async (userId) => {
    const prisma = await new PrismaClient();
    if (userId) {
        return await prisma.booking.findMany({
            where: { userId },
            include: { user: true, property: true },
        });
    }
    return await prisma.booking.findMany({
        include: { user: true, property: true },
    });
};

export default getBookings;
