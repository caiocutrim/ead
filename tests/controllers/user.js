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

it('should to be able to save a User', function(){
});
