'use strict';

function errorHandler(err, req, res, next) {
  let message = 'Internal Server Error';

  if (err.status === 400) {
    message = err.message || 'Bad Request';
  } else if (err.status === 401) {
    message = err.message || 'Not Authenticated';
  } else if (err.status === 403) {
    message = err.message || 'Forbidden';
  } else if (err.status === 404) {
    message = err.message || 'Not Found';
  } else if (err.status === 405) {
    message = err.message || 'Method Not Allowed';
  } else if (err.status === 409) {
    message = err.message || 'Conflict';
  }
  
  res.status(err.status || 500).send({ message });
}

module.exports = errorHandler;