import dotenv from "dotenv";
dotenv.config();

const config = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    },
    migrations: {
      directory: "./src/database/migrations",
      extension: "ts"
    }
  }
};

module.exports = config;
