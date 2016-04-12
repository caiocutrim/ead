'use strict';
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

module.exports = () => {
  let schema = mongoose.Schema({
    "username": {
      unique: true,
      required: true,
      type: String
    },
    "email": {
      unique: true,
      type: String,
      required: true,
      validate: {
        validator:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        message: "Please insert a valid email"
      }
    },
    password: String,
    created_at: {
      type: Date,
      default: Date.now
    }
  });
  schema.plugin(passportLocalMongoose, {
    usernameLowerCase: true
  });
  try {
    return mongoose.model('User');
  }catch(err) {
    return mongoose.model("User", schema);
  }
};
