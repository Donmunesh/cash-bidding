"use strict";

require("@babel/polyfill");

var _debug = _interopRequireDefault(require("debug"));

var _dbconnection = _interopRequireDefault(require("../dbconnection"));

var _createTables = _interopRequireDefault(require("./createTables"));

var _dropTables = _interopRequireDefault(require("./dropTables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Debug = (0, _debug["default"])('DB_MIGRATE'); // eslint-disable-next-line consistent-return

var queryTable = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var queries, migrateTable;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            queries = "".concat(_dropTables["default"]).concat(_createTables["default"]);
            _context.next = 4;
            return _dbconnection["default"].query(queries);

          case 4:
            migrateTable = _context.sent;
            Debug(migrateTable);
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

  return function queryTable() {
    return _ref.apply(this, arguments);
  };
}();

queryTable();