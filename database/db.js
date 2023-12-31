const { Sequelize } = require("sequelize");
const dotenv = require("dotenv").config();
const pg = require("pg");

const db = new Sequelize("postgres://postgres@localhost:5432/financemate_db", {
  logging: false,
  dialectModule: pg,
});

db.authenticate()
  .then(() => {
    console.log("DB connection works");
  })
  .catch((error) => {
    console.error("DB connection failed:", error);
  });

module.exports = db;
