'use strict';

const router = require('express').Router();
const { version: apiVersion } = require('../../package');
//const ErrorHandler = require('./middleware/errorHandler');
//const login = require('./middleware/login');
const beers = require('./beers');
const errorHandler = require('./middleware/errorHandler')

router.get('/', (req, res, next) => {

  res.send(`API v${apiVersion}`);
});

router.use('/beers', beers);

router.use(errorHandler);

module.exports = router;