import React from "react";

import Card from "../components/card";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { BASE_URL } from "../config/axios";

const baseURL = `${BASE_URL}/listagem-modelo`;

function ListagemModelos() {
  const navigate = useNavigate();

  // Função de navegação para cadastro de modelo
  const cadastrar = () => {
    navigate(`/cadastro-modelo`);
  };

  // Função de navegação para editar modelo
  const editar = (id) => {
    navigate(`/cadastro-modelos/${id}`);
  };

  const [dados, setDados] = React.useState(null);

  // Função para excluir um modelo
  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        mensagemSucesso(`Modelo excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          }),
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o modelo`);
      });
  }

  // Carregar os dados na primeira renderização
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  // Se não houver dados, não renderiza nada
  if (!dados) return null;

  return (
    <div className="container">
      <Card title="Listagem de Modelos">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => cadastrar()} // Redireciona para cadastro de modelo
              >
                Novo Modelo
              </button>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
                      <td>{dado.marca}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction="row">
                          <IconButton
                            aria-label="edit"
                            //onClick={() => editar(dado.id)} // Redireciona para edição do modelo
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            //onClick={() => excluir(dado.id)} // Exclui o modelo
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemModelos;
