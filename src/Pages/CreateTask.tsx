import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTask: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [user, setUser] = useState<number | string>('');
  const [tag, setTag] = useState<number | string>('');
  const [project, setProject] = useState<number | string>('');
  const [users, setUsers] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/list').then((response) => setUsers(response.data));
    axios.get('http://localhost:5000/api/tags/list').then((response) => setTags(response.data));
    axios.get('http://localhost:5000/api/projects/list').then((response) => setProjects(response.data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      dueDate,
      user: { id: user },
      tag: { id: tag },
      project: { id: project },
    };

    axios
      .post('http://localhost:5000/api/tasks/create', taskData)
      .then((response) => {
        console.log('Tarefa criada com sucesso', response.data);
        alert('Tarefa criada com sucesso');
        navigate('/pages/tasks/list');
      })
      .catch((error) => {
        console.error('Erro ao criar tarefa:', error);
      });
  };

  return (
    <div className='container'>
        <div className="create-task-container">
        <div className="create-task-header">
            <h1>Criar Nova Tarefa</h1>
        </div>

        <form className="create-task-form" onSubmit={handleSubmit}>
            <label htmlFor="title">Título</label>
            <input
            id="title"
            type="text"
            placeholder="Digite o título da tarefa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />

            <label htmlFor="description">Descrição</label>
            <textarea
            id="description"
            placeholder="Digite a descrição da tarefa"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <label htmlFor="dueDate">Data de Conclusão</label>
            <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            />

            <label htmlFor="user">Usuário</label>
            <select
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            >
            <option value="">Selecione um usuário</option>
            {users.map((user) => (
                <option key={user.id} value={user.id}>
                {user.name}
                </option>
            ))}
            </select>

            <label htmlFor="tag">Tag</label>
            <select
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
            >
            <option value="">Selecione uma tag</option>
            {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                {tag.name}
                </option>
            ))}
            </select>

            <label htmlFor="project">Projeto</label>
            <select
            id="project"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            required
            >
            <option value="">Selecione um projeto</option>
            {projects.map((project) => (
                <option key={project.id} value={project.id}>
                {project.name}
                </option>
            ))}
            </select>

            <div className="form-actions">
            <button className="create-task-button" type="submit">
                Criar Tarefa
            </button>
            </div>
        </form>
        </div>
    </div>
  );
};

export default CreateTask;
