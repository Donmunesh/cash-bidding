"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _debug = _interopRequireDefault(require("debug"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var Debug = (0, _debug["default"])('http');
var PORT = process.env.PORT || 3000;
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _morgan["default"])(':method :url :status :response-time ms'));
app.use((0, _cors["default"])());
app.options('*', (0, _cors["default"])());
app.use('/api/v1/', _routes["default"]);
app.get('/', function (req, res) {
  res.status(301).redirect('/docs');
});
app.get('/docs', function (req, res) {
  res.status(200).sendFile(_path["default"].resolve('./server/docs/quickcredit-docs.html'));
});
app.all('*', function (req, res) {
  res.status(404).json({
    error: 'Route is Invalid'
  });
});
app.listen(PORT, function () {
  return Debug("Server running on port ".concat(PORT));
});
var _default = app;
exports["default"] = _default;