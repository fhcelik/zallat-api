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

/**
 * @swagger
 *
 * /User:
 *   put:
 *     description: Save user log 
 *     summary: Save email
 *     tags: ['User']
 *     responses:
 *       204:
 *         description: a map of user 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         $ref: '#/components/responses/Undefined'
 */
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