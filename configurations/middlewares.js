'use strict';
const favicon = require('serve-favicon');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
};
