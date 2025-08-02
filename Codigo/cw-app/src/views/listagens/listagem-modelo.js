import React, { useState, useEffect, useMemo, useCallback } from "react";
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

const baseURL = `${BASE_URL}/modelos`;

function ListagemModelos() {
  const navigate = useNavigate();

  const [modelosOriginais, setModelosOriginais] = useState([]);
  const [dados, setDados] = useState([]);
  const [filtroFabricante, setFiltroFabricante] = useState(null);

  const carregarModelos = useCallback(async () => {
    try {
      const response = await axios.get(baseURL);
      const modelosOrdenados = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
      setModelosOriginais(modelosOrdenados);
      setDados(modelosOrdenados);
    } catch (error) {
      mensagemErro("Erro ao carregar a listagem de modelos.");
    }
  }, []);

  useEffect(() => {
    carregarModelos();
  }, [carregarModelos]);

  const criarOpcoesUnicas = useCallback((lista, chave) => {
    return [
      ...new Set(lista.map((item) => item[chave]).filter(Boolean)),
    ].map((valor) => ({ value: valor, label: valor }));
  }, []);

  const fabricanteOptions = useMemo(() => criarOpcoesUnicas(modelosOriginais, "nomeFabricante"), [modelosOriginais, criarOpcoesUnicas]);

  const handleFiltrar = () => {
    let dadosFiltrados = [...modelosOriginais];
    if (filtroFabricante) {
      dadosFiltrados = dadosFiltrados.filter(d => d.nomeFabricante === filtroFabricante.value);
    }
    setDados(dadosFiltrados);
  };

  const handleLimparFiltros = () => {
    setFiltroFabricante(null);
    setDados(modelosOriginais);
  };

  const cadastrar = () => navigate(`/cadastro-modelo`);
  const editar = (id) => navigate(`/cadastro-modelo/${id}`);

  const excluir = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      mensagemSucesso("Modelo excluído com sucesso!");
      // Recarrega a lista para refletir a exclusão
      carregarModelos();
    } catch (error) {
      mensagemErro("Erro ao excluir o modelo.");
    }
  };

  if (!dados) return null;

  return (
    <div className="container-fluid">
      <Card title="Listagem de Modelos">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning mb-3"
                onClick={cadastrar}
              >
                Novo Modelo
              </button>

              <div className="row mb-3 d-flex align-items-end">
                <div className="col-md-10">
                  <FormGroup label={<b>Fabricante:</b>}>
                    <Select
                      options={fabricanteOptions}
                      value={filtroFabricante}
                      onChange={setFiltroFabricante}
                      isClearable
                      placeholder="Selecione um fabricante para filtrar..."
                    />
                  </FormGroup>
                </div>
                <div className="col-md-2">
                  <button onClick={handleFiltrar} type="button" className="btn btn-primary me-2">Filtrar</button>
                  <button onClick={handleLimparFiltros} type="button" className="btn btn-secondary">Limpar</button>
                </div>
              </div>
              
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Nome</th>
                      <th scope="col">Fabricante</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dados.map((dado) => (
                      <tr key={dado.id}>
                        <td>{dado.nome}</td>
                        <td>{dado.nomeFabricante}</td>
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
        </div>
      </Card>
    </div>
  );
}

export default ListagemModelos;