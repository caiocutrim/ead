'use strict';
module.exports.updateDocument = (model, _id, data) => {
  let update = model.findByIdAndUpdate(_id, data).exec();
  return Promise.resolve(update.then(result => result), update.catch(err => err));
};
