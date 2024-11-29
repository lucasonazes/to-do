import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import User from '../Models/User';

const ListUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios
            .get('http://localhost:5000/api/users/list')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar usuários:', error.message);
            });
    };



    const navigate = useNavigate();

    const editUser = (userId: number) => {
        navigate(`/pages/users/edit/${userId}`);
    };


    const filteredUsers = users.filter((user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div className="table-container">
                <div className="table-header">
                    <h1>Listar Usuários</h1>
                    <div className="button-container">
                        <input
                            type="text"
                            placeholder="Pesquisar usuários..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-box"
                        />
                        <Link to="/pages/users/new" className="new-task-button">
                            Novo Usuário
                        </Link>
                    </div>
                </div>
                <div className="table-scroll">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Data de Registro</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                {/* Verifica se 'user.registeredIn' tem um valor válido antes de passá-lo para 'new Date()' */}
                                {user.registeredIn ? new Date(user.registeredIn).toLocaleDateString() : 'Data não disponível'}
                            </td>
                            
                            <td>
                                <div className="action-buttons">
                                    <button
                                        className="edit-task-button"
                                            onClick={() => editUser(user.id)}
                                                >
                                                    ✏️ Editar
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

export default ListUsers;