"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserResolvers = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var users = [];
var UserResolvers = {
  Query: {
    login: function login(_, args) {
      var userExists = users.filter(function (user) {
        return user.userName === args.userName && user.email === args.email && user.password === args.password;
      })[0];
      return !!userExists;
    }
  },
  Mutation: {
    register: function register(_, args) {
      var newUser = {
        'userName': args.userName,
        'email': args.email,
        'password': args.password
      };
      users.push(newUser);
      return _objectSpread({}, newUser);
    }
  }
};
exports.UserResolvers = UserResolvers;