import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Task from '../Models/Task';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ListTasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [users, setUsers] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [tags, setTags] = useState<any[]>([]);
    const [statusOptions] = useState<string[]>(['Pendente','Em progresso', 'Concluída' ]);
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [selectedProject, setSelectedProject] = useState<string>('');
    const [selectedTag, setSelectedTag] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');

    useEffect(() => {
        fetchTasks();
        fetchFilterOptions();
    }, []);

    const fetchTasks = () => {
        axios
            .get('http://localhost:5000/api/tasks/list')
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar tarefas:', error.message);
            });
    };

    const fetchFilterOptions = () => {
        axios.get('http://localhost:5000/api/users/list').then((response) => setUsers(response.data));
        axios.get('http://localhost:5000/api/projects/list').then((response) => setProjects(response.data));
        axios.get('http://localhost:5000/api/tags/list').then((response) => setTags(response.data));
    };

    const deleteTask = (taskId: number) => {
        const confirmDelete = window.confirm('Tem certeza de que deseja excluir esta tarefa?');
        if (confirmDelete) {
            axios
                .delete(`http://localhost:5000/api/tasks/delete/${taskId}`)
                .then(() => {
                    fetchTasks();
                    toast.success('Tarefa excluída com sucesso');
                })
                .catch((error) => {
                    console.error('Erro ao excluir tarefa:', error);
                    toast.error('Não foi possível excluir a tarefa');
                });
        }
    };

    const navigate = useNavigate();

    const editTask = (taskId: number) => {
        navigate(`/pages/tasks/edit/${taskId}`);
    };

    function getTextColor(backgroundColor: string | undefined): string {
        if (!backgroundColor) return '#000';
        const hex = backgroundColor.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? '#000' : '#fff';
    }

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesUser = selectedUser ? task.user?.id === Number(selectedUser) : true;
        const matchesProject = selectedProject ? task.project?.id === Number(selectedProject) : true;
        const matchesTag = selectedTag ? task.tag?.id === Number(selectedTag) : true;
        const matchesStatus = selectedStatus ? task.status === selectedStatus : true;

        return matchesSearch && matchesUser && matchesProject && matchesTag && matchesStatus;
    });

    return (
        <div className="container">
            <div className="table-container">
                <div className="table-header">
                    <h1>Listar tarefas</h1>
                    <div className="button-container">
                        <input
                            type="text"
                            placeholder="Pesquisar tarefas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-box"
                        />
                        <Link to="/pages/tasks/new" className="new-task-button">
                            Nova Tarefa
                        </Link>
                    </div>
                </div>
                <div className="filter-container">
                    <select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Todos os usuários</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Todos os projetos</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Todas as tags</option>
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Todos os status</option>
                        {statusOptions.map((status, index) => (
                            <option key={index} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="table-scroll">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Descrição</th>
                                <th>Criada em</th>
                                <th>Data de Conclusão</th>
                                <th>Status</th>
                                <th>Usuário</th>
                                <th>Projeto</th>
                                <th>Tag</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                                    <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}</td>
                                    <td>{task.status}</td>
                                    <td>{task.user?.name || ''}</td>
                                    <td>{task.project?.name || ''}</td>
                                    <td>
                                        {task.tag && (
                                            <span
                                                className="tag-badge"
                                                style={{
                                                    backgroundColor: task.tag.color || '#ccc',
                                                    color: getTextColor(task.tag.color),
                                                }}
                                            >
                                                {task.tag.name || 'Sem tag'}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="edit-task-button"
                                                onClick={() => editTask(task.id)}
                                            >
                                                ✏️ Editar
                                            </button>
                                            <button
                                                className="delete-task-button"
                                                onClick={() => deleteTask(task.id)}
                                            >
                                                🗑️ Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ListTasks;
