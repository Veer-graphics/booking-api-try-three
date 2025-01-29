import { PrismaClient } from "@prisma/client"

const deleteAmenity = async (id) => {
    const prisma = new PrismaClient();
    const amenity = await prisma.amenity.delete({
        where: { id }
    });

    return amenity ? id : null;
}

export default deleteAmenity;