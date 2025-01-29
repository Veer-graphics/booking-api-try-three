import { PrismaClient } from "@prisma/client";

const updateProperty = async (id, updatedData) => {
    const prisma = new PrismaClient();
    const updatedProperty = await prisma.property.update({
        where: { id },
        data: updatedData,
    });
    return updatedProperty;
};

export default updateProperty;