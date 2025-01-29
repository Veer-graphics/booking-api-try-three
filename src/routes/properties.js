import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth.js';
import getProperties from '../services/properties/getProperties.js';
import createProperty from '../services/properties/createProperty.js';
import getProperty from '../services/properties/getProperty.js';
import updateProperty from '../services/properties/updateProperty.js';
import deleteProperty from '../services/properties/deleteProperty.js';

router.get('/', async (req, res, next) => {
    try {
        const properties = await getProperties(req.query); // Pass query params directly
        res.json(properties);
    } catch (error) {
        next(error);
    }
});

router.post('/', auth, async (req, res, next) => {
    try {
        const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating } = req.body;
        const newProperty = await createProperty(title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating);
        res.status(201).json(newProperty);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const property = await getProperty(id);

        if (!property) {
            res.status(401).json({ message: `Property with id ${id} not found` })
        } else {
            res.status(200).json(property);
        }
    } catch (error) {
        next(error);
    }
});

router.put('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, location, pricePerNight, bedroomCount, bathroomCount, maxGuestCount, hostId, rating } = req.body;
        const updatedProperty = await updateProperty(id, { title, description, location, pricePerNight, bedroomCount, bathroomCount, maxGuestCount, hostId, rating });

        if (!updatedProperty) {
            res.status(404).json({ message: `Property with id ${id} was not found` })
        } else {
            res.status(200).json(updatedProperty);
        }
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProperty = await deleteProperty(id);

        if (!deletedProperty) {
            res.status(404).json({ message: `Property with id ${id} was not found` });
        } else {
            res.status(200).json({ message: `Property with id ${id} deleted successfully` });
        }
    } catch (error) {
        next(error);
    }
});


export default router;