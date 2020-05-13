'use strict';

const chai = require('chai');

chai.use(require('chai-as-promised'));
global.expect = chai.expect;
chai.should();

global.sinon = require('sinon');
