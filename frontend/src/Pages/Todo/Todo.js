import React, { useState, useEffect } from 'react';
import Content from '../../Layout/Content/Content';
import styles from './Todo.module.css'; // Importiere CSS-Datei für Styles

const Todo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/v1/todos/all")
      .then(response => response.json())
      .then(data => setTodos(data.todos))
      .catch(error => console.error('Fehler beim Abrufen der Todos:', error));
  }, []);

  return (
    <Content>
      <div className={styles.todo}>
        <h2>Meine ToDos</h2>
        <ul className={styles.todoList}>
          {todos.map(todo => (
            <li key={todo.id} className={styles.todoItem}>
              <input type="checkbox" checked={todo.completed} onChange={() => {}} />
              <span>{todo.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </Content>
  );
}

export default Todo;
