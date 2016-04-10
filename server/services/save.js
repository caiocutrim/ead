'use strict';

module.exports.saveModelData = (model, data) => {
  let save = model.create(data);
  return Promise.resolve(save.then(result => result), save.catch(err => err));
};
