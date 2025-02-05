import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateUser = async (id, updatedUser) => {
    // First, check if the user exists
    const existingUser = await prisma.user.findUnique({
        where: { id }
    });

    if (!existingUser) {
        return null;  // Return null if user is not found
    }

    // Proceed with updating the user
    const user = await prisma.user.update({
        where: { id },
        data: updatedUser
    });

    return user;
};

export default updateUser;
