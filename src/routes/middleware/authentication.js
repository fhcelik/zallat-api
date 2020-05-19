'use strict';

const router = require('express').Router();
const R = require('ramda');
const Datastore = require('nedb');
const {loginSchema, validateAuthSchema} = require('./validateAuth');

const db = new Datastore({
    fileName: './user.db',
    autoLoad: true
});

module.exports = router.put('/', validateAuthSchema(loginSchema), async (req, res, next) => {
    const user = R.path(['headers', 'x-user'], req);

    await db.insert({user: user, date: new Date()})
    res.sendStatus(204);
});