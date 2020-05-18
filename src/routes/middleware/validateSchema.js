'use strict';

const validate = require('bluebird').promisify(require('joi').validate).bind(require('joi'));
const Joi = require('joi');
const R = require('ramda');

exports.loginSchema = Joi.object().keys({
  user: Joi.string()
    .email()
    .required(),
});

exports.ratingSchema = Joi.object().keys({
  id:Joi.number().required(),
  rating:Joi.number().valid(1,2,3,4,5).required(),
  comment: Joi.string(),
});

exports.validateSchema = schema => (req, res, next) =>{
  const { 'x-user':user } = req.headers; 
  req.body = {  user: user };

  validate(req.body, schema)
    .then(() => {
      next();
    })
    .catch(() => {
      next({ status: 400, message: 'Invalid json schema' });
  });
}