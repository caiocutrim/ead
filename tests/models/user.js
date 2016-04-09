'use strict';
const mongoose  = require('mongoose');
const User = require('../helpers/testmodules')('user');
const check = require('../helpers/testmodules').check;
const expect = require('chai').expect;
const should = require('chai').should();
const config = require('../../configurations/envs')();
const dbCLEAR = require('mocha-mongoose')(config.dbURI);
// testing mock data and validation
let mock = {
  'username': 'John Doe',
  'password': '12345',
  'email': 'johdoe@example.com'
};

describe('#USER MODEL', () => {
  beforeEach(done => {
    if (mongoose.connection.db) return done();
    mongoose.connect(config.dbURI, done);
  });

  it('should save a document without errors', done => {
    let user = User.create(mock);
    user.then(result => {
      expect(result.username).to.be.equal(mock.username);
      expect(result.email).to.be.equal(mock.email);
      done();
    });
    user.catch(err => {
      console.log(err);
      done();
    });
  });
});

