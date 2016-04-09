'use strict';

module.exports = modelReceived => {
  let model = require(`../../server/models/${modelReceived}`)();
  return model;
};

exports.check = (modelReceived, done) => {
  let model = modelReceived.findOne(model._id).exec();

  model.then(response => {
    if (response.body === null) {
      console.log(`model not found, response iss ${response}`);
      done();
    } else {
      console.log(`response is ${response.body}`);
      done();
    }
  });
};
