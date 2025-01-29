import { PrismaClient } from "@prisma/client";

const getAmenities = async (name) => {
    const prisma = new PrismaClient();
    const amenities = await prisma.amenity.findMany({
        where: name ? { name: { contains: name, mode: 'insensitive' } } : undefined
    })

    return amenities;
}

export default getAmenities;