"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _userResolvers = require("./resolvers/userResolvers");

var resolverMap = (0, _lodash.merge)(_userResolvers.UserResolvers);
var _default = resolverMap;
exports.default = _default;