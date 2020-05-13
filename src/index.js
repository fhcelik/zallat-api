'use strict';

const app = require('./app');
const env = require('./env');

app.listen(env.APP_PORT, env.APP_HOST);
