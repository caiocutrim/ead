'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../server/models/user')();

passport.use(new LocalStrategy((username, email, password, done) => {
  let credentials = {
    "username": username,
    "email": email
  };
  let user = User.findOne(credentials).exec();
  user.then(result => {
    if (!result) return done(null, false, { message: "Invalid Username" });
    if (!result.validPassword(password)) return done(null, false, { message: "Incorrect Password" });
    return done(null, result);
  });
  user.catch(err => {
    return done(err);
  });
}));
