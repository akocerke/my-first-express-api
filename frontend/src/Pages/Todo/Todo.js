// Todo.js
import React from 'react';
import Content from '../../Layout/Content/Content';
import styles from './Todo.module.css'; // Importiere CSS-Datei für Styles

const Todo = ({ todo }) => {
  return (
    <Content>
      <div className={styles.todo}>
      <h2>Meine ToDos</h2>
      
    </div>
    </Content>
    
  );
}

export default Todo;

