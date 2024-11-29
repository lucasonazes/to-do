import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Tag from '../Models/Tag';  // Assumindo que você tem um modelo de Tag como em User.ts

const ListTags: React.FC = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = () => {
        axios
            .get('http://localhost:5000/api/tags/list')
            .then((response) => {
                setTags(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar tags:', error.message);
    
            });
    };

    const deleteTag = (tagId: number) => {
        const confirmDelete = window.confirm('Tem certeza de que deseja excluir esta tag?');
        if (confirmDelete) {
            axios
                .delete(`http://localhost:5000/api/tags/delete/${tagId}`)
                .then(() => {
                    fetchTags(); 
                    toast.success('Tag excluída com sucesso');
                })
                .catch((error) => {
                    console.error('Erro ao excluir tag:', error);
                    toast.error('Não foi possível excluir a tag');
                });
        }
    };

    const navigate = useNavigate();

    const editTag = (tagId: number) => {
        navigate(`/pages/tags/edit/${tagId}`);
    };

    const filteredTags = tags.filter((tag) =>
        tag.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div className="table-container">
                <div className="table-header">
                    <h1>Listar Tags</h1>
                    <div className="button-container">
                        <input
                            type="text"
                            placeholder="Pesquisar tags..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-box"
                        />
                        <Link to="/pages/tags/new" className="new-task-button">
                            Nova Tag
                        </Link>
                    </div>
                </div>
                <div className="table-scroll">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Cor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTags.map((tag) => (
                                <tr key={tag.id}>
                                    <td>{tag.id}</td>
                                    <td>{tag.name}</td>
                                    <td>
                                        
                                        <span
                                            style={{
                                                display: 'inline-block',
                                                width: '20px',
                                                height: '20px',
                                                backgroundColor: tag.color,
                                            }}
                                        ></span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="edit-task-button"
                                                onClick={() => editTag(tag.id)}
                                            >
                                                ✏️ Editar
                                            </button>
                                            <button
                                                className="delete-task-button"
                                                onClick={() => deleteTag(tag.id)}
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

export default ListTags;
