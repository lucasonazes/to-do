import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Task from '../Models/Task';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ListTasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/tasks/list')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Erro na requisição:', error.message);
            });
    }, []);

    const fetchTasks = () => {
    axios
        .get('http://localhost:5000/api/tasks/list')
        .then(response => {
            setTasks(response.data)
        })
        .catch(error => {
            console.error('Erro ao buscar tarefas:', error)
        });
    };

    const deleteTask = (taskId: number) => {
        const confirmDelete = window.confirm('Tem certeza de que deseja excluir esta tarefa?');
        if (confirmDelete) {
            axios
            .delete(`http://localhost:5000/api/tasks/delete/${taskId}`)
            .then(() => {
                fetchTasks();
            })
            .catch((error) => {
                console.error('Erro ao excluir tarefa:', error);
                alert('Não foi possível excluir a tarefa.');
            });
        }
    }
     
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

    return (
        <div className='container'>
            <div className='table-container'>
                <div className='table-header'>
                    <h1>Lista de Tarefas</h1>
                    <div className="button-container">
                        <Link to="/pages/tasks/new" className="new-task-button">Nova Tarefa</Link>
                    </div>
                </div>
                <div className="table-scroll">
                    <table className='styled-table'>
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
                            {tasks.map(task => (
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
                                            {task.tag.name || 'Sem nome'}
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
