"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = require("../authentication/bcrypt");

var usersController = {
  newUser: function newUser(db) {
    return /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, resp, next) {
        var _req$body, email, password, userName, hashedPassword, sql;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, password = _req$body.password, userName = _req$body.userName;
                _context.next = 3;
                return (0, _bcrypt.hash)(password);

              case 3:
                hashedPassword = _context.sent;
                sql = "\n        INSERT INTO users (email,password,userName)\n        VALUES ('".concat(email, "','").concat(hashedPassword, "','").concat(userName, "');\n        ");
                _context.next = 7;
                return db.query(sql, function (err, res) {
                  if (err) throw err;
                  resp["locals"]["queryResult"] = res['recordset'];
                  next();
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }();
  },
  findUser: function findUser(db) {
    return /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, resp, next) {
        var result, _result, _req$body2, userName, password, sql;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (req["body"]["userName"]) {
                  _context3.next = 5;
                  break;
                }

                result = JSON.stringify('No user name was sent.');
                resp.status(400);
                resp.send(result);
                return _context3.abrupt("return");

              case 5:
                ;

                if (req["body"]["password"]) {
                  _context3.next = 11;
                  break;
                }

                _result = JSON.stringify('No password was sent.');
                resp.status(400);
                resp.send(_result);
                return _context3.abrupt("return");

              case 11:
                ;
                _req$body2 = req.body, userName = _req$body2.userName, password = _req$body2.password;
                sql = "\n        SELECT * FROM users\n        WHERE \n          userName = '".concat(userName, "' OR email = '").concat(userName, "';");
                _context3.next = 16;
                return db.query(sql, /*#__PURE__*/function () {
                  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(err, res) {
                    var _result2, hashedPassword, correctPassword, _result3;

                    return _regenerator.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            if (!err) {
                              _context2.next = 2;
                              break;
                            }

                            throw err;

                          case 2:
                            if (res['recordset'][0]) {
                              _context2.next = 7;
                              break;
                            }

                            _result2 = JSON.stringify('User name not found.');
                            resp.status(400);
                            resp.send(_result2);
                            return _context2.abrupt("return");

                          case 7:
                            hashedPassword = res['recordset'][0].password;
                            _context2.next = 10;
                            return (0, _bcrypt.compare)(password, hashedPassword);

                          case 10:
                            correctPassword = _context2.sent;

                            if (correctPassword) {
                              _context2.next = 16;
                              break;
                            }

                            _result3 = JSON.stringify('Password is incorrect.');
                            resp.status(400);
                            resp.send(_result3);
                            return _context2.abrupt("return");

                          case 16:
                            resp["locals"]["queryResult"] = res['recordset'][0];
                            next();

                          case 18:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x7, _x8) {
                    return _ref3.apply(this, arguments);
                  };
                }());

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      };
    }();
  },
  updateUser: function updateUser(db) {
    return /*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(req, resp, next) {
        var result, _result4, userID, _req$body3, field, value, sql;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (req["body"]["field"]) {
                  _context4.next = 5;
                  break;
                }

                result = JSON.stringify('Update field not specified.');
                resp.status(400);
                resp.send(result);
                return _context4.abrupt("return");

              case 5:
                ;

                if (req["body"]["value"]) {
                  _context4.next = 11;
                  break;
                }

                _result4 = JSON.stringify('Update value not specified.');
                resp.status(400);
                resp.send(_result4);
                return _context4.abrupt("return");

              case 11:
                ;
                userID = resp["locals"]["queryResult"].userID;
                _req$body3 = req["body"], field = _req$body3.field, value = _req$body3.value;

                if (!(field === 'password')) {
                  _context4.next = 18;
                  break;
                }

                _context4.next = 17;
                return (0, _bcrypt.hash)(value);

              case 17:
                value = _context4.sent;

              case 18:
                sql = "\n        UPDATE users\n        SET ".concat(field, " = '").concat(value, "'\n        WHERE userId = '").concat(userID, "';\n        ");
                db.query(sql, function (err, res) {
                  if (err) throw err;
                  if (field === 'userName') req["body"]["userName"] = value;
                  next();
                });

              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x9, _x10, _x11) {
        return _ref4.apply(this, arguments);
      };
    }();
  },
  allUsers: function allUsers(db) {
    return function (req, resp, next) {
      var sql = "SELECT * FROM users;";
      db.query(sql, function (err, res) {
        if (err) throw err;
        resp["locals"]["queryResult"] = res['recordset'];
        next();
      });
    };
  },
  deleteUser: function deleteUser(db) {
    return function (req, resp, next) {
      var userID = resp["locals"]["queryResult"].userID;
      var sql = "\n      DELETE FROM users\n      WHERE userId = '".concat(userID, "';\n      ");
      db.query(sql, function (err, res) {
        if (err) throw err;
        resp["locals"]["queryResult"] = true;
        next();
      });
    };
  }
};
var _default = usersController;
exports.default = _default;