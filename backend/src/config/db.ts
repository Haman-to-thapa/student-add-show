import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "appuser",
  password: process.env.DB_PASSWORD || "appsecret",
  database: process.env.DB_NAME || "knowledgehub",
  port: Number(process.env.DB_PORT) || 3306,
};

export const db = mysql.createPool(dbConfig);

export const testConnection = async () => {
  for (let i = 0; i < 5; i++) {
    try {
      await db.query("SELECT 1");
      console.log("✅ MySQL Connected");
      break;
    } catch (err) {
      console.log("Waiting for DB...", i + 1);
      await new Promise((res) => setTimeout(res, 3000));
    }
  }
};

testConnection();
