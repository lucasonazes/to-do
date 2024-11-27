import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';
import ListTasks from './Pages/ListTasks';
import CreateTask from './Pages/CreateTask';

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <nav className="header">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/pages/tasks/list">Tarefas</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/pages/tasks/list" element={<ListTasks/>} />
          <Route path="/pages/tasks/new" element={<CreateTask/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
