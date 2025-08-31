"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.db = void 0;
// src/db.ts
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConfig = {
    host: process.env.DB_HOST, // localhost
    user: process.env.DB_USER, // appuser
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, // knowledgehub
    port: Number(process.env.DB_PORT) || 3306,
};
exports.db = promise_1.default.createPool(dbConfig);
const testConnection = async () => {
    try {
        await exports.db.query("SELECT 1");
        console.log("✅ MySQL Connected");
    }
    catch (err) {
        console.error("❌ DB Connection Failed:", err);
    }
};
exports.testConnection = testConnection;
(0, exports.testConnection)();
