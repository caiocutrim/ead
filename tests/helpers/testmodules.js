'use strict';

module.exports = modelReceived => {
  return require(`../../server/models/${modelReceived}`)();
};

module.exports.check = (modelReceived, _id) => {
  let model = modelReceived.findOne(_id).exec();
  return Promise.resolve(model.then(response => response ), model.catch(err => err));
};

