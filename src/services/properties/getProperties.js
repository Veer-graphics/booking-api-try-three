import { PrismaClient } from "@prisma/client";

const getProperties = async ({ location, pricePerNight, amenities, ...rest }) => {
    const prisma = new PrismaClient();

    const filters = {
        ...rest,
        ...(location && { location: { contains: location } }), // Partial match for location
        ...(pricePerNight && { pricePerNight: parseFloat(pricePerNight) }),
        ...(amenities && { amenities: { some: { name: { in: amenities.split(",") } } } }),
    };

    const properties = await prisma.property.findMany({
        where: filters,
        include: { amenities: true }, // Include related amenities
    });

    return properties;
};

export default getProperties;
