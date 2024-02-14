const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const todos = require('../../../todos');
const TodoRouter = Router(); // Hier wird TodoRouter definiert


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
TodoRouter.get("/byuserid/:userId", (req, res) => {
  const userId = req.params.userId;

  const userTodos = todos.filter(todo => todo.userId == userId);

  if (userTodos.length === 0) {
      console.log(`Keine Todos gefunden für Benutzer mit der ID ${userId}`);
      return res.status(StatusCodes.NOT_FOUND).json({ message: `Keine Todos gefunden für Benutzer mit der ID ${userId}` });
  }

  console.log(`Todos gefunden für Benutzer mit der ID ${userId}`);
  res.status(StatusCodes.OK).json({ message: `Todos gefunden für Benutzer mit der ID ${userId}`, todos: userTodos });
});
// POST-Anfrage, um ein neues Todo hinzuzufügen
TodoRouter.post("/create", (req, res) => {
    const { title, completed } = req.body;
    const id = todos.length + 1;
    const newTodo = { id, title, completed };
  
    todos.push(newTodo);
  
    res.status(StatusCodes.OK).json({ message: "Todo erfolgreich hinzugefügt", newTodo });
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
  TodoRouter.put("/mark/:id", (req, res) => {
    const todoId = req.params.id;
  
    const todo = todos.find(todo => todo.id == todoId);
  
    if (!todo) {
      console.log(`ID: ${todoId} nicht gefunden`);
      return res.status(StatusCodes.NOT_FOUND).json({ message: `Todo mit der ID ${todoId} nicht gefunden.` });
    }
  
    todo.completed = true;
  
    console.log(`ID: ${todoId} als erledigt markiert`);
    res.status(StatusCodes.OK).json({ message: `Todo mit der ID ${todoId} wurde als erledigt markiert`, updatedTodo: todo });
  });
  
  // DELETE-Anfrage, um ein Todo zu löschen
  TodoRouter.delete("/delete/:id", (req, res) => {
    const todoId = req.params.id;
  
    const todoIndex = todos.findIndex(todo => todo.id == todoId);
  
    if (todoIndex === -1) {
      console.log(`ID: ${todoId} nicht gefunden`);
      return res.status(StatusCodes.NOT_FOUND).json({ message: `Todo mit der ID ${todoId} nicht gefunden.` });
    }
  
    todos.splice(todoIndex, 1);
  
    console.log(`ID: ${todoId} erfolgreich gelöscht`);
    res.status(StatusCodes.OK).json({ message: `Todo mit der ID ${todoId} erfolgreich gelöscht` });
  });
  
  module.exports = { TodoRouter };