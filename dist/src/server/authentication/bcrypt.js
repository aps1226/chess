"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hash = exports.compare = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var saltRounds = Number(process.env['NODE_ENV'] === 'production' ? process.env['PROD_SALT_ROUNDS'] : process.env['DEV_SALT_ROUNDS']);

var hash = function hash(password) {
  return new Promise(function (resolve, reject) {
    _bcryptjs.default.hash(password, saltRounds, function (err, hash) {
      if (err) return reject(err);
      return resolve(hash);
    });
  });
};

exports.hash = hash;

var compare = function compare(password, hash) {
  return new Promise(function (resolve, reject) {
    _bcryptjs.default.compare(password, hash, function (err, res) {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};

exports.compare = compare;