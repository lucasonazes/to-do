import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditTask: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [user, setUser] = useState<number | string>('');
  const [tag, setTag] = useState<number | string>('');
  const [project, setProject] = useState<number | string>('');
  const [users, setUsers] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tasks/${id}`)
      .then((response) => {
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
        setStatus(task.status || '');
        setUser(task.user?.id || '');
        setTag(task.tag?.id || '');
        setProject(task.project?.id || '');
      })
      .catch((error) => {
        console.error('Erro ao buscar tarefa:', error);
      });

    axios.get('http://localhost:5000/api/users/list').then((response) => setUsers(response.data));
    axios.get('http://localhost:5000/api/tags/list').then((response) => setTags(response.data));
    axios.get('http://localhost:5000/api/projects/list').then((response) => setProjects(response.data));
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      dueDate,
      status,
      user: { id: user },
      tag: { id: tag },
      project: { id: project },
    };

    axios
      .put(`http://localhost:5000/api/tasks/update/${id}`, taskData)
      .then(() => {
        toast.success('Tarefa atualizada com sucesso');
        navigate('/pages/tasks/list');
      })
      .catch((error) => {
        console.error('Erro ao atualizar tarefa:', error);
      });
  };

  const handleCancel = () => {
    navigate('/pages/tasks/list'); // Redireciona para a lista de tarefas
  };

  return (
    <div className='container'>
      <div className="create-task-container">
        <div className="create-task-header">
          <h1>Editar Tarefa</h1>
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

          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)} // Atualiza o status
            required
          >
            <option value="">Selecione o status</option>
            <option value="Pendente">Pendente</option>
            <option value="Em progresso">Em progresso</option>
            <option value="Concluída">Concluída</option>
          </select>

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
          <button
              type="button"
              className="cancel-task-button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button className="create-task-button" type="submit">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
