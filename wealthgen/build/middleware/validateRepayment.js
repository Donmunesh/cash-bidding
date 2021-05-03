"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dbconnection = _interopRequireDefault(require("../database/dbconnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class ValidateRepayment
 * @description Intercepts and validates a given request for Repayment endpoints
 * @exports ValidateRepayment
 */
var ValidateRepayment = /*#__PURE__*/function () {
  function ValidateRepayment() {
    _classCallCheck(this, ValidateRepayment);
  }

  _createClass(ValidateRepayment, null, [{
    key: "validateRepayBody",
    value:
    /**
     * @method validateRepayBody
     * @description
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns
     */
    function () {
      var _validateRepayBody = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var errors;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                req.checkParams('id').isUUID().withMessage('Id should be a valid UUID');
                req.checkBody('loanId').notEmpty().withMessage('Specify LoanId for this transaction').isUUID().withMessage('LoanId should be a valid UUID');
                req.checkBody('paidAmount').notEmpty().withMessage('Enter amount to be repaid').isNumeric().withMessage('paidAmount should be an integer');
                errors = req.validationErrors();

                if (!errors) {
                  _context.next = 7;
                  break;
                }

                res.status(400).json({
                  status: 400,
                  error: errors[0].msg
                });
                return _context.abrupt("return");

              case 7:
                next();

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function validateRepayBody(_x, _x2, _x3) {
        return _validateRepayBody.apply(this, arguments);
      }

      return validateRepayBody;
    }()
    /**
     * @method validateRepayCredentials
     * @description
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns
     */

  }, {
    key: "validateRepayCredentials",
    value: function () {
      var _validateRepayCredentials = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
        var id, paidAmount, checkQuery, check, _check$rows, loan;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = req.params.id;
                paidAmount = parseInt(req.body.paidAmount, 10);
                checkQuery = "SELECT * FROM loans WHERE id='".concat(id, "'");
                _context2.next = 5;
                return _dbconnection["default"].query(checkQuery);

              case 5:
                check = _context2.sent;

                if (!(check.rows.length < 1)) {
                  _context2.next = 9;
                  break;
                }

                res.status(404).json({
                  status: 404,
                  error: 'Loan record not found'
                });
                return _context2.abrupt("return");

              case 9:
                if (!(check.rows[0].status !== 'approved')) {
                  _context2.next = 12;
                  break;
                }

                res.status(422).json({
                  error: 'Loan request is not approved!'
                });
                return _context2.abrupt("return");

              case 12:
                if (!(paidAmount !== check.rows[0].paymentinstallment)) {
                  _context2.next = 15;
                  break;
                }

                res.status(409).json({
                  error: "You are supposed to pay ".concat(check.rows[0].paymentinstallment, " monthly")
                });
                return _context2.abrupt("return");

              case 15:
                if (!(check.rows[0].repaid === true)) {
                  _context2.next = 18;
                  break;
                }

                res.status(409).json({
                  status: 409,
                  error: 'Loan already repaid'
                });
                return _context2.abrupt("return");

              case 18:
                _check$rows = _slicedToArray(check.rows, 1), loan = _check$rows[0];
                req.loan = loan;
                next();

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function validateRepayCredentials(_x4, _x5, _x6) {
        return _validateRepayCredentials.apply(this, arguments);
      }

      return validateRepayCredentials;
    }()
  }]);

  return ValidateRepayment;
}();

exports["default"] = ValidateRepayment;