import { PrismaClient } from "@prisma/client"

const deleteHost = async (id) => {
    const prisma = new PrismaClient();

    // Check if the host exists
    const host = await prisma.host.findUnique({
        where: { id },
    });

    if (!host) {
        throw new Error(`Host with id ${id} not found.`);
    }

    // Step 1: Delete dependent records from other tables
    await prisma.booking.deleteMany({
        where: { property: { hostId: id } }, // Assuming Booking references Property which references Host
    });

    await prisma.review.deleteMany({
        where: { property: { hostId: id } }, // Assuming Review references Property which references Host
    });

    await prisma.amenity.deleteMany({
        where: { properties: { some: { hostId: id } } }, // Corrected to 'properties'
    });

    // Step 2: Delete all properties linked to this host
    await prisma.property.deleteMany({
        where: { hostId: id }, // Delete all properties with the given hostId
    });

    // Step 3: Delete the host
    return await prisma.host.delete({
        where: { id },
    });
}



export default deleteHost;