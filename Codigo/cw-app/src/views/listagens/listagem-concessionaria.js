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

const baseURL = `${BASE_URL}/concessionarias`;

function ListagemConcessionarias() {
  const navigate = useNavigate();

  const [concessionariasOriginais, setConcessionariasOriginais] = useState([]);
  const [dados, setDados] = useState([]);
  const [filtroEmpresa, setFiltroEmpresa] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        const concessionariasOrdenadas = response.data.sort((a, b) =>
          a.razaoSocial.localeCompare(b.razaoSocial)
        );
        setConcessionariasOriginais(concessionariasOrdenadas);
        setDados(concessionariasOrdenadas);
      })
      .catch((error) => {
        mensagemErro("Erro ao carregar a listagem de concessionárias.");
      });
  }, []);

  const empresaOptions = useMemo(() => {
    // Cria uma lista de empresas únicas a partir dos dados originais
    const empresasUnicas = [
      ...new Set(concessionariasOriginais.map((c) => c.razaoSocialEmpresa)),
    ];
    // Formata a lista para o formato exigido pelo react-select
    return empresasUnicas.map((empresa) => ({
      value: empresa,
      label: empresa,
    }));
  }, [concessionariasOriginais]);

  const handleFiltrar = () => {
    let concessionariasFiltradas = [...concessionariasOriginais];
    if (filtroEmpresa) {
      concessionariasFiltradas = concessionariasFiltradas.filter(
        (c) => c.razaoSocialEmpresa === filtroEmpresa.value
      );
    }
    setDados(concessionariasFiltradas);
  };

  const handleLimparFiltros = () => {
    setFiltroEmpresa(null);
    setDados(concessionariasOriginais);
  };

  const cadastrar = () => {
    navigate(`/cadastro-concessionaria`);
  };

  const editar = (id) => {
    navigate(`/cadastro-concessionaria/${id}`);
  };

  const excluir = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      mensagemSucesso("Concessionária excluída com sucesso!");
      // Atualiza ambas as listas após a exclusão
      const novasConcessionarias = concessionariasOriginais.filter(
        (dado) => dado.id !== id
      );
      setConcessionariasOriginais(novasConcessionarias);
      setDados(novasConcessionarias);
    } catch (error) {
      mensagemErro("Erro ao excluir a concessionária.");
    }
  };

  if (!dados) return null;

  return (
    <div className="container">
      <Card title="Listagem de Concessionárias">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning mb-3"
                onClick={cadastrar}
              >
                Nova Concessionária
              </button>

              {/* Seção de Filtro */}
              <div className="row mb-3">
                <div className="col-md-10">
                  <FormGroup label={<b>Empresa Matriz:</b>}>
                    <Select
                      options={empresaOptions}
                      value={filtroEmpresa}
                      onChange={setFiltroEmpresa}
                      placeholder="Selecione uma empresa para filtrar..."
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
                    <th scope="col">Razão Social</th>
                    <th scope="col">CNPJ</th>
                    <th scope="col">Empresa Matriz</th>
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
                      <td>{`${dado.logradouro}, ${dado.numero} ${
                        dado.complemento || ""
                      }, ${dado.bairro} - ${dado.uf} - ${dado.cep}`}</td>
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