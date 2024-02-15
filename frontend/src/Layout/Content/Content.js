// Content.js
import React from 'react';
import styles from './Content.module.css'; // Importiere CSS-Datei für Styles

const Content = ({ children }) => {
  return (
    <div className={styles.content}>
      {children}
    </div>
  );
}

export default Content;