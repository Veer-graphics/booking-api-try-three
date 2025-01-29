import { PrismaClient } from "@prisma/client";

const deleteUser = async (id) => {
    const prisma = new PrismaClient();

    // Step 1: Delete dependent records (e.g., bookings, posts, etc.)
    await prisma.booking.deleteMany({
        where: { userId: id }, // Assuming there's a booking table with a userId foreign key
    });

    // Step 2: Delete the user
    const deletedUser = await prisma.user.delete({
        where: { id }
    });

    return deletedUser ? id : null;
}

export default deleteUser;
