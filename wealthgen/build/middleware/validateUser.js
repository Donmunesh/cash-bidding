"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helperUtils = _interopRequireDefault(require("../utils/helperUtils"));

var _dbconnection = _interopRequireDefault(require("../database/dbconnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class ValidateUser
 * @description Intercepts and validates a given request for User endpoints
 * @exports ValidateUser
 */
var ValidateUser = /*#__PURE__*/function () {
  function ValidateUser() {
    _classCallCheck(this, ValidateUser);
  }

  _createClass(ValidateUser, null, [{
    key: "validateProfileDetails",
    value:
    /**
     * @method validateProfileDetails
     * @description Validates profile details of user upon registration
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns
     */
    function validateProfileDetails(req, res, next) {
      req.checkBody('firstname').notEmpty().withMessage('First name is required').trim().isLength({
        min: 3,
        max: 15
      }).withMessage('First name should be between 3 to 15 charcters').isAlpha().withMessage('First name should only contain alphabets');
      req.checkBody('lastname').notEmpty().withMessage('Last name is required').trim().isLength({
        min: 3,
        max: 15
      }).withMessage('Last name should be between 3 to 15 charcters').isAlpha().withMessage('Last name should only contain alphabets');
      req.checkBody('address').notEmpty().withMessage('Address field is required').trim().isLength({
        min: 10,
        max: 50
      }).withMessage('Address should be between 10 to 50 characters') // eslint-disable-next-line no-useless-escape
      .matches(/^[A-Za-z0-9\.\-\s\,]*$/).withMessage('Invalid address format entered');
      req.checkBody('email').notEmpty().withMessage('Email field is required').trim().isEmail().withMessage('Invalid email address entered').customSanitizer(function (email) {
        return email.toLowerCase();
      });
      req.checkBody('password').notEmpty().withMessage('Password is required').trim().isLength({
        min: 6,
        max: 15
      }).withMessage('Password must be between 6 to 15 characters');
      var errors = req.validationErrors();

      if (errors) {
        res.status(400).json({
          status: 400,
          error: errors[0].msg
        });
        return;
      }

      next();
    }
    /**
     * @method validateLoginDetails
     * @description Validates login details (email and password)
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns
     */

  }, {
    key: "validateLoginDetails",
    value: function () {
      var _validateLoginDetails = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var errors, query, _yield$DB$query, rows, rowCount, hashedPassword, verifyPassword, userReq;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                req.checkBody('email').notEmpty().withMessage('Email field is required').trim().isEmail().withMessage('Invalid email address entered').customSanitizer(function (email) {
                  return email.toLowerCase();
                });
                req.checkBody('password').notEmpty().withMessage('Password field is required');
                errors = req.validationErrors();

                if (!errors) {
                  _context.next = 6;
                  break;
                }

                res.status(400).json({
                  error: errors[0].msg
                });
                return _context.abrupt("return");

              case 6:
                query = "SELECT * from users WHERE email='".concat(req.body.email, "'");
                _context.next = 9;
                return _dbconnection["default"].query(query);

              case 9:
                _yield$DB$query = _context.sent;
                rows = _yield$DB$query.rows;
                rowCount = _yield$DB$query.rowCount;

                if (!(rowCount < 1)) {
                  _context.next = 15;
                  break;
                }

                res.status(401).json({
                  error: 'Email/Password is incorrect'
                });
                return _context.abrupt("return");

              case 15:
                hashedPassword = rows[0].password;
                verifyPassword = _helperUtils["default"].verifyPassword("".concat(req.body.password), hashedPassword);

                if (verifyPassword) {
                  _context.next = 20;
                  break;
                }

                res.status(401).json({
                  error: 'Email/Password is incorrect'
                });
                return _context.abrupt("return");

              case 20:
                userReq = rows[0];
                req.user = userReq;
                next();

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function validateLoginDetails(_x, _x2, _x3) {
        return _validateLoginDetails.apply(this, arguments);
      }

      return validateLoginDetails;
    }()
  }]);

  return ValidateUser;
}();

exports["default"] = ValidateUser;