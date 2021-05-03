"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressValidator = _interopRequireDefault(require("express-validator"));

var _auth = _interopRequireDefault(require("./auth"));

var _users = _interopRequireDefault(require("./users"));

var _loan = _interopRequireDefault(require("./loan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use((0, _expressValidator["default"])());
router.get('/', function (req, res) {
  res.status(200).json({
    message: 'Welcome to QuickCredit API v1'
  });
});
router.use('/auth', _auth["default"]);
router.use(_users["default"]);
router.use(_loan["default"]);
var _default = router;
exports["default"] = _default;