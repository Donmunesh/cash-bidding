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
 * @class LoanController
 * @description specifies which method handles a request for the Loan endpoints
 * @exports LoanController
 */
var LoanController = /*#__PURE__*/function () {
  function LoanController() {
    _classCallCheck(this, LoanController);
  }

  _createClass(LoanController, null, [{
    key: "createLoan",
    value:
    /**
     * @method createLoan
     * @description Creates a loan application request
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */
    function () {
      var _createLoan = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var email, _req$body, amount, tenor, loan, userQuery, userStatus, loanQuery, verify, insertQuery, values, _yield$DB$query, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = req.user.email;
                _req$body = req.body, amount = _req$body.amount, tenor = _req$body.tenor;
                _context.t0 = email;
                _context.t1 = 0.05 * parseInt(amount, 10);
                loan = {
                  email: _context.t0,
                  interest: _context.t1,

                  get paymentInstallment() {
                    return (parseInt(amount, 10) + this.interest) / parseInt(tenor, 10);
                  },

                  get balance() {
                    return parseInt(this.paymentInstallment, 10) * parseInt(tenor, 10);
                  },

                  status: 'pending',
                  repaid: false
                };
                _context.prev = 5;
                userQuery = "SELECT * FROM users WHERE email='".concat(email, "'");
                _context.next = 9;
                return _dbconnection["default"].query(userQuery);

              case 9:
                userStatus = _context.sent;

                if (!(userStatus.rows[0].status !== 'verified')) {
                  _context.next = 13;
                  break;
                }

                res.status(401).json({
                  status: 401,
                  error: 'User must be verified first'
                });
                return _context.abrupt("return");

              case 13:
                loanQuery = "SELECT * FROM loans WHERE email='".concat(email, "'");
                _context.next = 16;
                return _dbconnection["default"].query(loanQuery);

              case 16:
                verify = _context.sent;

                if (!(!verify.rows.length || verify.rows[verify.rows.length - 1].repaid === true)) {
                  _context.next = 26;
                  break;
                }

                insertQuery = "INSERT INTO\n        loans(id,email,amount,interest,status,repaid,tenor,paymentInstallment, balance)\n        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;";
                values = [(0, _v["default"])(), email, amount, loan.interest, loan.status, loan.repaid, tenor, loan.paymentInstallment, loan.balance];
                _context.next = 22;
                return _dbconnection["default"].query(insertQuery, values);

              case 22:
                _yield$DB$query = _context.sent;
                rows = _yield$DB$query.rows;
                res.status(201).json({
                  status: 201,
                  message: 'Loan request created successfully',
                  data: rows[0]
                });
                return _context.abrupt("return");

              case 26:
                res.status(409).json({
                  status: 409,
                  error: 'You already applied for a loan'
                });
                _context.next = 32;
                break;

              case 29:
                _context.prev = 29;
                _context.t2 = _context["catch"](5);
                res.status(500).json({
                  status: 500,
                  error: 'An internal error occurred at the server'
                });

              case 32:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 29]]);
      }));

      function createLoan(_x, _x2) {
        return _createLoan.apply(this, arguments);
      }

      return createLoan;
    }()
    /**
     * @method getAllLoans
     * @description List all loan applications in the database
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */

  }, {
    key: "getAllLoans",
    value: function () {
      var _getAllLoans = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$query, status, repaid, query, _yield$DB$query2, _rows, _yield$DB$query3, _rows2, _yield$DB$query4, _rows3, _yield$DB$query5, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$query = req.query, status = _req$query.status, repaid = _req$query.repaid;

                if (!(status && repaid)) {
                  _context2.next = 9;
                  break;
                }

                query = "SELECT * FROM loans WHERE status='".concat(status, "' AND repaid='").concat(repaid, "'");
                _context2.next = 5;
                return _dbconnection["default"].query(query);

              case 5:
                _yield$DB$query2 = _context2.sent;
                _rows = _yield$DB$query2.rows;
                res.status(200).json({
                  status: 200,
                  message: 'Success',
                  data: _toConsumableArray(_rows)
                });
                return _context2.abrupt("return");

              case 9:
                if (!status) {
                  _context2.next = 17;
                  break;
                }

                query = "SELECT * FROM loans WHERE status='".concat(status, "'");
                _context2.next = 13;
                return _dbconnection["default"].query(query);

              case 13:
                _yield$DB$query3 = _context2.sent;
                _rows2 = _yield$DB$query3.rows;
                res.status(200).json({
                  status: 200,
                  message: 'Success',
                  data: _toConsumableArray(_rows2)
                });
                return _context2.abrupt("return");

              case 17:
                if (!repaid) {
                  _context2.next = 25;
                  break;
                }

                query = "SELECT * FROM loans WHERE repaid='".concat(repaid, "'");
                _context2.next = 21;
                return _dbconnection["default"].query(query);

              case 21:
                _yield$DB$query4 = _context2.sent;
                _rows3 = _yield$DB$query4.rows;
                res.status(200).json({
                  status: 200,
                  message: 'Success',
                  data: _toConsumableArray(_rows3)
                });
                return _context2.abrupt("return");

              case 25:
                query = 'SELECT * FROM loans';
                _context2.next = 28;
                return _dbconnection["default"].query(query);

              case 28:
                _yield$DB$query5 = _context2.sent;
                rows = _yield$DB$query5.rows;
                res.status(200).json({
                  status: 200,
                  message: 'Success',
                  data: _toConsumableArray(rows)
                });

              case 31:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAllLoans(_x3, _x4) {
        return _getAllLoans.apply(this, arguments);
      }

      return getAllLoans;
    }()
    /**
     * @method getOneLoan
     * @description Retrieves a specific loan record by Id
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */

  }, {
    key: "getOneLoan",
    value: function () {
      var _getOneLoan = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var id, query, _yield$DB$query6, rows, rowCount;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.params.id;
                query = "SELECT * FROM loans WHERE id='".concat(id, "'");
                _context3.next = 4;
                return _dbconnection["default"].query(query);

              case 4:
                _yield$DB$query6 = _context3.sent;
                rows = _yield$DB$query6.rows;
                rowCount = _yield$DB$query6.rowCount;

                if (!(rowCount < 1)) {
                  _context3.next = 10;
                  break;
                }

                res.status(404).json({
                  status: 404,
                  error: 'Loan record not found'
                });
                return _context3.abrupt("return");

              case 10:
                res.status(200).json({
                  status: 200,
                  message: 'Success',
                  data: rows[0]
                });

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getOneLoan(_x5, _x6) {
        return _getOneLoan.apply(this, arguments);
      }

      return getOneLoan;
    }()
    /**
     * @method updateLoan
     * @description Edit the status of a loan record
     * @param {object} req Request object
     * @param {object} res Response object
     * @returns {object} JSON API Response
     */

  }, {
    key: "updateLoan",
    value: function () {
      var _updateLoan = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var id, status, query, update, fetchLoan, _yield$DB$query7, rows;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.params.id;
                status = req.body.status;
                query = "SELECT * FROM loans WHERE id='".concat(id, "'");
                update = "UPDATE loans\n      SET status='".concat(status, "' WHERE id='").concat(id, "' RETURNING *");
                _context4.next = 6;
                return _dbconnection["default"].query(query);

              case 6:
                fetchLoan = _context4.sent;

                if (fetchLoan.rows.length) {
                  _context4.next = 10;
                  break;
                }

                res.status(404).json({
                  status: 404,
                  message: 'Failure',
                  error: 'Loan record not found'
                });
                return _context4.abrupt("return");

              case 10:
                if (!(fetchLoan.rows[0].status === 'approved')) {
                  _context4.next = 13;
                  break;
                }

                res.status(409).json({
                  status: 409,
                  message: 'Failure',
                  error: 'Loan is already approved'
                });
                return _context4.abrupt("return");

              case 13:
                _context4.next = 15;
                return _dbconnection["default"].query(update);

              case 15:
                _yield$DB$query7 = _context4.sent;
                rows = _yield$DB$query7.rows;
                res.status(201).json({
                  status: 201,
                  message: 'Loan record updated',
                  data: rows[0]
                });

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function updateLoan(_x7, _x8) {
        return _updateLoan.apply(this, arguments);
      }

      return updateLoan;
    }()
    /**
     * @method viewUserLoans
     * @description Fetches all loan requests for a particular user
     * @param {object} req Request object
     * @param {object} res Response object
     * @returns {object} JSON API Response
     */

  }, {
    key: "viewUserLoans",
    value: function () {
      var _viewUserLoans = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var email, query, _yield$DB$query8, rows;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                email = req.user.email;
                query = "SELECT * FROM loans WHERE email='".concat(email, "'");
                _context5.next = 4;
                return _dbconnection["default"].query(query);

              case 4:
                _yield$DB$query8 = _context5.sent;
                rows = _yield$DB$query8.rows;
                res.status(200).json({
                  status: 200,
                  message: 'Success',
                  data: _toConsumableArray(rows)
                });

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function viewUserLoans(_x9, _x10) {
        return _viewUserLoans.apply(this, arguments);
      }

      return viewUserLoans;
    }()
  }]);

  return LoanController;
}();

exports["default"] = LoanController;