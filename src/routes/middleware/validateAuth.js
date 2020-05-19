'use strict';

const validate = require('bluebird').promisify(require('joi').validate).bind(require('joi'));
const Joi = require('joi');

exports.loginSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
});

exports.validateAuthSchema = schema => (req, res, next) =>{
  const { 'x-user': email } = req.headers

  validate({ email }, schema)
    .then(() => {
      next();
    })
    .catch(() => {
      next({ status: 401, message: 'Invalid email format' });
  });
}