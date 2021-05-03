"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _v = _interopRequireDefault(require("uuid/v4"));

var _helperUtils = _interopRequireDefault(require("../utils/helperUtils"));

var _dbconnection = _interopRequireDefault(require("../database/dbconnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class UserController
 * @description specifies which method handles a request for User endpoints
 * @exports UserController
 */
var UserController = /*#__PURE__*/function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "createUser",
    value:
    /**
     * @method createUser
     * @description Registers a user if details are valid
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {void}
     */
    function () {
      var _createUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, firstname, lastname, address, email, password, hashedPassword, query, values, _yield$DB$query, rows, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, firstname = _req$body.firstname, lastname = _req$body.lastname, address = _req$body.address, email = _req$body.email, password = _req$body.password;
                hashedPassword = _helperUtils["default"].hashPassword(password);
                query = "INSERT INTO\n      users(id, firstname, lastname, address, email, password)\n      VALUES($1, $2, $3, $4, $5, $6)\n      RETURNING id, firstname, lastname, address, email, status, isadmin";
                values = [(0, _v["default"])(), firstname, lastname, address, email, hashedPassword];
                _context.prev = 4;
                _context.next = 7;
                return _dbconnection["default"].query(query, values);

              case 7:
                _yield$DB$query = _context.sent;
                rows = _yield$DB$query.rows;
                token = _helperUtils["default"].generateToken({
                  rows: rows
                });
                res.status(201).json({
                  status: 201,
                  message: 'Registration successful',
                  data: _objectSpread({
                    token: token
                  }, rows[0])
                });
                return _context.abrupt("return");

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](4);

                if (!(_context.t0.routine === '_bt_check_unique')) {
                  _context.next = 19;
                  break;
                }

                res.status(409).json({
                  status: 409,
                  error: 'User with email already exist'
                });
                return _context.abrupt("return");

              case 19:
                res.status(500).json({
                  status: 500,
                  error: 'An internal error occurred at the server'
                });

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 14]]);
      }));

      function createUser(_x, _x2) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
    /**
     * @method login
     * @description Logs in a registered user
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {void}
     */

  }, {
    key: "login",
    value: function login(req, res) {
      var _req$user = req.user,
          id = _req$user.id,
          firstname = _req$user.firstname,
          lastname = _req$user.lastname,
          address = _req$user.address,
          email = _req$user.email,
          isadmin = _req$user.isadmin,
          status = _req$user.status;

      var token = _helperUtils["default"].generateToken({
        id: id,
        email: email,
        isadmin: isadmin,
        status: status
      });

      res.status(200).json({
        status: 200,
        message: 'Login successful!',
        data: {
          token: token,
          id: id,
          firstname: firstname,
          lastname: lastname,
          email: email,
          address: address,
          status: status,
          isadmin: isadmin
        }
      });
    }
    /**
     * @method getAllUsers
     * @description Lists all users in the database
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */

  }, {
    key: "getAllUsers",
    value: function () {
      var _getAllUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var query, _yield$DB$query2, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = 'SELECT id, firstname, lastname, address, email, status, isadmin FROM users';
                _context2.next = 3;
                return _dbconnection["default"].query(query);

              case 3:
                _yield$DB$query2 = _context2.sent;
                rows = _yield$DB$query2.rows;
                res.status(200).json({
                  status: 200,
                  message: 'Success',
                  data: rows
                });

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAllUsers(_x3, _x4) {
        return _getAllUsers.apply(this, arguments);
      }

      return getAllUsers;
    }()
    /**
     * @method getUser
     * @description Gets a specific user by ID
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */

  }, {
    key: "getUser",
    value: function () {
      var _getUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var email, query, findUser;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                email = req.params.email;
                query = "SELECT id, firstname, lastname, address, email, status, isadmin FROM users WHERE email='".concat(email, "'");
                _context3.next = 4;
                return _dbconnection["default"].query(query);

              case 4:
                findUser = _context3.sent;

                if (!(!findUser.rowCount > 0)) {
                  _context3.next = 8;
                  break;
                }

                res.status(404).json({
                  error: 'User does not exist'
                });
                return _context3.abrupt("return");

              case 8:
                res.status(200).json({
                  status: 200,
                  message: 'Success',
                  data: [findUser.rows[0]]
                });

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getUser(_x5, _x6) {
        return _getUser.apply(this, arguments);
      }

      return getUser;
    }()
    /**
     * @method verifyUser
     * @description Verifies a user
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns {object} JSON API Response
     */

  }, {
    key: "verifyUser",
    value: function () {
      var _verifyUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var email, query, update, findUser, _yield$DB$query3, rows;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                email = req.params.email;
                query = "SELECT * FROM users WHERE email='".concat(email, "'");
                update = "UPDATE users SET status='verified' WHERE email='".concat(email, "' RETURNING firstname, lastname, address, status, isadmin");
                _context4.next = 5;
                return _dbconnection["default"].query(query);

              case 5:
                findUser = _context4.sent;

                if (findUser.rows.length) {
                  _context4.next = 9;
                  break;
                }

                res.status(404).json({
                  status: 404,
                  error: 'User does not exist'
                });
                return _context4.abrupt("return");

              case 9:
                if (!(findUser.rows[0].status === 'verified')) {
                  _context4.next = 12;
                  break;
                }

                res.status(409).json({
                  status: 409,
                  error: 'User is already verified'
                });
                return _context4.abrupt("return");

              case 12:
                _context4.next = 14;
                return _dbconnection["default"].query(update);

              case 14:
                _yield$DB$query3 = _context4.sent;
                rows = _yield$DB$query3.rows;
                res.status(201).json({
                  status: 201,
                  message: 'User successfully verified',
                  data: _objectSpread({}, rows[0])
                });

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function verifyUser(_x7, _x8) {
        return _verifyUser.apply(this, arguments);
      }

      return verifyUser;
    }()
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;