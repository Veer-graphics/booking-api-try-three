import { PrismaClient } from "@prisma/client"

const updateUser = async (id, updatedUser) => {
    const prisma = new PrismaClient();
    const user = await prisma.user.update({
        where: { id },
        data: updatedUser
    });

    return user ? id : null;
}

export default updateUser