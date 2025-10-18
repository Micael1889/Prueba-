require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/yummy.sqlite", // Nombre del archivo de la base de datos SQLite
  logging: false,
  dialectOptions: {
    // Habilita foreign keys
    mode:
      require("sqlite3").OPEN_READWRITE |
      require("sqlite3").OPEN_CREATE |
      require("sqlite3").OPEN_FULLMUTEX,
  },
});

module.exports = { conn: sequelize };
