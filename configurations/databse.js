'use strict';
const mongoose = require('mongoose');
module.exports = uri => {
  let db = mongoose.connect(uri);
  db.connection.on(`connected`, () => {
    console.log(`db connected on address ${uri}`);
  });

  db.connection.on(`disconnected`, () => {
    console.log(`db disconnected on address ${uri}`);
  });

  process.on(`SINGINT`, () => {
    db.connection.close(() => {
      console.log(`db closed on address ${uri}`);
    });
    process.exit(1); // close the process with signal 1
  });
};
