'use strict';
const service = require('../../server/services/')();
const check = require('../helpers/testmodules').check;
const User = require('../helpers/testmodules')('user');
const should= require('chai').should();
const config = require('../../configurations/envs')();
const mongoose = require('mongoose');
const dbCLEAR = require('mocha-mongoose')(config.dbURI);

let mock = {
  'username': 'john doe',
  'email': 'johndoe@example.com',
  'password': 12345
};
describe('#SERVICE', () => {
  beforeEach(done => {
    if (mongoose.connection.db) return done();
    mongoose.connect(config.dbURI, done);
  });
  it('should save a model asynchronoulsy', done => {
    let save = service.save.saveModelData(User, mock);
    save.then(result => {
      result.username.should.to.be.equal('john doe');
      result.password.should.to.be.equal('12345');
      result.email.should.to.be.equal('johndoe@example.com');
      done();
    });
  });
  it('should remove a model asynchronoulsy', done => {
    let remove = service.remove.removeDocument(User, mock.username);
    remove.then(response => {
      response.result.ok.should.to.be.equal(1);
      response.result.n.should.to.be.equal(0);
      done();
    });
  });
  it('should find one document', done => {
    let save = service.save.saveModelData(User, mock);
    save.then(result => {
      let read = service.read.readOneDocument(User, result);
      read.then(result => {
        result.username.should.to.be.equal('john doe');
        result.password.should.to.be.equal('12345');
        result.email.should.to.be.equal('johndoe@example.com');
        done();
      });
    });
  });

  it('should update a document', done => {
    let save = service.save.saveModelData(User, mock);
    save.then(result => {
      let read = service.read.readOneDocument(User, result);
      read.then(result => {
        let update = service.update.updateDocument(User, result._id, {'username': 'jackdoe'});
        update.then(result => {
          let ck = check(User, result._id);
          ck.then(result => {
            console.log(`\t ${result.username}`);
            result.username.should.to.be.equal('jackdoe');
            done();
          });
        });
      });
    });
  });

});
