// Todo.js

const { DataTypes } = require('sequelize');
const sequelize = require('./database');

// Todo-Modell definieren
const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'todos', // Name der Tabelle in der MySQL-Datenbank
  timestamps: false // Deaktiviert automatisches Hinzufügen von createdAt und updatedAt
});

module.exports = Todo;
