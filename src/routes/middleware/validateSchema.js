'use strict';

const validate = require('bluebird').promisify(require('joi').validate).bind(require('joi'));
const Joi = require('joi');

exports.ratingSchema = Joi.object().keys({
  id:Joi.number(),
  rating:Joi.number().valid(1,2,3,4,5).required(),
  comment: Joi.string(),
});

exports.validateSchema = schema => (req, res, next) =>
  validate(req.body, schema)
    .then(() => {
      next();
    })
    .catch(() => {
      next({ status: 400, message: 'Invalid json schema' });
  });
