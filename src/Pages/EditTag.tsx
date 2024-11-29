import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditTag: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID da tag a ser editada
  const [name, setName] = useState<string>(""); // Estado para o nome
  const [color, setColor] = useState<string>(""); // Estado para a cor

  const navigate = useNavigate();

  // Carregar os dados da tag para edição
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/tags/${id}`)
        .then((response) => {
          const tagData = response.data;
          setName(tagData.name); // Preenche o nome da tag
          setColor(tagData.color); // Preenche a cor da tag
        })
        .catch((error) => {
          console.error("Erro ao carregar tag:", error);
          toast.error("Erro ao carregar os dados da tag");
        });
    }
  }, [id]); // Recarrega sempre que o ID mudar

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tagData = {
      name,
      color,
    };

    // Enviar a requisição PUT para atualizar a tag
    axios
      .put(`http://localhost:5000/api/tags/update/${id}`, tagData)
      .then(() => {
        toast.success("Tag atualizada com sucesso");
        navigate("/pages/tags/list"); // Redireciona para a lista de tags após editar
      })
      .catch((error) => {
        console.error("Erro ao atualizar tag:", error);
        toast.error("Erro ao atualizar tag");
      });
  };

  const handleCancel = () => {
    navigate("/pages/tags/list"); // Se o usuário cancelar, vai para a lista de tags
  };

  return (
    <div className="container">
      <div className="create-task-container">
        <div className="create-task-header">
          <h1>Editar Tag</h1>
        </div>

        <form className="create-task-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Nome</label>
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

          <div className="form-actions">
            <button
              type="button"
              className="cancel-task-button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button className="edit-task-button" type="submit">
              Atualizar Tag
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTag;
