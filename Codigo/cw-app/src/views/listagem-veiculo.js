import React from "react";

import Card from "../components/card";

import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { mensagemSucesso, mensagemErro } from "../components/toastr";

import axios from "axios";
import { BASE_URL } from "../config/axios";

const baseURL = `${BASE_URL}/listagem-veiculo`;

function ListagemVeiculo() {
  const navigate = useNavigate();

  const [dados, setDados] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  const cadastrar = () => {
    navigate(`/cadastro-veiculo`);
  };

  const editar = (id) => {
    navigate(`/cadastro-veiculos/${id}`);
  };

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    await axios
      .delete(url, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        mensagemSucesso(`Veículo excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          }),
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o veículo`);
      });
  }

  if (!dados) return null;

  return (
    <div className="container">
      <Card title="Listagem de Veículos">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => cadastrar()}
              >
                Novo Veículo
              </button>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Chassi</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Preço Atual</th>
                    <th scope="col">Cor</th>
                    <th scope="col">Condição</th>
                    <th scope="col">Garantia</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.vin}</td>
                      <td>{dado.nome}</td>
                      <td>{dado.marca}</td>
                      <td>{dado.precoAtual}</td>
                      <td>{dado.cor}</td>
                      <td>{dado.condicao}</td>
                      <td>{dado.garantia}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction="row">
                          <IconButton
                            aria-label="edit"
                            //onClick={() => editar(dado.id)} // Navega para editar
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            //onClick={() => excluir(dado.id)} // Exclui veículo
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

export default ListagemVeiculo;
