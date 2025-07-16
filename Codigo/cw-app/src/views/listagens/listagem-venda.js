import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Card from "../../components/card";
import { mensagemSucesso, mensagemErro } from "../../components/toastr";
import { BASE_URL } from "../../config/axios";

import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const baseURL = `${BASE_URL}/vendas`;

function ListagemVenda() {
  const navigate = useNavigate();
  const [dados, setDados] = React.useState(null);

  const cadastrar = () => {
    navigate(`/cadastro-venda`);
  };

  const editar = (id) => {
    navigate(`/cadastro-venda/${id}`);
  };

  const excluir = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      mensagemSucesso(`Venda excluída com sucesso!`);
      setDados(dados.filter((dado) => dado.id !== id));
    } catch (error) {
      mensagemErro(`Erro ao excluir a venda.`);
    }
  };

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  if (!dados) return null;

  return (
    <div className="container">
      <Card title="Listagem de Vendas">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning my-3"
                onClick={cadastrar}
              >
                Nova Venda
              </button>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Data</th>
                    <th scope="col">Forma de Pagamento</th>
                    <th scope="col">CPF Cliente</th>
                    <th scope="col">Modelos dos Veículos</th>
                    <th scope="col">Valor Total</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.data}</td>
                      <td>{dado.formaPag}</td>
                      <td>{dado.cpfCliente}</td>
                      <td>{dado.modelosVeiculos}</td>
                      <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dado.valorTotal)}</td>
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

export default ListagemVenda;