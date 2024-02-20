const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const todos = require('../../../todos');
const api = require('../../api/config/api'); 
const TodoRouter = Router();

// GET /all, um alle Todos anzuzeigen
TodoRouter.get("/all", async (req, res) => {
  try {
    // Hier greifen wir auf die lokale Datenquelle todos.js zu
    res.status(StatusCodes.OK).json({ todos });
  } catch (error) {
    console.error("Fehler beim Abrufen aller Todos:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Fehler beim Abrufen aller Todos." });
  }
});

// GET-Anfrage, um ein einzelnes Todo anhand der ID zurückzugeben
TodoRouter.get("/byid/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = todos.find(todo => todo.id == todoId);

    if (!todo) {
      console.log(`ID: ${todoId} nicht gefunden`);
      return res.status(StatusCodes.NOT_FOUND).json({ message: `Todo mit der ID ${todoId} nicht gefunden.` });
    }

    console.log(`Todo mit der ID ${todoId} gefunden`);
    res.status(StatusCodes.OK).json({ message: `Todo mit der ID ${todoId} gefunden`, todo });
  } catch (error) {
    console.error("Fehler beim Abrufen des einzelnen Todos:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Fehler beim Abrufen des einzelnen Todos." });
  }
});

// GET-Anfrage, um alle Todos eines Benutzers anhand der Benutzer-ID zurückzugeben
TodoRouter.get("/byuserid/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userTodos = todos.filter(todo => todo.userId == userId);

    if (userTodos.length === 0) {
      console.log(`Keine Todos gefunden für Benutzer mit der ID ${userId}`);
      return res.status(StatusCodes.NOT_FOUND).json({ message: `Keine Todos gefunden für Benutzer mit der ID ${userId}` });
    }

    console.log(`Todos gefunden für Benutzer mit der ID ${userId}`);
    res.status(StatusCodes.OK).json({ message: `Todos gefunden für Benutzer mit der ID ${userId}`, todos: userTodos });
  } catch (error) {
    console.error("Fehler beim Abrufen der Todos für Benutzer:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Fehler beim Abrufen der Todos für Benutzer." });
  }
});

// POST-Anfrage, um ein neues Todo hinzuzufügen
TodoRouter.post("/create", async (req, res) => {
  try {
    const { title, completed } = req.body;

    // Neues Todo erstellen
    const newTodo = {
      id: todos.length + 1,
      title,
      completed
    };

    // Neues Todo zur Todo-Liste hinzufügen
    todos.push(newTodo);

    // Das neue Todo zur Antwort senden
    res.status(StatusCodes.OK).json({ message: "Todo erfolgreich hinzugefügt", newTodo });
  } catch (error) {
    console.error("Fehler beim Hinzufügen eines neuen Todos:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Fehler beim Hinzufügen eines neuen Todos." });
  }
});

// PUT-Anfrage, um ein vorhandenes Todo zu aktualisieren
TodoRouter.put("/update/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const { title, completed } = req.body;

    // Das Todo mit der angegebenen ID finden
    const todoIndex = todos.findIndex(todo => todo.id == todoId);

    if (todoIndex === -1) {
      console.log(`ID: ${todoId} nicht gefunden`);
      return res.status(StatusCodes.NOT_FOUND).json({ message: `Todo mit der ID ${todoId} nicht gefunden.` });
    }

    // Das Todo aktualisieren
    todos[todoIndex] = { ...todos[todoIndex], title, completed };

    // Erfolgreiche Antwort senden
    console.log(`ID: ${todoId} erfolgreich aktualisiert`);
    res.status(StatusCodes.OK).json({ message: `Todo mit der ID ${todoId} erfolgreich aktualisiert`, updatedTodo: todos[todoIndex] });
  } catch (error) {
    console.error("Fehler beim Aktualisieren des vorhandenen Todos:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Fehler beim Aktualisieren des vorhandenen Todos." });
  }
});

// PUT-Anfrage, um ein Todo als erledigt zu markieren
TodoRouter.put("/mark/:id", async (req, res) => {
  try {
    const todoId = req.params.id;

    // Finde das Todo in der lokalen Datenquelle und aktualisiere es
    const updatedTodo = todos.find(todo => todo.id === parseInt(todoId));
    if (!updatedTodo) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: `Todo mit der ID ${todoId} nicht gefunden.` });
    }

    updatedTodo.completed = true;

    // Sende eine Erfolgsantwort mit dem aktualisierten Todo zurück
    res.status(StatusCodes.OK).json({ message: `Todo mit der ID ${todoId} wurde als erledigt markiert`, updatedTodo });
  } catch (error) {
    console.error("Fehler beim Markieren des Todos als erledigt:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Fehler beim Markieren des Todos als erledigt." });
  }
});

// DELETE-Anfrage, um ein Todo zu löschen
TodoRouter.delete("/delete/:id", async (req, res) => {
  try {
    const todoId = req.params.id;

    // Das Todo mit der angegebenen ID aus der lokalen Datenquelle finden und löschen
    const deletedTodoIndex = todos.findIndex(todo => todo.id == todoId);

    if (deletedTodoIndex === -1) {
      console.log(`ID: ${todoId} nicht gefunden`);
      return res.status(StatusCodes.NOT_FOUND).json({ message: `Todo mit der ID ${todoId} nicht gefunden.` });
    }

    // Das Todo aus der Liste entfernen
    todos.splice(deletedTodoIndex, 1);

    console.log(`ID: ${todoId} erfolgreich gelöscht`);
    res.status(StatusCodes.OK).json({ message: `Todo mit der ID ${todoId} erfolgreich gelöscht` });
  } catch (error) {
    console.error("Fehler beim Löschen des Todos:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Fehler beim Löschen des Todos." });
  }
});

module.exports = { TodoRouter };
