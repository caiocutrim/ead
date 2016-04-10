'use strict';

module.exports.readOneDocument = (model, data) => {
  let readOne = model.findOne(data).exec();
  readOne.then(result => result);
  return readOne;
};

module.exports.readDocuments = (model, data) => {
  let read= model.find(data).exec();
  read.then(result => result);
  return read;
};
