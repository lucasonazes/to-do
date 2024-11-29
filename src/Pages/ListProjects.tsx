import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ListProjects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]); // Estado para armazenar a lista de projetos
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios
      .get("http://localhost:5000/api/projects/list") // Substitua pela URL correta da API
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar projetos:", error);
      });
  };

  // Função para excluir um projeto
  const deleteProject = (projectId: number) => {
    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir este projeto?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/projects/delete/${projectId}`) // Substitua pela URL correta da API
        .then(() => {
          toast.success("Projeto excluído com sucesso");
          fetchProjects(); // Atualiza a lista após excluir
        })
        .catch((error) => {
          console.error("Erro ao excluir projeto:", error);
        });
    }
  };

  // Função para redirecionar para a página de edição
  const handleEdit = (projectId: number) => {
    navigate(`/pages/projects/edit/${projectId}`);
  };

  // Função para redirecionar para a página de criação
  const handleCreate = () => {
    navigate("/pages/projects/new");
  };

  return (
    <div className="container">
      <div className="table-container">
        <div className="table-header">
          <h1>Lista de Projetos</h1>
          <button className="create-task-button" onClick={handleCreate}>
            Criar Novo Projeto
          </button>
        </div>

        <div className="table-scroll">
          {projects.length > 0 ? (
            <table className="styled-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Data de Início</th>
                  <th>Data de Conclusão</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.id}</td>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>{new Date(project.startDate).toLocaleDateString()}</td>
                    <td>{new Date(project.finalDate).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-task-button"
                          onClick={() => handleEdit(project.id)} // Edita o projeto pelo ID.
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className="delete-task-button"
                          onClick={() =>
                            setProjects((prevProjects) =>
                              prevProjects.filter((p) => p.id !== project.id)
                            )
                          } // Exclui o projeto pelo ID.
                        >
                          🗑️ Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nenhum projeto encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListProjects;
