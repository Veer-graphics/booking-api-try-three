import { PrismaClient } from "@prisma/client"

const updateReview = async (id, updatedReview) => {
    const prisma = new PrismaClient();
    const review = await prisma.review.update({
        where: { id },
        data: updatedReview
    });

    return review ? id : null;
}

export default updateReview;