"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _mssql = _interopRequireDefault(require("mssql"));

var _apolloServerExpress = require("apollo-server-express");

var _helmet = _interopRequireDefault(require("helmet"));

var _schemasMap = _interopRequireDefault(require("./graphql/schemasMap"));

require('dotenv').config();

var app = (0, _express.default)();

var server = _http.default.createServer(app);

var PORT = process.env['PORT'] || 8080;
var staticFilesPath = process.env['NODE_ENV'] === 'production' ? 'src/public' : './dist/src/public';
var config = {
  user: String(process.env['NODE_ENV'] === 'production' ? process.env['PROD_DB_USERNAME'] : process.env['DEV_DB_USERNAME']),
  password: String(process.env['NODE_ENV'] === 'production' ? process.env['PROD_DB_PASSWORD'] : process.env['DEV_DB_PASSWORD']),
  server: String(process.env['NODE_ENV'] === 'production' ? process.env['PROD_DB_SERVER'] : process.env['DEV_DB_SERVER']),
  database: String(process.env['NODE_ENV'] === 'production' ? process.env['PROD_DB_NAME'] : process.env['DEV_DB_NAME']),
  pool: {
    max: 20,
    min: 10,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};
var appPool = new _mssql.default.ConnectionPool(config);
var apolloServer = new _apolloServerExpress.ApolloServer({
  schema: _schemasMap.default
});
appPool.connect().then(function (pool) {
  // DB connection for queries.
  app.locals['db'] = pool; // Serve static files.

  app.use(_express.default.static(staticFilesPath)); // Request body parsing.

  app.use(_express.default.json()); // Wrapper for 15 middleware function securing HTTP headers
  // returned by app.

  app.use((0, _helmet.default)());

  var usersRouter = require('./routers/usersRouter')(app);

  app.use('/api/users', usersRouter);

  var io = require('./routers/io')(server, app);

  app.set('socketio', io);
  app.get('/', function (req, res) {
    //res.render("index.html");
    res.send('test');
  });
  apolloServer.start().then(function () {
    apolloServer.applyMiddleware({
      app: app,
      path: '/graphql'
    });
  }).then(function () {
    console.log("Apollo server is listening at http://localhost:".concat(PORT).concat(apolloServer.graphqlPath, "."));
  });
  server.listen(PORT, function () {
    console.log("Server listening on http://localhost:".concat(PORT, "."));
  });
}).catch(function (e) {
  throw e;
});