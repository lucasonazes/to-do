import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateProject: React.FC = () => {
  const [name, setName] = useState<string>(''); // Nome do projeto
  const [description, setDescription] = useState<string>(''); // Descrição do projeto
  const [startDate, setStartDate] = useState<string>(''); // Data de início
  const [finalDate, setFinalDate] = useState<string>(''); // FinalDate do projeto
  const navigate = useNavigate();

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      name,
      description,
      startDate,
      finalDate,
    };

    // Enviar a requisição POST para criar o projeto
    axios
      .post('http://localhost:5000/api/projects/create', projectData)
      .then(() => {
        toast.success('Projeto criado com sucesso');
        navigate('/pages/projects/list'); // Redireciona para a lista de projetos
      })
      .catch((error) => {
        console.error('Erro ao criar projeto:', error);
      });
  };

  // Cancelar e voltar para a lista de projetos
  const handleCancel = () => {
    navigate('/pages/projects/list');
  };

  return (
    <div className="container">
      <div className="create-task-container">
        <div className="create-task-header">
          <h1>Criar Novo Projeto</h1>
        </div>

        <form className="create-task-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Nome do Projeto</label>
          <input
            id="name"
            type="text"
            placeholder="Digite o nome do projeto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            placeholder="Digite a descrição do projeto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label htmlFor="startDate">Data de Início</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          <label htmlFor="finalDate">Data de Conclusão</label>
          <input
            id="finalDate"
            type="date"
            value={finalDate}
            onChange={(e) => setFinalDate(e.target.value)}
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
              Criar Projeto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
