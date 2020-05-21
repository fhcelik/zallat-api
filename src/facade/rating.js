'use strict';

const Datastore = require('nedb');

const db = new Datastore({
    fileName: './rating.db',
    autoLoad: true
});

exports.addRating = (beerId, rating, comment) => 
    db.insert({id:beerId, rating:rating, comment:comment})

    
exports.getRating = (beerId) => db.find({id:beerId}, 
    function(err,doc){
        console.log(doc,' aaaa')
        return doc
    });
    