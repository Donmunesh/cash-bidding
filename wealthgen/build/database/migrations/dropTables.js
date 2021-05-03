"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var dropUsersTable = 'DROP TABLE IF EXISTS users CASCADE; ';
var dropLoansTable = 'DROP TABLE IF EXISTS loans CASCADE; ';
var dropRepaymentsTable = 'DROP TABLE IF EXISTS repayments CASCADE; ';
var dropQuery = "".concat(dropUsersTable).concat(dropLoansTable).concat(dropRepaymentsTable);
var _default = dropQuery;
exports["default"] = _default;