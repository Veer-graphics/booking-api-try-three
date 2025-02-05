import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createUser = async (username, password, name, email, phoneNumber, profilePicture) => {
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password, // Storing as plain text (Not recommended for production)
                name,
                email,
                phoneNumber,
                profilePicture
            }
        });
        return user;
    } catch (error) {
        console.error('Error in createUser:', error.message);

        if (error.code === 'P2002') {
            // Unique constraint violation handling
            return { error: 'Username or email already exists' };
        }

        throw error; // Re-throw for the route handler to catch
    } finally {
        await prisma.$disconnect();
    }
};

export default createUser;
