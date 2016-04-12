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
  'email': 'johdoe@example.com',
  'password': '123455'
};

describe('#USER MODEL', () => {
  beforeEach(done => {
    if (mongoose.connection.db) return done();
    mongoose.connect(config.dbURI, done);
  });

  it('should save a document without errors', done => {
    User.register(new User({'username':mock.username, 'email': mock.email}), mock.password, (err, account) => {
      if (err) console.log(err);
      console.log(account);
      done();
    });
  });

  it('should update a document', done => {
    let create = User.create(mock);
    create.then(result => {
      let update = User.findByIdAndUpdate(result._id,
        {'username': 'Joane Doe',
        'email':'joanedoe@example.com'
        }).exec();
      update.then(result => {
       let ck = check(User, result._id);
       ck.then(result => {
          expect(result.username).to.be.equal('Joane Doe');
          expect(result.email).to.be.equal('joanedoe@example.com');
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
        expect(model.username).to.be.equal('john doe');
        expect(model.email).to.be.equal(mock.email);
        done();
      });
    });
  });
});

