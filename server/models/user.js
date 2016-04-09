'use strict';
const mongoose = require('mongoose');
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

  return mongoose.model("User", schema);
};
