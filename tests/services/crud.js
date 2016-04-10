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
  describe('when instanced', function(){
    it('save should to be a function', () => {
      service.save.saveModelData.should.to.be.a('function');
    });
    it('remove should to be a function', () => {
      service.remove.removeDocument.should.to.be.a('function');
    });
    it('update should to be a function', () => {
      service.update.updateDocument.should.to.be.a('function');
    });
    it('read should to be a function', () => {
      service.read.readOneDocument.should.to.be.a('function');
    });
    it('read documents should to be a function', () => {
      service.read.readDocuments.should.to.be.a('function');
    });
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
        let update = service.update.updateDocument(User, result._id, {
          'username': 'jackdoe',
          'password': '1234ssds5',
          'email': 'jackdoe@example.com'
        });
        update.then(result => {
          let ck = check(User, result._id);
          ck.then(result => {
            result.username.should.to.be.equal('jackdoe');
            result.email.should.to.be.equal('jackdoe@example.com');
            result.password.should.to.be.equal('1234ssds5');
            done();
          });
        });
      });
    });
  });

  it('should find a list of documents', done => {
    let save = service.save.saveModelData(User, mock);
    save.then(result => {
      let read = service.read.readDocuments(User, result);
      read.then(result => {
        result.should.be.a('array');
        result[0].username.should.to.be.equal('john doe');
        result[0].password.should.to.be.equal('12345');
        result[0].email.should.to.be.equal('johndoe@example.com');
        done();
      });
    });
  });

  it('should return a error validate', done => {
    let save = service.save.saveModelData(User,
    {'username':'johndoe',
      'email':'johnexample',
      'password': 'lorem1345l'
    });
    save.catch(err => {
      err.should.to.be.a('object');
      err.message.should.to.be.equal('User validation failed');
      done();
    });
  });
});
