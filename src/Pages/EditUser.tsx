import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Obtém o ID do usuário a ser editado
  const [name, setName] = useState<string>(''); // Estado para o nome
  const [email, setEmail] = useState<string>(''); // Estado para o email
  
  const navigate = useNavigate();

  // Carregar os dados do usuário para edição
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/users/${id}`)
        .then((response) => {
          const userData = response.data;
          setName(userData.name); // Preenche o nome
          setEmail(userData.email); // Preenche o email
        })
        .catch((error) => {
          console.error('Erro ao carregar usuário:', error);
          toast.error('Erro ao carregar os dados do usuário');
        });
    }
  }, [id]);  // Recarrega sempre que o ID mudar

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      name,
      email,
    };

    // Enviar a requisição PUT para atualizar o usuário
    axios
      .put(`http://localhost:5000/api/users/update/${id}`, userData)
      .then(() => {
        toast.success('Usuário atualizado com sucesso');
        navigate('/pages/users/list');  // Redireciona para a lista de usuários após editar
      })
      .catch((error) => {
        console.error('Erro ao atualizar usuário:', error);
        toast.error('Erro ao atualizar usuário');
      });
  };

  const handleCancel = () => {
    navigate('/pages/users/list');  // Se o usuário cancelar, vai para a lista de usuários
  };

  return (
    <div className="container">
      <div className="create-task-container">
        <div className="create-task-header">
          <h1>Editar Usuário</h1>
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
            <button className="edit-task-button" type="submit">
              Atualizar Usuário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
