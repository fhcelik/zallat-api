'use strict';

const router = require('express').Router();
const {validateSchema, ratingSchema} = require('./middleware/validateSchema');
const { addRating, getRating } = require('../facade/rating')


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