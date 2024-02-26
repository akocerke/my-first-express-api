const { DataTypes } = require('sequelize');
const sequelize = require('../setup/database');

// Todo-Modell definieren
const Todo = sequelize.define('Todo', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  doneByDate: {
    type: DataTypes.DATE // Datumsfeld hinzufügen
  }
}, {
  tableName: 'todos', // Name der Tabelle in der MySQL-Datenbank
  timestamps: false // Deaktiviert automatisches Hinzufügen von createdAt und updatedAt
});

module.exports = Todo;