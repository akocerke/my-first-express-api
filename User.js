// User.js
const { DataTypes } = require('sequelize');
const sequelize = require('./database');

// User-Modell definieren
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true // Stellt sicher, dass die id automatisch inkrementiert wird
  },
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
  tableName: 'users', // Name der Tabelle in der MySQL-Datenbank
  timestamps: false // Deaktivieren Sie die automatische Erstellung von createdAt- und updatedAt-Spalten
});

module.exports = User;
