import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/card";

import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { BASE_URL } from "../../config/axios";

const baseURL = `${BASE_URL}/fabricantes`;

function ListagemFabricante() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-fabricante`);
  };

  const editar = (id) => {
    navigate(`/cadastro-fabricante/${id}`);
  };

  const excluir = async (id) => {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/delete/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        alert("Fabricante excluído com sucesso!");
        setDados(dados.filter((dado) => dado.id !== id));
      })
      .catch(function (error) {
        alert("Erro ao excluir o fabricante");
      });
  };

  const [dados, setDados] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${baseURL}/read`).then((response) => {
      setDados(response.data);
    });
  }, []);

  if (!dados) return null;

  return (
    <div className="container">
      <Card title="Listagem de Fabricantes">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => cadastrar()}
              >
                Novo Fabricante
              </button>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
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

export default ListagemFabricante;
