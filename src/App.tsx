import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';
import ListTasks from './Pages/ListTasks';

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <nav className="header">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/pages/tasks/list">Listar tarefas</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/pages/tasks/list" element={<ListTasks/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
