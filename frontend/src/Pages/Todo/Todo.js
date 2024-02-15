import React, { useState, useEffect } from 'react';
import Content from '../../Layout/Content/Content';
import styles from './Todo.module.css'; // Importiere CSS-Datei für Styles

const Todo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5050/v1/todos/byuserid", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId: 1 })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setTodos(data); // Setze die abgerufenen Todos im State
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTodos();
  }, []); // Leere Abhängigkeitsliste bedeutet, dass diese Effektfunktion nur einmal ausgeführt wird

  return (
    <Content>
      <div className={styles.todo}>
        <h2>Meine ToDos</h2>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <input type="checkbox" checked={todo.completed} />
              <span className={styles.text}>{todo.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </Content>
  );
}

export default Todo;
