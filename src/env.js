'use strict';

const envalid = require('envalid');

const { host, port, url } = envalid;

module.exports = envalid.cleanEnv(
  process.env,
  {
    APP_PORT: port({ default: 5000 }),
    APP_HOST: host({ default: 'localhost' }),
    APP_WEB_HOST_URL: url({ devDefault: 'http://localhost:3000' }),
  }
);