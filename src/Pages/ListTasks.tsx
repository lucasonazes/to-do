import React, { useEffect, useState } from 'react';
import Task from '../Models/Task';

const ListTasks: React.FC = () => {
    const [tarefas, setTarefas] = useState<Task[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/tarefas/listar')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setTarefas(data);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }, []);

    return (
        <div>
            <h1>Lista de Produtos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Status</th>
                        <th>CriadoEm</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map(tarefa => (
                        <tr key={tarefa.id}>
                            <td>{tarefa.title}</td>
                            <td>{tarefa.description}</td>
                            <td>{tarefa.status}</td>
                            <td>{tarefa.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListTasks;