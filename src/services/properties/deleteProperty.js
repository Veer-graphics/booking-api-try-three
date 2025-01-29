import { PrismaClient } from "@prisma/client";

const deleteProperty = async (id) => {
    const prisma = new PrismaClient();

    // First, delete any dependent records related to the property (e.g., bookings or reviews)
    await prisma.booking.deleteMany({
        where: { propertyId: id },
    });

    await prisma.review.deleteMany({
        where: { propertyId: id },
    });

    // Now delete the property
    const deletedProperty = await prisma.property.delete({
        where: { id },
    });

    return deletedProperty ? id : null;
}

export default deleteProperty;
