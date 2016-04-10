'use strict';

module.exports.saveModelData = (model, data) => {
  let save = model.create(data);
  save.then(result => result);
  return save;
};
