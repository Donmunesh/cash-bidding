"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _validateParameters = _interopRequireDefault(require("../middleware/validateParameters"));

var _authenticateUser = _interopRequireDefault(require("../middleware/authenticateUser"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _loanController = _interopRequireDefault(require("../controllers/loanController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRoute = (0, _express.Router)();
userRoute.get('/users', _authenticateUser["default"].verifyAdmin, _userController["default"].getAllUsers);
userRoute.get('/users/:email', _validateParameters["default"].validateEmail, _authenticateUser["default"].verifyAdmin, _userController["default"].getUser);
userRoute.get('/user/loans', _authenticateUser["default"].verifyUser, _loanController["default"].viewUserLoans);
userRoute.patch('/users/:email/verify', _validateParameters["default"].validateEmail, _validateParameters["default"].validateStatus, _authenticateUser["default"].verifyAdmin, _userController["default"].verifyUser);
var _default = userRoute;
exports["default"] = _default;