// Home.js
import React from 'react';
import styles from './Home.module.css'; 
import Content from '../../Layout/Content/Content'

const Home = () => {
  return (
    <Content >
      <div className={styles.home}>
      <h1>Welcome to My Todo App</h1>
      <p>This is the home page of the Todo App. You can manage your todos here.</p>
    </div>
    </Content>
    
  );
}

export default Home;
