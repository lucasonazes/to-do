import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateTag: React.FC = () => {
  const [name, setName] = useState<string>('');     
  const [color, setColor] = useState<string>('');   
  const [priority, setPriority] = useState<string>(''); 
  const navigate = useNavigate();

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tagData = {
      name,
      color,
      priority,  
    };

    // Envia a requisição POST para criar a tag
    axios
      .post('http://localhost:5000/api/tags/create', tagData)
      .then(() => {
        toast.success('Tag criada com sucesso');
        navigate('/pages/tags/list'); 
      })
      .catch((error) => {
        console.error('Erro ao criar tag:', error);
      });
  };

  const handleCancel = () => {
    navigate('/pages/tags/list');
  };

  return (
    <div className="container">
      <div className="create-taks-container">
        <div className="create-task-header">
          <h1>Criar Nova Tag</h1>
        </div>

        <form className="create-task-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Nome da Tag</label>
          <input
            id="name"
            type="text"
            placeholder="Digite o nome da tag"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="color">Cor</label>
          <input
            id="color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />

          <label htmlFor="priority">Prioridade</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="">Selecione a prioridade</option>
            <option value="baixa">Baixa</option>
            <option value="média">Média</option>
            <option value="alta">Alta</option>
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
              Criar Tag
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTag;
