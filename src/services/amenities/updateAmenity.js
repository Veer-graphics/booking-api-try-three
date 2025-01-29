import { PrismaClient } from "@prisma/client"

const updateAmenity = async (id, updatedAmenity) => {
    const prisma = new PrismaClient();

    // Step 1: Check if the amenity exists
    const amenityExists = await prisma.amenity.findUnique({
        where: { id }
    });

    // If amenity does not exist, return null
    if (!amenityExists) {
        return null;
    }

    // Step 2: Update the amenity
    const updated = await prisma.amenity.update({
        where: { id },
        data: updatedAmenity
    });

    return updated;
}

export default updateAmenity;
