import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Layout/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Todo from './Pages/Todo/Todo';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Todo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
