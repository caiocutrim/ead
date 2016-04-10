'use strict';
module.exports.removeDocument = (model, data) => {
  let remove = model.remove(data).exec();
  remove.then(result => result);
  return remove;
};
