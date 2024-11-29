import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateUser: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      name,
      email,
    };

    // Envia uma requisição para criar o usuário
    axios
      .post('http://localhost:5000/api/users/register', userData)
      .then(() => {
        toast.success('Usuário criado com sucesso');
        navigate('/pages/users/list'); // Redireciona para a lista de usuários
      })
      .catch((error) => {
        console.error('Erro ao criar usuário:', error);
        toast.error('Erro ao criar usuário');
      });
  };

  const handleCancel = () => {
    navigate('/pages/users/list'); // Se o usuário cancelar, vai para a lista de usuários
  };

  return (
    <div className="container">
      <div className="create-task-container">
        <div className="create-task-header">
          <h1>Criar Novo Usuário</h1>
        </div>

        <form className="create-task-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            placeholder="Digite o nome do usuário"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Digite o email do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="form-actions">
            <button
              type="button"
              className="cancel-task-button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button className="create-task-button" type="submit">
              Criar Usuário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
