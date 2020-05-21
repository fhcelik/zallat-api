'use strict';

const Datastore = require('nedb');

const db = new Datastore({
    fileName: './user.db',
    autoLoad: true
});


exports.addUser = (user) => db.insert({user: user, date: new Date()})
