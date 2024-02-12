const express = require("express");
const cors = require("cors");
require('dotenv').config();

// Zugriff auf Umgebungsvariablen
const PORT  = process.env.PORT;
// Zugriff auf externe userData
const user2 = require('./userData');

// Initialisierung von expres
const app = express();
// Use for development
app.use(cors());

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.get("/profile", (req, res) => {
  res.json({ profile: { name: "Max" } });
});

// =============================  neue GET Route zu /user2 von udserData.js ================
app.get('/user2', (req, res) => {
  res.json(user2);
});

// =============================  neue Get Route zu /user ==================================

app.get("/user", (req, res) => {
  res.json({
    id: 1,
    firstName: "Max",
    lastName: "Power",
    address: "Firststreet. 56, Boston",
    hobbies: ["schwimmen", "lesen", "reiten"]
  });
});

// =============================  neue GET Route /todos ======================================
app.get("/todos", (req, res) => {
  const todos = [
    { id: 1, title: "Design festlegen", completed: true },
    { id: 2, title: "Funktion der Navbar definieren", completed: true },
    { id: 3, title: "Entwicklungsumgebung festlegen", completed: false },
    { id: 4, title: "Backend-Routen definieren", completed: false },
    { id: 5, title: "Frontend-Komponenten entwerfen", completed: false }
    ];
    res.json(todos);
});


// App hört im folgenden auf den Port, welcher über die Umgebungsvariable definiert ist
app.listen(PORT, () => {
  console.log(`Server läuft auf Port: ${PORT}`);
});
