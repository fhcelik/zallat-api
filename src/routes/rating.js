'use strict';

const router = require('express').Router();
const {validateSchema, ratingSchema} = require('./middleware/validateSchema');
const { addRating, getRating } = require('../facade/rating')

/**
 * @swagger
 *
 * /Rating:
 *   post:
 *     description: Save rating for a beer
 *     summary: Save rating
 *     tags: ['Rating']
 *     responses:
 *       204:
 *         description: a map of rating 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *       500:
 *         $ref: '#/components/responses/Undefined'
 */

router.post('/:id', validateSchema(ratingSchema), async (req, res, next) => {
    const { id: beerId } = req.params;
    const { rating: rating, comment: comment} = req.body;

    try {
        await addRating(beerId, rating, comment)
        res.sendStatus(204);  
    }
    catch(error) {
        return next(error)
    } 
});

module.exports = router;