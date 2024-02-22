const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const Todo  = require('../../../Todo');
const TodoRouter = Router(); 

// GET /all, um alle Todos anzuzeigen
TodoRouter.get("/all", async (req, res) => {
  try {
    // Alle Todos aus der Datenbank abrufen
    const todos = await Todo.findAll();

    // Überprüfen, ob Todos vorhanden sind
    if (todos.length === 0) {
      console.log("Keine Todos gefunden.");
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Keine Todos gefunden." });
    }

    // Wenn Todos vorhanden sind, senden Sie sie als Antwort
    console.log("Alle Todos gefunden.");
    res.status(StatusCodes.OK).json({ message: "Alle Todos gefunden.", todos: todos });
  } catch (error) {
    // Fehler beim Abrufen der Todos behandeln
    console.error("Fehler beim Abrufen aller Todos:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Fehler beim Abrufen aller Todos." });
  }
});


// GET-Anfrage, um ein einzelnes Todo anhand der ID zurückzugeben
TodoRouter.get("/byid/:id", (req, res) => {
  const todoId = req.params.id;

  const todo = todos.find(todo => todo.id == todoId);

  if (!todo) {
      console.log(`ID: ${todoId} nicht gefunden`);
      return res.status(StatusCodes.NOT_FOUND).json({ message: `Todo mit der ID ${todoId} nicht gefunden.` });
  }

  console.log(`Todo mit der ID ${todoId} gefunden`);
  res.status(StatusCodes.OK).json({ message: `Todo mit der ID ${todoId} gefunden`, todo });
});


// GET-Anfrage, um alle Todos eines Benutzers anhand der Benutzer-ID zurückzugeben
TodoRouter.get("/byuserid/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Todos aus der Datenbank abrufen, die zur Benutzer-ID gehören
    const userTodos = await Todo.findAll({ where: { userId: userId } });

    if (userTodos.length === 0) {
      console.log(`Keine Todos gefunden für Benutzer mit der ID ${userId}`);
      return res.status(StatusCodes.NOT_FOUND).json({ message: `Keine Todos gefunden für Benutzer mit der ID ${userId}` });
    }

    console.log(`Todos gefunden für Benutzer mit der ID ${userId}`);
    res.status(StatusCodes.OK).json({ message: `Todos gefunden für Benutzer mit der ID ${userId}`, todos: userTodos });
  } catch (error) {
    console.error(`Fehler beim Abrufen der Todos für Benutzer mit der ID ${userId}:`, error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: `Fehler beim Abrufen der Todos für Benutzer mit der ID ${userId}.` });
  }
});

// Annahme: Zu Beginn ist todos ein leeres Array
let todos = [];

// POST-Anfrage, um ein neues Todo hinzuzufügen
TodoRouter.post("/create", async (req, res) => {
  try {
    const { userId, title, completed, doneByDate } = req.body;

    // Neues Todo in der Datenbank erstellen
    const newTodo = await Todo.create({
      userId,
      title,
      completed,
      doneByDate
    });

    // Das neue Todo zur Antwort senden
    res.status(StatusCodes.OK).json({ message: "Todo erfolgreich hinzugefügt", newTodo });
    // Logge das neue Todo in der Konsole
    console.log("Neues Todo wurde hinzugefügt:", newTodo.toJSON());
    
  } catch (error) {
    console.error("Fehler beim Hinzufügen eines neuen Todos:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Fehler beim Hinzufügen eines neuen Todos." });
  }
});

  
  // PUT-Anfrage, um ein vorhandenes Todo zu aktualisieren
  TodoRouter.put("/update/:id", (req, res) => {
    const todoId = req.params.id;
    const { title, completed } = req.body;
  
    const todoIndex = todos.findIndex(todo => todo.id == todoId);
  
    if (todoIndex === -1) {
      console.log(`ID: ${todoId} nicht gefunden`);
      return res.status(StatusCodes.NOT_FOUND).json({ message: `Todo mit der ID ${todoId} nicht gefunden.` });
    }
  
    todos[todoIndex] = { ...todos[todoIndex], title, completed };
  
    console.log(`ID: ${todoId} erfolgreich aktualisiert`);
    res.status(StatusCodes.OK).json({ message: `Todo mit der ID ${todoId} erfolgreich aktualisiert`, updatedTodo: todos[todoIndex] });
  });
  
  // PUT-Anfrage, um ein Todo als erledigt zu markieren
  TodoRouter.put("/mark/:id", async(req, res) => {
    const todoId = req.params.id;
    const todoCompleted = req.body.completed;

    const todo = await Todo.update({completed :  todoCompleted} , { where: { id : todoId }});
    
    if (!todoId) {
      console.log(`ID: ${todoId} nicht gefunden`);
      return res.status(StatusCodes.NOT_FOUND).json({ message: `Todo mit der ID ${todoId} nicht gefunden.` });
    }
  
    
  
    console.log(`ID: ${todoId} als erledigt markiert`);
    res.status(StatusCodes.OK).json({ message: `Todo mit der ID ${todoId} wurde als erledigt markiert`, updatedTodo: todo });
  });
  
  // DELETE-Anfrage, um ein Todo zu löschen
TodoRouter.delete("/delete/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    // Versuche, das Todo mit der angegebenen ID zu finden und zu löschen
    const deletedTodo = await Todo.destroy({ where: { id: todoId } });

    if (!deletedTodo) {
      // Wenn kein Todo mit der angegebenen ID gefunden wurde, sende einen 404-Statuscode zurück
      console.log(`ID: ${todoId} nicht gefunden`);
      return res.status(StatusCodes.NOT_FOUND).json({ message: `Todo mit der ID ${todoId} nicht gefunden.` });
    }

    // Das Todo wurde erfolgreich gelöscht
    console.log(`ID: ${todoId} erfolgreich gelöscht`);
    res.status(StatusCodes.OK).json({ message: `Todo mit der ID ${todoId} erfolgreich gelöscht` });
  } catch (error) {
    // Fehler beim Löschen des Todos behandeln
    console.error(`Fehler beim Löschen des Todos mit der ID ${todoId}:`, error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: `Fehler beim Löschen des Todos mit der ID ${todoId}.` });
  }
});
  
  module.exports = { TodoRouter };