"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _validateUser = _interopRequireDefault(require("../middleware/validateUser"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authRoute = (0, _express.Router)();
authRoute.post('/signup', _validateUser["default"].validateProfileDetails, _userController["default"].createUser);
authRoute.post('/signin', _validateUser["default"].validateLoginDetails, _userController["default"].login);
var _default = authRoute;
exports["default"] = _default;