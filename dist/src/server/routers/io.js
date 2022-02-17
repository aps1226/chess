"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _socket = require("socket.io");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _gamesController = _interopRequireDefault(require("../controllers/gamesController"));

module.exports = function (server, app) {
  var io = new _socket.Server(server); // Middleware
  // Authenticate new connection.

  io.use(function (socket, next) {
    var token = socket.handshake.auth.token;
    return _jsonwebtoken.default.verify(token, String(process.env['ACCESS_TOKEN_SECRET']), function (err) {
      if (err) return next(new Error('JWT is invalid.'));
      return next();
    });
  });
  var db = app.locals['db'];
  var numClients = 0;
  var waitingClients = {
    1: null,
    2: null
  }; // Create a game room for matched players.

  var createGame = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var users, newGame, gameID, connectedSockets;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              users = Object.values(waitingClients);
              _context.next = 3;
              return _gamesController.default.newGame(db, users[0], users[1]);

            case 3:
              newGame = _context.sent;
              gameID = newGame['gameID'].toString();
              _context.next = 7;
              return io.in('waitingRoom').fetchSockets();

            case 7:
              connectedSockets = _context.sent;
              connectedSockets.forEach(function (socket) {
                socket.join(gameID);
                socket.leave('waitingRoom');
              });
              io.to(gameID).emit('gameData', newGame);
              console.log("Users ".concat(users[0], " and ").concat(users[1], " have joined a game together."));
              console.log("Sockets ".concat(connectedSockets[0].id, " and ").concat(connectedSockets[1].id, " are now connected in a game."));
              waitingClients[1] = null;
              waitingClients[2] = null;
              numClients = 0;

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function createGame() {
      return _ref.apply(this, arguments);
    };
  }(); // New connection


  io.on('connection', function (socket) {
    socket.on('newGame', function (userName) {
      console.log("".concat(userName, " would like to play a game."));
      socket.join('waitingRoom');
      numClients += 1;
      waitingClients[numClients] = userName;
      if (numClients >= 2) createGame();
    });
    socket.on('disconnect', function () {
      console.log('user disconnected');
    });
    socket.on('gameUpdate', function (_ref2) {
      var gameID = _ref2.gameID,
          state = _ref2.state;
      io.to(gameID.toString()).emit('updateState', state);
    });
  });
  return io;
};