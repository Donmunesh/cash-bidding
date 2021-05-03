"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var createUsersTable = "\n  CREATE TABLE IF NOT EXISTS users(\n    id UUID PRIMARY KEY,\n    firstname VARCHAR(128) NOT NULL,\n    lastname VARCHAR(128) NOT NULL,\n    address VARCHAR(128) NOT NULL,\n    email VARCHAR(255) UNIQUE NOT NULL,\n    password TEXT NOT NULL,\n    status VARCHAR(50) DEFAULT 'unverified' NOT NULL,\n    isadmin BOOLEAN DEFAULT false NOT NULL\n  );";
var createLoansTable = "\n  DROP TYPE IF EXISTS loan_status;\n  CREATE TYPE loan_status as ENUM ('pending', 'approved', 'rejected');\n  CREATE TABLE IF NOT EXISTS loans(\n    id UUID PRIMARY KEY,\n    email VARCHAR(255) REFERENCES users(email) ON DELETE CASCADE,\n    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    status loan_status DEFAULT 'pending',\n    repaid BOOLEAN DEFAULT false,\n    tenor INTEGER NOT NULL,\n    amount FLOAT NOT NULL,\n    paymentInstallment FLOAT NOT NULL,\n    balance FLOAT NOT NULL,\n    interest FLOAT NOT NULL\n  );";
var createRepaymentsTable = "\n  CREATE TABLE IF NOT EXISTS repayments(\n    id UUID PRIMARY KEY,\n    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,\n    loanId UUID NOT NULL REFERENCES loans(id) on DELETE CASCADE,\n    amount FLOAT NOT NULL\n  );";
var createTables = "\n  ".concat(createUsersTable).concat(createLoansTable).concat(createRepaymentsTable, "\n");
var _default = createTables;
exports["default"] = _default;