import React from "react";

import Card from "../../components/card";

import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { BASE_URL } from "../../config/axios";
import { useNavigate } from "react-router-dom";

const baseURL = `${BASE_URL}/vendedores`;

function ListagemVendedor() {
  const navigate = useNavigate();
  const [dados, setDados] = React.useState(null);

  const cadastrar = () => {
    navigate(`/cadastro-vendedor`);
  };

  const editar = (id) => {
    navigate(`/cadastro-vendedor/${id}`);
  };

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    await axios
      .delete(url, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        alert("Vendedor excluído com sucesso!");
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          }),
        );
      })
      .catch(function (error) {
        alert("Erro ao excluir o vendedor");
      });
  }

  React.useEffect(() => {
    axios.get(`${baseURL}`).then((response) => {
      setDados(response.data);
    });
  }, []);

  if (!dados) return null;

  return (
    <div className="container">
      <Card title="Listagem de Vendedores">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning"
                onClick={cadastrar}
              >
                Novo Vendedor
              </button>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Concessionária</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Telefone Principal</th>
                    <th scope="col">Email Principal</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
                      <td>{dado.razaoSocialConcessionaria}</td>
                      <td>{dado.cpf}</td>
                      <td>{dado.telefone1}</td>
                      <td>{dado.email1}</td>
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

export default ListagemVendedor;
