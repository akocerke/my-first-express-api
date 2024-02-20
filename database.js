// database.js

const { Sequelize } = require('sequelize');

// Verbindung zur MySQL-Datenbank herstellen
const sequelize = new Sequelize('todos_db', 'akocerke', 'akocerke', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
