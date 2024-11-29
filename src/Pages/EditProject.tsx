import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditProject: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID do projeto a ser editado
  const [name, setName] = useState<string>(''); // Estado para o nome do projeto
  const [description, setDescription] = useState<string>(''); // Estado para a descrição do projeto
  const [startDate, setStartDate] = useState<string>(''); // Estado para a data de início
  const [finalDate, setFinalDate] = useState<string>(''); // Estado para o finalDate do projeto
  const navigate = useNavigate();

  // Carrega os dados do projeto ao montar o componente
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/projects/${id}`) // Substitua pela URL correta da API
        .then((response) => {
          const projectData = response.data;
          setName(projectData.name);
          setDescription(projectData.description);
          setStartDate(projectData.startDate);
          setFinalDate(projectData.finalDate);
        })
        .catch((error) => {
          console.error('Erro ao carregar o projeto:', error);
        });
    }
  }, [id]);

  // Lida com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProjectData = {
      name,
      description,
      startDate,
      finalDate,
    };

    axios
      .put(`http://localhost:5000/api/projects/update/${id}`, updatedProjectData)
      .then(() => {
        toast.success('Projeto atualizado com sucesso');
        navigate('/pages/projects/list'); // Redireciona para a lista de projetos
      })
      .catch((error) => {
        console.error('Erro ao atualizar projeto:', error);
      });
  };

  // Cancelar e voltar para a lista de projetos
  const handleCancel = () => {
    navigate('/pages/projects/list');
  };

  return (
    <div className="container">
      <div className="create-task-container">
        <div className="create-task-heade">
          <h1>Editar Projeto</h1>
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
          >
          </input>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-task-button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button className="edit-task-button" type="submit">
              Atualizar Projeto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
