import { PrismaClient } from "@prisma/client";

const getUsers = async (filter = {}) => {
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany({
        where: filter,
    });
    return users;
};

export default getUsers;