'use strict';

const router = require('express').Router();
const { version: apiVersion } = require('../../package');
const authentication = require('./middleware/authentication');
const errorHandler = require('./middleware/errorHandler');
const beers = require('./beers');
const rating = require('./rating');

router.get('/', (req, res, next) => {
  res.send(`API v${apiVersion}`);
});

router.use('/login',authentication);
router.use('/beers', beers);
router.use('/rating', rating);
router.use(errorHandler);

module.exports = router;