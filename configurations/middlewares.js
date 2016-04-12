'use strict';
const favicon = require('serve-favicon');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const passport = require('passport');
module.exports = (app) => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(passport.initialize());
};
