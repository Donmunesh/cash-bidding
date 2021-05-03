"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require('dotenv').config();

var env = process.env.ENV || process.env.NODE_ENV;
var DBConfig = {
  test: {
    connectionString: process.env.TEST_URL
  },
  dev: {
    connectionString: process.env.DEV_URL
  },
  production: {
    connectionString: process.env.DATABASE_URL
  },
  staging: {
    connectionString: process.env.DATABASE_URL
  }
};
var credentials = DBConfig[env];

if (!credentials) {
  credentials = DBConfig.dev;
}

var config = credentials;
var _default = config;
exports["default"] = _default;