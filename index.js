const express = require("express");
const cors = require("cors");
require('dotenv').config();
const bodyParser = require("body-parser");

// Zugriff auf Umgebungsvariablen
const {PORT}  = process.env;

// Zugriff auf externe userData
const userData = require('./userData');
const todos = require('./todos');

// Initialisierung von expres
const app = express();
// Middleware verwenden
app.use(bodyParser.json()); // Verwende bodyParser, um JSON-Daten im Anfrage-Body zu verarbeiten
app.use(cors());


app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.get("/profile", (req, res) => {
  res.json({ profile: { name: "Max" } });
});

// =============================  neue GET Route zu /user2 von udserData.js ================
app.get('/users', (req, res) => {
  res.json(userData);
});

// =============================  neue Get Route zu /user ==================================
// app.get("/user", (req, res) => {
//   const user = {
//     "id": 1,
//     "firstName": "Max",
//     "lastName": "Power",
//     "address": "Firststreet. 56, Boston",
//     "hobbies": ["schwimmen", "lesen", "reiten"]
//   };
//   res.json(user);
// });

// =============================  neue Get Route zu /user Abfrage über userData userid in Postman App =========
app.get("/user", (req, res) => {
 const {userid} = req.query
 console.log(userid)
 const user = userData.find((item)=> item.id == userid)
 console.log(user)
 res.json(user);
});

// ============================ neue POST Anfrage zu /users EINEN USER hinzufügen ======================
app.post("/user", (req, res) => {
  const { firstName, lastName, birthday } = req.body; // Daten für den neuen Benutzer aus dem Anfrage-Body extrahieren
  const id = userData.length + 1; // Neue ID für den Benutzer festlegen basierend auf der Länge des userData-Arrays
  const newUser = { id, firstName, lastName, birthday }; // Neues Benutzerobjekt erstellen

  // Neuen Benutzer zum userData-Array hinzufügen
  userData.push(newUser);

  // Bestätigungsnachricht senden
  res.json({ message: "Benutzer erfolgreich hinzugefügt", newUser });
  console.log(newUser, "Benutzer erfolgreich hinzugefügt");
});
// ============================ neue PUT Anfrage zu user/adduser Einen user update
app.put("/user/update/:id", (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, birthday } = req.body;

  // Finde den Benutzer mit der angegebenen ID
  const userIndex = userData.findIndex(user => user.id == userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: `Benutzer mit der ID ${userId} nicht gefunden.` });
  }

  // Aktualisiere die Benutzerdaten
  userData[userIndex] = { ...userData[userIndex], firstName, lastName, birthday };

  console.log(`Benutzer mit der ID ${userId} erfolgreich aktualisiert`, userData[userIndex]);
  // Bestätigungsnachricht senden
  res.json({ message: `Benutzer mit der ID ${userId} erfolgreich aktualisiert`, updatedUser: userData[userIndex] });

  
});

// ============================ DELETE Anfrage um EINEN user zu löschen ==================================================

// DELETE-Anfrage um EINEN user zu löschen
app.delete("/user/delete/:id", (req, res) => {
  const userId = req.params.id;

  // Finde den Index des Benutzers mit der angegebenen ID
  const userIndex = userData.findIndex(user => user.id == userId);

  if (userIndex === -1) {
    console.log(`Benutzer mit der ID ${userId} nicht gefunden.`);
    return res.status(404).json({ message: `Benutzer mit der ID ${userId} nicht gefunden.` });
  }

  // Entferne den Benutzer aus dem userData-Array und speichere ihn
  const deletedUser = userData.splice(userIndex, 1)[0];

  // Ausgabe des gelöschten Benutzers in der Konsole
  console.log(`Benutzer mit der ID ${userId} wurde erfolgreich gelöscht:`, deletedUser);

  // Bestätigungsnachricht senden
  res.json({ message: `Benutzer mit der ID ${userId} erfolgreich gelöscht` });
});















// =============================  neue GET Route /todos ======================================
// app.get("/todos", (req, res) => {
//   const todos = [
//     { id: 1, title: "Design festlegen", completed: true },
//     { id: 2, title: "Funktion der Navbar definieren", completed: true },
//     { id: 3, title: "Entwicklungsumgebung festlegen", completed: false },
//     { id: 4, title: "Backend-Routen definieren", completed: false },
//     { id: 5, title: "Frontend-Komponenten entwerfen", completed: false }
//     ];
//     res.json(todos);
// });


// ============================= neue GET Anfrage ALLE todos ausgeben
app.get('/todos', (req, res) => {
  res.json(todos);
});


// =============================  neue Get Route zu /todo EINE todo Abfrage über id in Postman App =========
app.get("/todo", (req, res) => {
  const { id } = req.query;
  console.log(id);
  
  // Finde die Aufgaben mit der angegebenen ID
  const filteredTodos = todos.filter(todo => todo.id == id);
  
  console.log(filteredTodos, "hat was gefunden ✅");
  
  if (filteredTodos.length === 0) {
      console.log(`🤫 Kein Todo mit der ID: ${id} gefunden.`);
  }
  
  res.json(filteredTodos);
});

// ============================================= POST-Anfrage, um ein neues Todo hinzuzufügen
app.post("/todo/add", (req, res) => {
  const { title, completed } = req.body;
  const id = todos.length + 1;
  const newTodo = { id, title, completed };

  todos.push(newTodo);

  res.json({ message: "Todo erfolgreich hinzugefügt", newTodo });
});

// ============================================ PUT-Anfrage, um ein vorhandenes Todo zu aktualisieren
app.put("/todo/update/:id", (req, res) => {
  const todoId = req.params.id;
  const { title, completed } = req.body;

  const todoIndex = todos.findIndex(todo => todo.id == todoId);

  if (todoIndex === -1) {
    console.log(`ID: ${todoId} nicht gefunden`);
    return res.status(404).json({ message: `Todo mit der ID ${todoId} nicht gefunden.` });
  }

  todos[todoIndex] = { ...todos[todoIndex], title, completed };

  console.log(`ID: ${todoId} erfolgreich aktualisiert`);
  res.json({ message: `Todo mit der ID ${todoId} erfolgreich aktualisiert`, updatedTodo: todos[todoIndex] });
});

// =========================================== DELETE-Anfrage, um ein Todo zu löschen
app.delete("/todo/delete/:id", (req, res) => {
  const todoId = req.params.id;

  const todoIndex = todos.findIndex(todo => todo.id == todoId);

  if (todoIndex === -1) {
    console.log(`ID: ${todoId} nicht gefunden`);
    return res.status(404).json({ message: `Todo mit der ID ${todoId} nicht gefunden.` });
  }

  todos.splice(todoIndex, 1);

  console.log(`ID: ${todoId} erfolgreich gelöscht`);
  res.json({ message: `Todo mit der ID ${todoId} erfolgreich gelöscht` });
});

// App hört im folgenden auf den Port, welcher über die Umgebungsvariable definiert ist
app.listen(PORT, () => {
  console.log(`Server läuft auf Port: ${PORT}`);
});
