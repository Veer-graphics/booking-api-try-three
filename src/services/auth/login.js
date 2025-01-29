import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';

const login = async (username, password) => {
    const jwtKey = process.env.AUTH_SECRET_KEY || "94eafbd658700fe0bea6557921a88468180da87b6a80898d0cac8f56fffa3f8e52fa17434cb82146058ed677c3e18595180fe9fc69b3ec82fd73226ea4f074da";
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
        where: { username, password }
    });

    if (!user) {
        return null;
    }

    const token = jwt.sign({ userId: user.id }, jwtKey);

    return token;
}

export default login;