'use strict';

const express = require('express');
const proxyquire = require('proxyquire');
const bodyParser = require('body-parser');
const request = require('supertest');
const sinon = require('sinon');
const ErrorHandler = require('./errorHandler');

describe('middleware/authentication', () => {
  let app;
  let authentication;
  let db;

  beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    db = sinon.stub();

    authentication = proxyquire('./authentication',{
      './authentication':{
        db
      }
    });

    app
      .use(authentication)
      .use(ErrorHandler);
  });

  describe('PUT /', () => {
    it('should return 204 on setting user successfully', () => {
      const user = 'johnsmith@gmail.com';
      db.resolves();

      return request(app)
        .put('/')
        .send(user)
        .set('x-user', 'johnsmith@gmail.com')
        .expect(204)
    });

    it('should return 500 when there is invalid email in header', () => {
      const user = 'johnsmith@gmail.com';
      db.resolves();

      return request(app)
        .put('/')
        .send(user)
        .set('x-user', '')
        .expect(401)
    });
  });
});