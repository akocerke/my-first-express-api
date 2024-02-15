// Navbar.js
import React from 'react';
import styles from './Navbar.module.css'; // Importiere CSS-Datei für Styles

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        ToDoAPP
      </div>
      <ul className={styles.navLinks}>
        <li><a href="/">Login</a></li>
        <li><a href="/">Signup</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
