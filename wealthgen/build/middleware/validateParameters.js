"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var validateParameter = /*#__PURE__*/function () {
  function validateParameter() {
    _classCallCheck(this, validateParameter);
  }

  _createClass(validateParameter, null, [{
    key: "validateUUID",
    value:
    /**
     * @method validateUUID
     * @description
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns
     */
    function validateUUID(req, res, next) {
      req.checkParams('id').isUUID().withMessage('Invalid ID type specified');
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
     * @method validateEmail
     * @description
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns
     */

  }, {
    key: "validateEmail",
    value: function validateEmail(req, res, next) {
      req.checkParams('email').notEmpty().withMessage('Email field is required').trim().isEmail().withMessage('Invalid email address specified').customSanitizer(function (email) {
        return email.toLowerCase();
      });
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
     * @method validateStatus
     * @description
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns
     */

  }, {
    key: "validateStatus",
    value: function validateStatus(req, res, next) {
      req.checkBody('status').notEmpty().withMessage('Specify status field').isAlpha().withMessage('Invalid status type specified').equals('verified').withMessage('Invalid status option specified');
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
     * @method validatePatchOptions
     * @description
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns
     */

  }, {
    key: "validatePatchOptions",
    value: function validatePatchOptions(req, res, next) {
      req.checkBody('status').trim().isAlpha().notEmpty().withMessage('You failed to specify loan status in the request body').matches(/^(approved|rejected)$/).withMessage("Accepted values are 'approved' or 'rejected'");
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
  }]);

  return validateParameter;
}();

exports["default"] = validateParameter;