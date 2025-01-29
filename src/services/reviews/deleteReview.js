import { PrismaClient } from "@prisma/client"

const deleteReview = async (id) => {
    const prisma = new PrismaClient();
    const review = await prisma.review.delete({
        where: { id }
    });

    return review ? id : null;
}

export default deleteReview;