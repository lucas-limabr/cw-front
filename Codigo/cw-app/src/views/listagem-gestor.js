import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/card";

import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { BASE_URL } from "../config/axios";

const baseURL = `${BASE_URL}/listagem-gestor`;

function ListagemGestor() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-gestor`);
  };

  const [dados, setDados] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  if (!dados) return null;

  return (
    <div className="container">
      <Card title="Listagem de Gestores">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => cadastrar()}
              >
                Novo Gestor
              </button>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Razão social Concessionaria</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
                      <td>{dado.cpf}</td>
                      <td>{dado.telefone}</td>
                      <td>{dado.email}</td>
                      <td>{dado.razaoSocialConcessionaria}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction="row">
                          <IconButton
                            aria-label="edit"
                          //onClick={() => editar(fabricante.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                          //onClick={() => excluir(fabricante.id)}
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

export default ListagemGestor;
