import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';
import ListTasks from './Pages/ListTasks';
import ListUser from './Pages/ListUsers';
import CreateTask from './Pages/CreateTask';
import CreateUser from './Pages/CreateUser';
import EditTask from './Pages/EditTask';
import EditUser from './Pages/EditUser';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Toaster />
        <nav className="header">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/pages/tasks/list">Tarefas</Link></li>
            <li><Link to="/pages/Users/list">Users</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/pages/tasks/list" element={<ListTasks/>} />
          <Route path="/pages/users/list" element={<ListUser/>} />
          <Route path="/pages/tasks/new" element={<CreateTask/>} />
          <Route path="/pages/users/new" element={<CreateUser/>} />
          <Route path="/pages/tasks/edit/:id" element={<EditTask/>} />
          <Route path="/pages/users/edit/:id" element={<EditUser/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
