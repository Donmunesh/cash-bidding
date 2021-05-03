"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var secretKey = process.env.SECRET_KEY;
var salt = +process.env.SALT;
/**
 * @class HelperUtils
 * @description
 * @exports HelperUtils
 */

var HelperUtils = /*#__PURE__*/function () {
  function HelperUtils() {
    _classCallCheck(this, HelperUtils);
  }

  _createClass(HelperUtils, null, [{
    key: "generateToken",
    value:
    /**
     * @method generateToken
     * @description
     * @returns token
     */
    function generateToken(payload) {
      var token = _jsonwebtoken["default"].sign(payload, secretKey);

      return token;
    }
    /**
     * @method verifyToken
     * @description
     * @returns payload
     */

  }, {
    key: "verifyToken",
    value: function verifyToken(token) {
      try {
        var payload = _jsonwebtoken["default"].verify(token, secretKey);

        return payload;
      } catch (error) {
        return false;
      }
    }
    /**
     * @method hashPassword
     * @description
     * @returns
     */

  }, {
    key: "hashPassword",
    value: function hashPassword(password) {
      return _bcryptjs["default"].hashSync(password, salt);
    }
    /**
     * @method verifyPassword
     * @description
     * @returns
     */

  }, {
    key: "verifyPassword",
    value: function verifyPassword(password, hash) {
      return _bcryptjs["default"].compareSync(password, hash);
    }
  }]);

  return HelperUtils;
}();

var _default = HelperUtils;
exports["default"] = _default;