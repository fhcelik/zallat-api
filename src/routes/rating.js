'use strict';

const Datastore = require('nedb');
const router = require('express').Router();
const {validateSchema, ratingSchema} = require('./middleware/validateSchema');

const db = new Datastore({
    fileName: './rating.db',
    autoLoad: true
});

router.post('/:id', validateSchema(ratingSchema), async (req, res, next) => {
    const { id: beerId } = req.params;
    const { rating: rating, comment: comment} = req.body

    db.insert({id:beerId, rating:rating, comment:comment}, 
        function(err,doc){
            if (err){
                return next();
            }
            res.sendStatus(204);
    });
    
});

router.get('/:id', async (req, res, next) => {
    const { id: beerId } = req.params;

    db.find({id:beerId}, 
        function(err,doc){
            if (err){
                return next();
            }
            res.json(doc);
    });
});

module.exports = router;