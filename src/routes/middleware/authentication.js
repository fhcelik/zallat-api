'use strict';

const Datastore = require('nedb');
const R = require('ramda');
const router = require('express').Router();
const {loginSchema, validateAuthSchema} = require('./validateAuth');
const { addUser } = require('../../facade/authentication');

const db = new Datastore({
    fileName: './user.db',
    autoLoad: true
});

router.put('/', validateAuthSchema(loginSchema), async (req, res, next) => {
    try {
        const user = R.path(['headers', 'x-user'], req);

        await addUser(user);
        res.sendStatus(204);
    }
    catch(error){
        return next(error)
    }
});

module.exports = router;