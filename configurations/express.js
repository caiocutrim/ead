'use strict';

const express = require('express');
const load = require('express-load');

module.exports = () => {

  let app = express();


  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  require('./middlewares')(app);

  load('models', {'cwd':'./server'})
   .then('controllers')
   .then('routes')
   .into(app);


  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json(err);
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json(err);
  });


  return app;
};
