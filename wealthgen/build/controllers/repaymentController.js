"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

var _dbconnection = _interopRequireDefault(require("../database/dbconnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class RepaymentController
 * @description specifies which method handles a request for the Loan endpoints
 * @exports RepaymentController
 */
var RepaymentController = /*#__PURE__*/function () {
  function RepaymentController() {
    _classCallCheck(this, RepaymentController);
  }

  _createClass(RepaymentController, null, [{
    key: "postRepayment",
    value:
    /**
     * @method postRepayment
     * @description
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */
    function () {
      var _postRepayment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var id, paidAmount, query, repaid, check, newBalance, loanQuery, repayValues, updateQuery, insert, paymentValues, repayment;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = req.params.id;
                paidAmount = parseInt(req.body.paidAmount, 10);
                query = "SELECT * FROM loans WHERE id='".concat(id, "'");
                repaid = false;
                _context.next = 6;
                return _dbconnection["default"].query(query);

              case 6:
                check = _context.sent;
                newBalance = check.rows[0].balance - paidAmount;
                loanQuery = "UPDATE loans SET repaid=$1, balance=$2\n                      WHERE id=$3 RETURNING *";

                if (newBalance <= 0) {
                  repaid = true;
                } else check.rows[0].balance -= paidAmount;

                repayValues = [repaid, newBalance, id];
                _context.next = 13;
                return _dbconnection["default"].query(loanQuery, repayValues);

              case 13:
                updateQuery = _context.sent;
                insert = "INSERT into repayments(id, loanId, amount)\n      VALUES($1, $2, $3) RETURNING *";
                paymentValues = [(0, _v["default"])(), id, paidAmount];
                _context.next = 18;
                return _dbconnection["default"].query(insert, paymentValues);

              case 18:
                repayment = _context.sent;
                res.status(201).json({
                  status: 201,
                  message: 'Payment successfully made',
                  data: {
                    id: repayment.rows[0].id,
                    loanid: repayment.rows[0].loanid,
                    createdon: repayment.rows[0].createdon,
                    amount: updateQuery.rows[0].amount,
                    monthlyinstallment: updateQuery.rows[0].paymentinstallment,
                    paidamount: repayment.rows[0].amount,
                    balance: updateQuery.rows[0].balance
                  }
                });

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function postRepayment(_x, _x2) {
        return _postRepayment.apply(this, arguments);
      }

      return postRepayment;
    }()
    /**
     * @method viewRepaymentsHistory
     * @description
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */

  }, {
    key: "viewRepaymentHistory",
    value: function () {
      var _viewRepaymentHistory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var email, id, user, query, checkLoan, _yield$DB$query, rows, rowCount;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                email = req.user.email;
                id = req.params.id;
                user = "SELECT * FROM loans WHERE email='".concat(email, "'");
                query = "SELECT * FROM repayments WHERE loanId='".concat(id, "'");
                _context2.next = 6;
                return _dbconnection["default"].query(user);

              case 6:
                checkLoan = _context2.sent;

                if (!(!checkLoan.rows.email === email || checkLoan.rows.isadmin === false)) {
                  _context2.next = 10;
                  break;
                }

                res.status(403).json({
                  status: 403,
                  error: 'You are not authorized'
                });
                return _context2.abrupt("return");

              case 10:
                _context2.next = 12;
                return _dbconnection["default"].query(query);

              case 12:
                _yield$DB$query = _context2.sent;
                rows = _yield$DB$query.rows;
                rowCount = _yield$DB$query.rowCount;

                if (!(rowCount < 1)) {
                  _context2.next = 18;
                  break;
                }

                res.status(404).json({
                  status: 404,
                  error: 'No repayment history for loan'
                });
                return _context2.abrupt("return");

              case 18:
                res.status(200).json({
                  status: 200,
                  message: 'Success',
                  data: _toConsumableArray(rows)
                });

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function viewRepaymentHistory(_x3, _x4) {
        return _viewRepaymentHistory.apply(this, arguments);
      }

      return viewRepaymentHistory;
    }()
  }]);

  return RepaymentController;
}();

exports["default"] = RepaymentController;