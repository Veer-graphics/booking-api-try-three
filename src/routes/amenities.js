import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth.js';
import getAmenity from '../services/amenities/getAmenity.js';
import getAmenities from '../services/amenities/getAmenities.js';
import createAmenity from '../services/amenities/createAmenity.js';
import updateAmenity from '../services/amenities/updateAmenity.js';
import deleteAmenity from '../services/amenities/deleteAmenity.js';

router.get('/', async (req, res, next) => {
    try {
        const { name } = req.query;
        const amenities = await getAmenities(name);
        res.json(amenities);
    } catch (error) {
        next(error);
    }
});

router.post('/', auth, async (req, res, next) => {
    try {
        const { name } = req.body;
        const newAmenity = await createAmenity(name);
        res.status(201).json(newAmenity);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const amenity = await getAmenity(id);

        if (!amenity) {
            res.status(401).json({ message: `Amenity with id ${id} not found` })
        } else {
            res.status(200).json(amenity);
        }
    } catch (error) {
        next(error);
    }
});

router.put('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Call the update function
        const updatedAmenity = await updateAmenity(id, { name });

        if (!updatedAmenity) {
            return res.status(404).json({ message: `Amenity with id ${id} was not found` });
        }

        // Return the updated amenity data
        res.status(200).json(updatedAmenity);
    } catch (error) {
        next(error);
    }
});


router.delete('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedAmenity = await deleteAmenity(id);

        if (!deletedAmenity) {
            res.status(404).json({ message: `Amenity with id ${id} was not found` })
        } else {
            res.status(200).json(deletedAmenity);
        }
    } catch (error) {
        next(error);
    }
});

export default router;