import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAmenity = async (name) => {
    try {
        // Check if the amenity already exists
        const existingAmenity = await prisma.amenity.findUnique({
            where: { name }
        });

        if (existingAmenity) {
            // Return a user-friendly message instead of throwing an error
            return { error: `Amenity "${name}" already exists` };
        }

        // Create new amenity
        const amenity = await prisma.amenity.create({
            data: { name }
        });

        return amenity;
    } catch (error) {
        console.error("Error creating amenity:", error);  // Log the error
        throw new Error(`Error creating amenity: ${error.message}`);
    }
};

export default createAmenity;
