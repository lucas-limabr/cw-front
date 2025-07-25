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

const baseURL = `${BASE_URL}/concessionarias`;

function ListagemConcessionarias() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-concessionaria`);
  };

  const editar = (id) => {
    navigate(`/cadastro-concessionaria/${id}`);
  };

  const [dados, setDados] = React.useState(null);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        mensagemSucesso(`Concessionária excluída com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          }),
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir a concessionária`);
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
      <Card title="Listagem de Concessionárias">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => cadastrar()}
              >
                Nova Concessionária
              </button>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Razão Social</th>
                    <th scope="col">CNPJ</th>
                    <th scope="col">Empresa matriz</th>
                    <th scope="col">Endereço</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.razaoSocial}</td>
                      <td>{dado.cnpj}</td>
                      <td>{dado.razaoSocialEmpresa}</td>
                      <td>{`${dado.logradouro}, ${dado.numero} ${dado.complemento}, ${dado.bairro} - ${dado.uf} - ${dado.cep}`}</td>
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

export default ListagemConcessionarias;