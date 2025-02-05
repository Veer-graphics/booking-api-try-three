import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUser = async (id) => {
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: { id }
        });
        return user;
    } catch (error) {
        // Log the error for debugging
        console.error("Error fetching user:", error);
        throw new Error('User not found');
    }
};

export default getUser;
