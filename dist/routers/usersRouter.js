"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _usersController = _interopRequireDefault(require("../controllers/usersController"));

var _authenticate = require(".././authentication/authenticate");

module.exports = function (app) {
  var router = _express.default.Router();

  var db = app.locals['db']; // Get all users.

  router.get('/', _usersController.default.allUsers(db), function (req, res) {
    var result = JSON.stringify(res["locals"]["queryResult"]);
    res.status(200);
    res.send(result);
  }); // Find user based on userName, or email, and password.

  router.post('/login', _usersController.default.findUser(db), _authenticate.createToken); // Add new user.

  router.post('/register', _usersController.default.newUser(db), _usersController.default.findUser(db), _authenticate.createToken); // Update a field for an existing user.

  router.patch('/', _usersController.default.findUser(db), _usersController.default.updateUser(db), _usersController.default.findUser(db), function (req, res) {
    var result = JSON.stringify(res["locals"]["queryResult"]);
    res.status(201);
    res.send(result);
  }); // Delete a respective user.

  router.delete('/', _usersController.default.findUser(db), _usersController.default.deleteUser(db), function (req, res) {
    var result = JSON.stringify(res["locals"]["queryResult"]);
    res.status(204);
    res.send(result);
  });
  return router;
};