'use strict';
module.exports.removeDocument = (model, data) => {
  let remove = model.remove(data).exec();
  return Promise.resolve(remove.then(result => result), remove.catch(err => err));
};
