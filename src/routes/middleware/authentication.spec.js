'use strict';

const express = require('express');
const proxyquire = require('proxyquire');
const bodyParser = require('body-parser');
const request = require('supertest');
const sinon = require('sinon');
const chai = require('chai');
const ErrorHandler = require('./errorHandler');

chai.should();

describe('middleware/authentication', () => {
  let app;
  let authentication;
  let addUser;

  beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    addUser = sinon.stub();

    authentication = proxyquire('./authentication',{
      '../../facade/authentication':{
        addUser
      }
    });

    app
      .use(authentication)
      .use(ErrorHandler);
  });

  describe('PUT /', () => {
    it('should return 204 on setting user successfully', () => {
      const user = 'johnsmith@gmail.com';
      addUser.resolves();

      return request(app)
        .put('/')
        .send(user)
        .set('x-user', 'johnsmith@gmail.com')
        .expect(204)
        .then(() => addUser.calledOnce.should.be.true)
    });

    it('should return 401 when there is invalid email in header', () => {
      const user = 'johnsmith@gmail.com';

      return request(app)
        .put('/')
        .send(user)
        .set('x-user', '')
        .expect(401)
        .then(() => addUser.calledOnce.should.be.false)
    });

    it('should return 500 when no response', () => {
      addUser.rejects();

      return request(app)
        .put('/')
        .set('x-user', 'johnsmith@gmail.com')
        .expect(500)
        .then(() => addUser.calledOnce.should.be.true)
    });
  });
});