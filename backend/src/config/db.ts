// src/db.ts
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,       // localhost
  user: process.env.DB_USER,       // appuser
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,   // knowledgehub
  port: Number(process.env.DB_PORT) || 3306,
};

export const db = mysql.createPool(dbConfig);

export const testConnection = async () => {
  try {
    await db.query("SELECT 1");
    console.log("✅ MySQL Connected");
  } catch (err) {
    console.error("❌ DB Connection Failed:", err);
  }
};

testConnection();



