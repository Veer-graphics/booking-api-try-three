import { PrismaClient } from "@prisma/client"

const updateHost = async (id, updatedHost) => {
    const prisma = new PrismaClient();
    try {
        const host = await prisma.host.update({
            where: { id },
            data: updatedHost
        });
        return host.id;
    } catch (error) {
        return null; // Return null if the host is not found
    }
}

export default updateHost