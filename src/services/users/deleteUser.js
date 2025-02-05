import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteUser = async (id) => {
    try {
        // Check if user exists before deletion
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) return null;

        // Delete dependent records safely
        await prisma.booking.deleteMany({ where: { userId: id } });
        await prisma.review.deleteMany({ where: { userId: id } });

        // Finally, delete the user
        const deletedUser = await prisma.user.delete({
            where: { id },
        });

        return deletedUser ? id : null;
    } catch (error) {
        console.error("Error deleting user:", error);
        return null;
    } finally {
        await prisma.$disconnect();
    }
};

export default deleteUser;
