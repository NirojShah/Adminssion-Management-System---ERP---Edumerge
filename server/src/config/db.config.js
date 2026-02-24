import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import { initializeTables } from "../utility/initialize.table.js";
import { ModelAssociation } from "../modules/association/association.js";

// 🔹 Function to create DB if not exists
const createDatabaseIfNotExists = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`,
  );
  console.log("Database checked/created");

  await connection.end();
};
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: process.env.DB_LOGGING === "true",
  },
);

export const connectDB = async () => {
  try {
    await createDatabaseIfNotExists();
    await sequelize.authenticate();
    await sequelize.sync({
      force: false,
    });
    console.log(" Database connected successfully!");
  } catch (error) {
    console.error(" Unable to connect to DB:", error);
  }
};

const Models = initializeTables(sequelize);
ModelAssociation(Models);

export const createTransaction = async () => {
  return await sequelize.transaction();
};