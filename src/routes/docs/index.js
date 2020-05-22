const router = require('express').Router();
const path = require('path');
var swaggerJSDoc = require('swagger-jsdoc');
const { version: apiVersion } = require('../../../package');

var swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Vintri API',
      version: apiVersion,
      description:
        'Open API description and documentation of the Vintri API',
    },
    basePath: '/',
  },
  apis: ['./src/routes/**/*.js'],
});

router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname + '/redoc.html'))
);

module.exports = router;