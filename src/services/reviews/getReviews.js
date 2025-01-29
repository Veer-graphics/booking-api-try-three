import { PrismaClient } from "@prisma/client";

const getReviews = async (userId, propertyId, rating, comment) => {
    const prisma = new PrismaClient();
    const reviews = await prisma.review.findMany({
        where: {
            userId,
            propertyId,
            rating,
            comment
        }
    });

    return reviews;
}

export default getReviews;