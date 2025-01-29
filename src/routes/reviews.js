import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth.js';
import getReview from '../services/reviews/getReview.js';
import getReviews from '../services/reviews/getReviews.js';
import createReview from '../services/reviews/createReview.js';
import updateReview from '../services/reviews/updateReview.js';
import deleteReview from '../services/reviews/deleteReview.js';

router.get('/', async (req, res, next) => {
    try {
        const { userId, propertyId, rating, comment } = req.query;
        const reviews = await getReviews(userId, propertyId, rating, comment);
        res.json(reviews);
    } catch (error) {
        next(error);
    }
});

router.post('/', auth, async (req, res, next) => {
    try {
        const { userId, propertyId, rating, comment } = req.body;
        const newReview = await createReview(userId, propertyId, rating, comment);
        res.status(201).json(newReview);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await getReview(id);

        if (!review) {
            res.status(401).json({ message: `Review with id ${id} not found` })
        } else {
            res.status(200).json(review);
        }
    } catch (error) {
        next(error);
    }
});

router.put('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId, propertyId, rating, comment } = req.body;
        const updatedReview = await updateReview(id, { userId, propertyId, rating, comment });

        if (!updatedReview) {
            res.status(404).json({ message: `Review with id ${id} was not found` })
        } else {
            res.status(200).json(updatedReview);
        }
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedReview = await deleteReview(id);

        if (!deletedReview) {
            res.status(404).json({ message: `Review with id ${id} was not found` })
        } else {
            res.status(200).json(deletedReview);
        }
    } catch (error) {
        next(error);
    }
});

export default router;