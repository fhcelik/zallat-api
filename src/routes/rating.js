'use strict';

const router = require('express').Router();
const Datastore = require('nedb');
const {validateSchema, ratingSchema} = require('./middleware/validateSchema');

const db = new Datastore({
    fileName: './rating.db',
    autoLoad: true
});

router.put('/:id', validateSchema(ratingSchema), async (req, res, next) => {
    const { id: beerId } = req.params;
    const { rating: rating, comment: comment} = req.body
    
    db.insert({id:beerId, rating:rating, comment:comment}, 
        function(err,doc){
            res.sendStatus(204);
    });
    
});

router.get('/:id', async (req, res, next) => {
    const { id: beerId } = req.params;

    db.find({id:beerId}, 
        function(err,doc){
            res.json(doc)
    });
});

module.exports = router;