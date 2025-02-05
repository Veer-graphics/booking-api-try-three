import { Router } from "express";
const router = Router();

import auth from '../middleware/auth.js';

import getUsers from "../services/users/getUsers.js";
import createUser from '../services/users/createUser.js';
import getUser from "../services/users/getUser.js";
import updateUser from "../services/users/updateUser.js";
import deleteUser from "../services/users/deleteUser.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
    try {
        const { username, email } = req.query;
        let users;

        if (username) {
            users = await getUsers({ username });
        } else if (email) {
            users = await getUsers({ email });
        } else {
            users = await getUsers();
        }

        if (!users || users.length === 0) {
            res.status(404).json({ message: 'No users found matching the criteria.' });
        } else {
            res.status(200).json(users);
        }
    } catch (error) {
        next(error);
    }
});


router.post('/', auth, async (req, res) => {
    try {
        const { username, password, name, email, phoneNumber, profilePicture } = req.body;

        // Check if the username or email already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
        });

        if (existingUser) {
            return res.status(409).json({ error: 'Username or email already exists' });
        }

        // Create new user
        const newUser = await createUser(username, password, name, email, phoneNumber, profilePicture);

        if (newUser.error) {
            return res.status(409).json({ error: newUser.error });
        }

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});




router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUser(id);

        // The user will already be found if getUser returns a user
        res.status(200).json(user);
    } catch (error) {
        // Catch the error if 'User not found' is thrown
        if (error.message === 'User not found') {
            return res.status(404).json({ message: `User with id ${req.params.id} not found!` });
        }
        // For unexpected errors
        next(error);
    }
});


router.put('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, password, name, email, phoneNumber, profilePicture } = req.body;

        const user = await updateUser(id, { username, password, name, email, phoneNumber, profilePicture });

        if (!user) {
            res.status(404).json({ message: `User with id ${id} not found` });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        next(error);
    }
});


router.delete('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUser(id);

        if (!deletedUser) {
            return res.status(404).json({ message: `User with id ${id} not found` });
        }

        return res.status(200).json({ message: 'User successfully deleted' });
    } catch (error) {
        console.error("Error in delete user route:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


export default router;