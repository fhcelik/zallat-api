'use strict';

/**
 * @swagger
 *
 * components:
 *   responses:
 *     Undefined:
 *       description: An undefined error occured
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: An error message describing the problem
 */
function errorHandler(err, req, res, next) {
  let message = 'Internal Server Error';

  if (err.status === 400) {
    message = err.message || 'Bad Request';
  } else if (err.status === 401) {
    message = err.message || 'Not Authenticated';  
  } 
  res.status(err.status || 500).send({ message });
}

module.exports = errorHandler;