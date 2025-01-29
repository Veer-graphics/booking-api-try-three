import { Router } from "express";
const router = Router();
import auth from '../middleware/auth.js';
import getHosts from "../services/hosts/getHosts.js";
import createHost from "../services/hosts/createHost.js";
import getHost from "../services/hosts/getHost.js";
import updateHost from "../services/hosts/updateHost.js";
import deleteHost from "../services/hosts/deleteHost.js";

router.get('/', async (req, res, next) => {
    try {
        const { name } = req.query;
        const hosts = await getHosts(name); // Pass name as an argument
        res.json(hosts);
    } catch (error) {
        next(error);
    }
});


router.post('/', auth, async (req, res, next) => {
    try {
        const { username, password, name, email, phoneNumber, profilePicture } = req.body;
        const newHost = await createHost(username, password, name, email, phoneNumber, profilePicture);
        res.status(201).json(newHost);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const host = await getHost(id);

        if (!host) {
            res.status(404).json({ message: `Host with id ${id} not found!` })
        } else {
            res.status(200).json(host);
        }
    } catch (error) {
        next(error);
    }
});

router.put('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, password, name, email, phoneNumber, profilePicture } = req.body;
        const host = await updateHost(id, { username, password, name, email, phoneNumber, profilePicture });

        if (!host) {
            res.status(404).json({ message: `Host with id ${id} not found` })
        } else {
            res.status(200).json({ message: 'Host successfully updated' })
        }
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedHost = await deleteHost(id);

        if (!deletedHost) {
            res.status(404).json({ message: `Host with id ${id} not found` });
        } else {
            res.status(200).json({ message: 'Host successfully deleted' })
        }
    } catch (error) {
        next(error)
    }
});

export default router;