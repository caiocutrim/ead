'use strict';
module.exports = (app) => {
  let User = app.models.user;
  let ctrl = {};
  ctrl.addUser = (req, res) => {
    let credentials = {
      'username': req.body.username,
      'email': req.body.email
    };
    User.register(User(credentials), req.body.password, (err, result) => {
      if (err) {
        res.status(500).json(err);
        console.log(err);
      }
      res.status(200).json(result);
    });
  };
  ctrl.login = (err, res) => {
    console.log(err);
    // console.log(res);
    res.status(200).json();
  };
  ctrl.showUsers = (req, res) => {
    let user = User.find({}).exec();
    user.then(result => {
      res.status(200).json(result);
    });
    user.catch(err => {
      res.status(err).json(err);
    });
  };
  ctrl.removeUser = (req, res) => {
    let _id = req.params.id;
    let user = User.remove({"_id": req.params._id}).exec();
    user.then(result => {
      res.status(result).json(result);
    });
    user.catch(err => {
      res.status(err).json(err);
    });
  };

  ctrl.changeUserData = (req, res) => {
    let _id = req.body.id;
    let data = {
      'username': req.body.username,
      'email': req.body.email,
      'password': req.body.password
    };
    let user = User.findByIdAndUpdate(_id, data).exec();
    user.then(result => {
      res.status(result).json(result);
    });
    user.catch(err => {
      res.status(err).json(err);
    });
  };
  return ctrl;
};
