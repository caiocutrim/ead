module.exports = (app) => {
  let ctrl = app.controllers.user;
  app.route('/api/users')
  .post(ctrl.addNewUser)
  .get(ctrl.listAllUsers);

  app.route('/api/users/:id')
  .put(ctrl.updateUserData)
  .delete(ctrl.removeUserData);
};
