import { PrismaClient } from "@prisma/client";

const getHosts = async (name) => {
    const prisma = new PrismaClient();
    const filter = name ? { where: { name: { contains: name, mode: 'insensitive' } } } : {};
    const hosts = await prisma.host.findMany(filter);
    return hosts;
};

export default getHosts;