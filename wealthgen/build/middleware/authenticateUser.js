"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helperUtils = _interopRequireDefault(require("../utils/helperUtils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class AuthenticateUser
 * @description Authenticates a given user
 * @exports AuthenticateUser
 */
var AuthenticateUser = /*#__PURE__*/function () {
  function AuthenticateUser() {
    _classCallCheck(this, AuthenticateUser);
  }

  _createClass(AuthenticateUser, null, [{
    key: "verifyAuthHeader",
    value:
    /**
     * @method verifyAuthHeader
     * @description
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns
     */
    function verifyAuthHeader(req) {
      if (!req.headers.authorization) {
        return {
          error: 'auth'
        };
      }

      var token = req.headers.authorization.split(' ')[1];

      var payload = _helperUtils["default"].verifyToken(token);

      if (!payload) {
        return {
          error: 'token'
        };
      }

      return payload;
    }
    /**
     * @method verifyUser
     * @description Verifies the token provided by the user
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns
     */

  }, {
    key: "verifyUser",
    value: function verifyUser(req, res, next) {
      var payload = AuthenticateUser.verifyAuthHeader(req);
      var error;
      var status;

      if (payload && payload.error === 'auth') {
        status = 401;
        error = 'No authorization header was specified';
      } else if (payload && payload.error === 'token') {
        status = 401;
        error = 'The provided token cannot be authenticated.';
      }

      if (error) {
        res.status(status).json({
          status: status,
          error: error
        });
        return;
      }

      req.user = payload;
      next();
    }
    /**
     * @method verifyAdmin
     * @description Verifies the token provided by the Admin
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns
     */

  }, {
    key: "verifyAdmin",
    value: function verifyAdmin(req, res, next) {
      var payload = AuthenticateUser.verifyAuthHeader(req);
      var error;
      var status;

      if (payload && payload.error === 'auth') {
        status = 401;
        error = 'No authorization header was specified';
        res.status(status).json({
          status: status,
          error: error
        });
        return;
      }

      if (payload && payload.error === 'token') {
        status = 401;
        error = 'Token provided cannot be authenticated.';
        res.status(status).json({
          status: status,
          error: error
        });
        return;
      }

      if (payload.isadmin !== true) {
        res.status(403).json({
          status: 403,
          error: 'Only admin can access this route'
        });
        return;
      }

      next();
    }
  }]);

  return AuthenticateUser;
}();

var _default = AuthenticateUser;
exports["default"] = _default;