'use strict';
const passport = require('passport');
module.exports = function(app) {
  let ctrl = app.controllers.user;
  app.post('/register', ctrl.addUser);
  app.post('/login', passport.authenticate('local'), function(req, res) {
    res.status(200).json('ok your are authenticated!');
  });
};
