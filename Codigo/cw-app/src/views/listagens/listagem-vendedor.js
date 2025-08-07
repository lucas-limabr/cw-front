import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import { mensagemSucesso, mensagemErro } from "../../components/toastr";
import { BASE_URL } from "../../config/axios";

import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const baseURL = `${BASE_URL}/vendedores`;

function ListagemVendedor() {
  const navigate = useNavigate();

  const [vendedoresOriginais, setVendedoresOriginais] = useState([]);
  const [dados, setDados] = useState([]);
  const [filtroConcessionaria, setFiltroConcessionaria] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(baseURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const vendedoresOrdenados = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
        setVendedoresOriginais(vendedoresOrdenados);
        setDados(vendedoresOrdenados);
      })
      .catch((error) => {
        mensagemErro("Erro ao carregar a listagem de vendedores.");
      });
  }, []);

  const concessionariaOptions = useMemo(() => {
    // Cria uma lista de concessionárias únicas a partir dos dados originais
    const concessionariasUnicas = [
      ...new Set(vendedoresOriginais.map((v) => v.concessionaria)),
    ];
    // Formata a lista para o formato exigido pelo react-select
    return concessionariasUnicas.map((concessionaria) => ({
      value: concessionaria,
      label: concessionaria,
    }));
  }, [vendedoresOriginais]);

  const handleFiltrar = () => {
    let vendedoresFiltrados = [...vendedoresOriginais];
    if (filtroConcessionaria) {
      vendedoresFiltrados = vendedoresFiltrados.filter(
        (v) => v.concessionaria === filtroConcessionaria.value
      );
    }
    setDados(vendedoresFiltrados);
  };

  const handleLimparFiltros = () => {
    setFiltroConcessionaria(null);
    setDados(vendedoresOriginais);
  };

  const cadastrar = () => {
    navigate(`/cadastro-vendedor`);
  };

  const editar = (id) => {
    navigate(`/cadastro-vendedor/${id}`);
  };

  const excluir = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      mensagemSucesso("Vendedor excluído com sucesso!");
      // Atualiza ambas as listas após a exclusão
      const novosVendedores = vendedoresOriginais.filter((dado) => dado.id !== id);
      setVendedoresOriginais(novosVendedores);
      setDados(novosVendedores);
    } catch (error) {
      mensagemErro("Erro ao excluir o vendedor.");
    }
  };

  if (!dados) return null;

  return (
    <div className="container">
      <Card title="Listagem de Vendedores">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning mb-3"
                onClick={cadastrar}
              >
                Novo Vendedor
              </button>

              {/* Seção de Filtro */}
              <div className="row mb-3">
                <div className="col-md-10">
                  <FormGroup label={<b>Concessionária:</b>}>
                    <Select
                      options={concessionariaOptions}
                      value={filtroConcessionaria}
                      onChange={setFiltroConcessionaria}
                      placeholder="Selecione uma concessionária para filtrar..."
                      isClearable
                    />
                  </FormGroup>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button
                    onClick={handleFiltrar}
                    type="button"
                    className="btn btn-primary me-2"
                  >
                    Filtrar
                  </button>
                  <button
                    onClick={handleLimparFiltros}
                    type="button"
                    className="btn btn-secondary"
                  >
                    Limpar
                  </button>
                </div>
              </div>

              {/* Tabela de Dados */}
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
                      <td>{dado.concessionaria}</td>
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