'use strict';
module.exports = () => {
  return {
    save: require('./save'),
    update: require('./update'),
    remove: require('./remove'),
    read: require('./read')
  };
};
