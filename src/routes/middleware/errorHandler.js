'use strict';

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