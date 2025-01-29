import { PrismaClient } from '@prisma/client';

const createBooking = async (bookingData) => {
    const prisma = await new PrismaClient();
    const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = bookingData;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
        throw new Error(`User with id ${userId} does not exist.`);
    }

    const property = await prisma.property.findUnique({ where: { id: propertyId } });
    if (!property) {
        throw new Error(`Property with id ${propertyId} does not exist.`);
    }


    return await prisma.booking.create({
        data: { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus },
    });
};

export default createBooking;
