'use strict';
const User = require('../helpers/testmodules')('user');
const check = require('../helpers/testmodules').check;
const expect = require('chai').expect;
const should= require('chai').should();
const config = require('../../configurations/envs')();
const mongoose = require('mongoose');
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

  it('should update a document', done => {
    let create = User.create(mock);
    create.then(result => {
      let update = User.findByIdAndUpdate(result._id,
        {'username': 'Joane Doe',
        'email':'joanedoe@example.com',
        'password':'53120487',
        }).exec();
      update.then(result => {
       let ck = check(User, result._id);
       ck.then(result => {
          expect(result.username).to.be.equal('Joane Doe');
          expect(result.email).to.be.equal('joanedoe@example.com');
          expect(result.password).to.be.equal('53120487');
          done();
        });
      });
    });
  });

  it('should remove a document by Object.Id', done => {
    let create = User.create(mock);
    create.then(data => {
      let remove = User.remove({'_id': data._id}).exec();
      remove.then(data => {
        expect(data.result.ok).to.be.equal(1);
        done();
      });
    });
  });

  it('should be read one', done => {
    let create = User.create(mock);
    create.then(model => {
      check(User, model._id)
      .then(model => {
        expect(model.username).to.be.equal(mock.username);
        expect(model.email).to.be.equal(mock.email);
        expect(model.password).to.be.equal(mock.password);
        done();
      });
    });
  });
});

