import { Router } from "express";
const router = Router();

import auth from '../middleware/auth.js';

import getUsers from "../services/users/getUsers.js";
import createUser from '../services/users/createUser.js';
import getUser from "../services/users/getUser.js";
import updateUser from "../services/users/updateUser.js";
import deleteUser from "../services/users/deleteUser.js";

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


router.post('/', auth, async (req, res, next) => {
    try {
        const { username, password, name, email, phoneNumber, profilePicture } = req.body;
        const newUser = await createUser(username, password, name, email, phoneNumber, profilePicture);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUser(id);

        if (!user) {
            res.status(404).json({ message: `User with id ${id} not found!` })
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        next(error);
    }
});

router.put('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, password, name, email, phoneNumber, profilePicture } = req.body;
        const user = await updateUser(id, { username, password, name, email, phoneNumber, profilePicture });

        if (!user) {
            res.status(404).json({ message: `User with id ${id} not found` })
        } else {
            res.status(200).json(user)
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
            res.status(404).json({ message: `User with id ${id} not found` });
        } else {
            res.status(200).json({ message: 'User successfully deleted' })
        }
    } catch (error) {
        next(error)
    }
});

export default router;