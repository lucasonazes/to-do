import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';
import ListTasks from './Pages/ListTasks';
import ListUser from './Pages/ListUsers';
import ListTag from './Pages/ListTags';
import ListProject from './Pages/ListProjects';
import CreateTask from './Pages/CreateTask';
import CreateUser from './Pages/CreateUser';
import CreateTag from './Pages/CreateTag';
import CreateProject from './Pages/CreateProject';
import EditTask from './Pages/EditTask';
import EditUser from './Pages/EditUser';
import EditTag from './Pages/EditTag';
import EditProject from './Pages/EditProject';


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
            <li><Link to="/pages/tags/list">Tags</Link></li>
            <li><Link to="/pages/projects/list">Projects</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/pages/tasks/list" element={<ListTasks/>} />
          <Route path="/pages/users/list" element={<ListUser/>} />
          <Route path="/pages/tags/list" element={<ListTag/>} />
          <Route path="/pages/projects/list" element={<ListProject/>} />


          <Route path="/pages/tasks/new" element={<CreateTask/>} />
          <Route path="/pages/users/new" element={<CreateUser/>} />
          <Route path="/pages/tags/new" element={<CreateTag/>} />
          <Route path="/pages/projects/new" element={<CreateProject/>}/>

          <Route path="/pages/tasks/edit/:id" element={<EditTask/>} />
          <Route path="/pages/users/edit/:id" element={<EditUser/>} />
          <Route path="/pages/tags/edit/:id" element={<EditTag />} />
          <Route path="/pages/projects/edit/:id" element={<EditProject />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
