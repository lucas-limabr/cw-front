import React from "react";

import Card from "../../components/card";

import { mensagemSucesso, mensagemErro } from "../../components/toastr";

import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { BASE_URL } from "../../config/axios";

const baseURL = `${BASE_URL}/compras`;

function ListagemCompras() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-compra`);
  };

  const editar = (id) => {
    navigate(`/cadastro-compra/${id}`);
  };

  const [dados, setDados] = React.useState(null);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/delete/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        mensagemSucesso(`Compra excluída com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          }),
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir a compra`);
      });
  }

  React.useEffect(() => {
    axios.get(`${baseURL}/read`).then((response) => {
      setDados(response.data);
    });
  }, []);

  if (!dados) return null;

  return (
    <div className="container">
      <Card title="Listagem de Compras">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => cadastrar()}
              >
                Nova Compra
              </button>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Data</th>
                    <th scope="col">Forma de Pagamento</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Modelo Veículo</th>
                    <th scope="col">Chassi</th>
                    <th scope="col">Concessionária</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.data}</td>
                      <td>{dado.formaPag}</td>
                      <td>{dado.cpfCliente}</td>
                      <td>{dado.modeloVeiculo}</td>
                      <td>{dado.chassiVeiculo}</td>
                      <td>{dado.razaoSocialConcessionaria}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction="row">
                          <IconButton
                            aria-label="edit"
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => excluir(dado.id)}
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

export default ListagemCompras;
