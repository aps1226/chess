"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createToken = exports.authenticateToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var accessTokenSecret = String(process.env['NODE_ENV'] === 'production' ? process.env['PROD_ACCESS_TOKEN_SECRET'] : process.env['DEV_ACCESS_TOKEN_SECRET']);

var createToken = function createToken(req, res) {
  var _res$locals$queryResu = res["locals"]["queryResult"],
      userID = _res$locals$queryResu.userID,
      userName = _res$locals$queryResu.userName;

  var accessToken = _jsonwebtoken.default.sign({
    userID: userID,
    userName: userName
  }, accessTokenSecret, {
    expiresIn: '3600s'
  });

  res.status(201).json({
    token: accessToken
  });
};

exports.createToken = createToken;

var authenticateToken = function authenticateToken(req, res, next) {
  var authHeader = String(req.headers['authorization']);
  var token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send();
  return _jsonwebtoken.default.verify(token, accessTokenSecret, function (err, user) {
    if (err) return res.status(403).send();
    req.user = user;
    return next();
  });
};

exports.authenticateToken = authenticateToken;