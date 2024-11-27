import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';
import ListTasks from './Pages/ListTasks';
import CreateTask from './Pages/CreateTask';
import EditTask from './Pages/EditTask';

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
          <Route path="/pages/tasks/edit/:id" element={<EditTask/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
