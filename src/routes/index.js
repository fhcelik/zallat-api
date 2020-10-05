'use strict';

const router = require('express').Router();
const { version: apiVersion } = require('../../package');
const errorHandler = require('./middleware/errorHandler');
const emission = require('./emission');

router.get('/', (req, res, next) => {
  res.send(`API v${apiVersion}`);
});

router.use('/emission', emission);
router.use(errorHandler);

module.exports = router;