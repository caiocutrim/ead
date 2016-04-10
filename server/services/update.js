'use strict';
module.exports.updateDocument = (model, _id, data) => {
  let update = model.findByIdAndUpdate(_id, data).exec();
  update.then(result => result);
  return update;
};
