import React from 'react';
import styles from './Navbar.module.css'; // Importiere CSS-Datei für Styles
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
      <ul className={styles.navLinks}>
          <li><Link className={styles.logo} to="/">ToDoAPP</Link></li>
        </ul>
      </div>
      <div>
        <ul className={styles.navLinks}>
          <li><Link to="/todos">Todos</Link></li>
        </ul>
      </div>
      <ul className={styles.navLinks}>
        <li><Link to="/">Login</Link></li>
        <li><Link to="/">Signup</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
