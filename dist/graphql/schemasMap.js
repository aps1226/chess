"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _load = require("@graphql-tools/load");

var _graphqlFileLoader = require("@graphql-tools/graphql-file-loader");

var _schema = require("@graphql-tools/schema");

var _path = require("path");

var _resolversMap = _interopRequireDefault(require("./resolversMap"));

var schema = (0, _load.loadSchemaSync)([(0, _path.join)(__dirname, './schemas/users.graphql')], {
  loaders: [new _graphqlFileLoader.GraphQLFileLoader()]
});
var schemaWithResolvers = (0, _schema.addResolversToSchema)({
  schema: schema,
  resolvers: _resolversMap.default
});
var _default = schema;
exports.default = _default;