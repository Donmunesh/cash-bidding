"use strict";

require("@babel/polyfill");

var _v = _interopRequireDefault(require("uuid/v4"));

var _debug = _interopRequireDefault(require("debug"));

var _helperUtils = _interopRequireDefault(require("../../utils/helperUtils"));

var _dbconnection = _interopRequireDefault(require("../dbconnection"));

var _createTables = _interopRequireDefault(require("../migrations/createTables"));

var _dropTables = _interopRequireDefault(require("../migrations/dropTables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Debug = (0, _debug["default"])('DB_SEEDING');

var adminPassword = _helperUtils["default"].hashPassword('admin');

var userPassword = _helperUtils["default"].hashPassword('user');

var createUsers = "\n  INSERT INTO users(id,firstname,lastname,address,email,password,isadmin,status)\n  VALUES('".concat((0, _v["default"])(), "','admin','admin','12 Admin Location Sabo-Yaba, Lagos','admin@admin.com','").concat(adminPassword, "','true','verified'),('").concat((0, _v["default"])(), "','Obito', 'Uchiha','Cave-45 Akatsuki Cavern, Amegakure','uchiha.obito@akatsuki.org','").concat(userPassword, "','false','unverified');");
var createRecord = "\n  INSERT INTO loans(id, email,status,repaid,tenor,amount,paymentInstallment,balance, interest)\n  VALUES('".concat((0, _v["default"])(), "','uchiha.obito@akatsuki.org','pending','false',3,20000,7000,21000,1000),('").concat((0, _v["default"])(), "','uchiha.obito@akatsuki.org','approved','true',3,20000,7000,21000,1000),('").concat((0, _v["default"])(), "','uchiha.obito@akatsuki.org','rejected','false',3,20000,7000,21000,1000),('").concat((0, _v["default"])(), "','uchiha.obito@akatsuki.org','approved','false',3,30000,10500,31500,1500);;"); // eslint-disable-next-line consistent-return

var seedTable = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var queries, populateTable;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            queries = "".concat(_dropTables["default"]).concat(_createTables["default"]).concat(createUsers).concat(createRecord);
            _context.next = 4;
            return _dbconnection["default"].query(queries);

          case 4:
            populateTable = _context.sent;
            Debug(populateTable);
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            Debug(_context.t0.stack);
            return _context.abrupt("return", _context.t0.stack);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function seedTable() {
    return _ref.apply(this, arguments);
  };
}();

seedTable();