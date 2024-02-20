// User.js

const { DataTypes } = require('sequelize');
const sequelize = require('./database');

// User-Modell definieren
const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Stellen Sie sicher, dass die E-Mail-Adresse eindeutig ist
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users' // Name der Tabelle in der MySQL-Datenbank
});

module.exports = User;
