'use strict';

module.exports.readOneDocument = (model, data) => {
  let readOne = model.findOne(data).exec();
  return Promise.resolve(readOne.then(result => result), readOne.catch(err => err));
};

module.exports.readDocuments = (model, data) => {
  let read= model.find(data).exec();
  return Promise.resolve(read.then(result => result), read.catch(err => err));
};
