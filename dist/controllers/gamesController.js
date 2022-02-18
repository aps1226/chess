"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var gamesController = {
  newGame: function () {
    var _newGame = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(db, userName_1, userName_2) {
      var sql, userId_1, userId_2, gameID;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Get userId from first user's user name.
              sql = "\n    SELECT * FROM users\n    WHERE userName = '".concat(userName_1, "';");
              _context.next = 3;
              return new Promise(function (resolve, reject) {
                db.query(sql, function (err, res) {
                  if (err) return reject(err);
                  return resolve(res['recordset'][0]['userID']);
                });
              });

            case 3:
              userId_1 = _context.sent;
              // Get userId from second user's user name.
              sql = "\n    SELECT * FROM users\n    WHERE userName = '".concat(userName_2, "';");
              _context.next = 7;
              return new Promise(function (resolve, reject) {
                db.query(sql, function (err, res) {
                  if (err) return reject(err);
                  return resolve(res['recordset'][0]['userID']);
                });
              });

            case 7:
              userId_2 = _context.sent;
              // Create new game board in db.
              sql = "\n    INSERT INTO games (playerW, playerB, winner, tie, turns,blackRook_1, blackKnight_1, blackBishop_1, blackKing, blackQueen, blackBishop_2, blackKnight_2, blackRook_2,\n        blackPawn_1, blackPawn_2, blackPawn_3, blackPawn_4, blackPawn_5, blackPawn_6, blackPawn_7, blackPawn_8,\n        whiteRook_1, whiteKnight_1, whiteBishop_1, whiteKing, whiteQueen, whiteBishop_2, whiteKnight_2, whiteRook_2,\n        whitePawn_1, whitePawn_2, whitePawn_3, whitePawn_4, whitePawn_5, whitePawn_6, whitePawn_7, whitePawn_8)\n    OUTPUT Inserted.*\n    VALUES (".concat(userId_1, ",").concat(userId_2, ", 0, 0, 0,'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',\n        'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',\n        'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',\n        'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2');\n    ");
              _context.next = 11;
              return new Promise(function (resolve, reject) {
                db.query(sql, function (err, res) {
                  if (err) return reject(err);
                  return resolve(res['recordset'][0]);
                });
              });

            case 11:
              gameID = _context.sent;
              return _context.abrupt("return", gameID);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function newGame(_x, _x2, _x3) {
      return _newGame.apply(this, arguments);
    }

    return newGame;
  }(),
  findGame: function findGame(db) {
    return function (req, resp, next) {
      if (!req["body"]["gameID"]) {
        var result = JSON.stringify('No game ID was sent.');
        resp.status(400);
        resp.send(result);
        return;
      }

      ;
      var gameID = req.body.gameID;
      var sql = "SELECT * FROM games  WHERE gameID = '".concat(gameID, "';");
      db.query(sql, function (err, res) {
        if (err) throw err;
        console.log(res);
        resp["locals"]["queryResult"] = res;
        next();
      });
    };
  },
  updateGame: function updateGame(db) {
    return function (req, resp, next) {
      if (!req["body"]["gameID"]) {
        var result = JSON.stringify('No game ID was sent.');
        resp.status(400);
        resp.send(result);
        return;
      }

      ;

      if (!req["body"]["field"]) {
        var _result = JSON.stringify('Update field not specified.');

        resp.status(400);
        resp.send(_result);
        return;
      }

      ;

      if (!req["body"]["value"]) {
        var _result2 = JSON.stringify('Update value not specified.');

        resp.status(400);
        resp.send(_result2);
        return;
      }

      ;
      var _req$body = req.body,
          gameID = _req$body.gameID,
          field = _req$body.field,
          value = _req$body.value;
      var sql = "\n        UPDATE games\n        SET ".concat(field, " = '").concat(value, "'\n        WHERE gameID = '").concat(gameID, "';\n        ");
      db.query(sql, function (err, res) {
        if (err) throw err;
        next();
      });
    };
  }
};
var _default = gamesController;
exports.default = _default;