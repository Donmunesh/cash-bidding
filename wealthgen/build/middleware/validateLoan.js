"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class ValidateLoan
 * @description Intercepts and validates a given request for Loan endpoints
 * @exports ValidateLoan
 */
var ValidateLoan = /*#__PURE__*/function () {
  function ValidateLoan() {
    _classCallCheck(this, ValidateLoan);
  }

  _createClass(ValidateLoan, null, [{
    key: "validateLoanApply",
    value:
    /**
     * @method validateLoanApply
     * @description
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns
     */
    function validateLoanApply(req, res, next) {
      req.checkBody('amount').notEmpty().withMessage('Enter amount').trim().isNumeric().withMessage('Amount should be an integer').isLength({
        min: 5,
        max: 7
      }).withMessage('Amount should not be less than 10,000');
      req.checkBody('tenor').notEmpty().withMessage('Tenor is required').trim().isNumeric().withMessage('Tenor should be an integer').isInt({
        min: 1,
        max: 12
      }).withMessage('Loan tenor must be between 1 and 12 months');
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
     * @method validateQueryOptions
     * @description
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @returns
     */

  }, {
    key: "validateQueryOptions",
    value: function validateQueryOptions(req, res, next) {
      req.checkQuery('status').optional().isAlpha().withMessage('Invalid status entered!').matches(/^(approved|rejected|pending)$/).withMessage('Invalid status option specified!');
      req.checkQuery('repaid').optional().isAlpha().withMessage('Invalid repaid entered!').matches(/^(true|t|false|f)$/).withMessage('Invalid repaid option specified');
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

  return ValidateLoan;
}();

exports["default"] = ValidateLoan;