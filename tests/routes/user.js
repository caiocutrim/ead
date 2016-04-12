'use strict';
const request = require('supertest-as-promised');
const User = require('../helpers/testmodules')('user');
const check = require('../helpers/testmodules').check;
const expect = require('chai').expect;
const should= require('chai').should();
const config = require('../../configurations/envs')();
const mongoose = require('mongoose');
const dbCLear = require('mocha-mongoose')(config.dbURI);


describe('#ROUTES', () =>{
  let app = request(`${config.host}:${config.port}`);
  describe('#authentication', () => {
    it('should be able to register an user', done =>{
      app.post('/register')
      .type('json')
      .send({'username':'John doe', 'email': 'john@doeexample.com', 'password': 'qwer12355'})
      .expect(200)
      .then(result => {
        console.log(`result log ${JSON.stringify(result.body.username)}`);
        console.log(`result log ${JSON.stringify(result.body.email)}`);
        done();
      })
      .catch(err => {
        console.log(`err log ${err}`);
        done();
      });
    });

    it('should be able to authenticate an user', done =>{
      app.post('/login')
      .send({'username':'john doe', 'email': 'john@doeexample.com', 'password': 'qwer12355'})
      .expect(401)
      .then(result => {
        done();
      });
    });
  });
});
