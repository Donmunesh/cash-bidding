"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _validateParameters = _interopRequireDefault(require("../middleware/validateParameters"));

var _authenticateUser = _interopRequireDefault(require("../middleware/authenticateUser"));

var _validateLoan = _interopRequireDefault(require("../middleware/validateLoan"));

var _loanController = _interopRequireDefault(require("../controllers/loanController"));

var _validateRepayment = _interopRequireDefault(require("../middleware/validateRepayment"));

var _repaymentController = _interopRequireDefault(require("../controllers/repaymentController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loanRouter = (0, _express.Router)();
loanRouter.post('/loans', _authenticateUser["default"].verifyUser, _validateLoan["default"].validateLoanApply, _loanController["default"].createLoan);
loanRouter.post('/loans/:id/repayment', _validateParameters["default"].validateUUID, _validateRepayment["default"].validateRepayBody, _authenticateUser["default"].verifyAdmin, _validateRepayment["default"].validateRepayCredentials, _repaymentController["default"].postRepayment);
loanRouter.get('/loans', _validateLoan["default"].validateQueryOptions, _authenticateUser["default"].verifyAdmin, _loanController["default"].getAllLoans);
loanRouter.get('/loans/:id', _validateParameters["default"].validateUUID, _authenticateUser["default"].verifyAdmin, _loanController["default"].getOneLoan);
loanRouter.get('/loans/:id/repayments', _authenticateUser["default"].verifyUser, _validateParameters["default"].validateUUID, _repaymentController["default"].viewRepaymentHistory);
loanRouter.patch('/loans/:id', _authenticateUser["default"].verifyAdmin, _validateParameters["default"].validateUUID, _validateParameters["default"].validatePatchOptions, _loanController["default"].updateLoan);
var _default = loanRouter;
exports["default"] = _default;