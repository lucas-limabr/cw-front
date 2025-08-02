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

const baseURL = `${BASE_URL}/veiculos`;

function ListagemVeiculo() {
  const navigate = useNavigate();

  const [veiculosOriginais, setVeiculosOriginais] = useState([]);
  const [dados, setDados] = useState([]);

  const [filtroTipo, setFiltroTipo] = useState(null);
  const [filtroModelo, setFiltroModelo] = useState(null);
  const [filtroFabricante, setFiltroFabricante] = useState(null);
  const [filtroCondicao, setFiltroCondicao] = useState(null);
  const [filtroConcessionaria, setFiltroConcessionaria] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        const veiculosOrdenados = response.data.sort((a, b) =>
          a.nomeModelo.localeCompare(b.nomeModelo)
        );
        setVeiculosOriginais(veiculosOrdenados);
        setDados(veiculosOrdenados);
      })
      .catch((error) => {
        mensagemErro("Erro ao carregar a listagem de veículos.");
      });
  }, []);

  const criarOpcoesUnicas = useCallback((lista, chave) => {
    return [
      ...new Set(lista.map((item) => item[chave]).filter(Boolean)),
    ].map((valor) => ({ value: valor, label: valor }));
  }, []);

  const tipoOptions = useMemo(() => criarOpcoesUnicas(veiculosOriginais, "tipo"), [veiculosOriginais, criarOpcoesUnicas]);
  const modeloOptions = useMemo(() => criarOpcoesUnicas(veiculosOriginais, "nomeModelo"), [veiculosOriginais, criarOpcoesUnicas]);
  const fabricanteOptions = useMemo(() => criarOpcoesUnicas(veiculosOriginais, "nomeFabricante"), [veiculosOriginais, criarOpcoesUnicas]);
  const condicaoOptions = useMemo(() => criarOpcoesUnicas(veiculosOriginais, "condicao"), [veiculosOriginais, criarOpcoesUnicas]);
  const concessionariaOptions = useMemo(() => criarOpcoesUnicas(veiculosOriginais, "nomeConcessionaria"), [veiculosOriginais, criarOpcoesUnicas]);

  useEffect(() => {
    if (filtroModelo) {
      const veiculoSelecionado = veiculosOriginais.find(
        (v) => v.nomeModelo === filtroModelo.value
      );
      if (veiculoSelecionado) {
        const nomeFabricante = veiculoSelecionado.nomeFabricante;
        const fabricanteOption = fabricanteOptions.find(
          (opt) => opt.value === nomeFabricante
        );
        if (fabricanteOption) {
          setFiltroFabricante(fabricanteOption);
        }
      }
    } else {
      setFiltroFabricante(null);
    }
  }, [filtroModelo, veiculosOriginais, fabricanteOptions]);


  const handleFiltrar = () => {
    let veiculosFiltrados = [...veiculosOriginais];

    if (filtroTipo) {
      veiculosFiltrados = veiculosFiltrados.filter(v => v.tipo === filtroTipo.value);
    }
    if (filtroModelo) {
      veiculosFiltrados = veiculosFiltrados.filter(v => v.nomeModelo === filtroModelo.value);
    }
    if (filtroFabricante) {
      veiculosFiltrados = veiculosFiltrados.filter(v => v.nomeFabricante === filtroFabricante.value);
    }
    if (filtroCondicao) {
      veiculosFiltrados = veiculosFiltrados.filter(v => v.condicao === filtroCondicao.value);
    }
    if (filtroConcessionaria) {
      veiculosFiltrados = veiculosFiltrados.filter(v => v.nomeConcessionaria === filtroConcessionaria.value);
    }

    setDados(veiculosFiltrados);
  };

  const handleLimparFiltros = () => {
    setFiltroTipo(null);
    setFiltroModelo(null);
    setFiltroFabricante(null);
    setFiltroCondicao(null);
    setFiltroConcessionaria(null);
    setDados(veiculosOriginais);
  };

  const cadastrar = () => navigate(`/cadastro-veiculo`);
  const editar = (id) => navigate(`/cadastro-veiculo/${id}`);

  const excluir = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      mensagemSucesso("Veículo excluído com sucesso!");
      const novosVeiculos = veiculosOriginais.filter((dado) => dado.id !== id);
      setVeiculosOriginais(novosVeiculos);
      setDados(novosVeiculos);
    } catch (error) {
      mensagemErro("Erro ao excluir o veículo.");
    }
  };

  if (!dados) return null;

  return (
    <div className="container-fluid">
      <Card title="Listagem de Veículos">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning mb-3"
                onClick={cadastrar}
              >
                Novo Veículo
              </button>

              <div className="row mb-3 d-flex align-items-end">
                <div className="col-md-2">
                  <FormGroup label={<b>Tipo:</b>}>
                    <Select options={tipoOptions} value={filtroTipo} onChange={setFiltroTipo} isClearable placeholder="Todos" />
                  </FormGroup>
                </div>
                <div className="col-md-2">
                  <FormGroup label={<b>Modelo:</b>}>
                    <Select options={modeloOptions} value={filtroModelo} onChange={setFiltroModelo} isClearable placeholder="Todos" />
                  </FormGroup>
                </div>
                <div className="col-md-2">
                  <FormGroup label={<b>Fabricante:</b>}>
                    <Select options={fabricanteOptions} value={filtroFabricante} onChange={setFiltroFabricante} isClearable placeholder="Todos" />
                  </FormGroup>
                </div>
                <div className="col-md-2">
                  <FormGroup label={<b>Condição:</b>}>
                    <Select options={condicaoOptions} value={filtroCondicao} onChange={setFiltroCondicao} isClearable placeholder="Todas" />
                  </FormGroup>
                </div>
                <div className="col-md-2">
                  <FormGroup label={<b>Concessionária:</b>}>
                    <Select options={concessionariaOptions} value={filtroConcessionaria} onChange={setFiltroConcessionaria} isClearable placeholder="Todas" />
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
                      <th scope="col">Tipo</th>
                      <th scope="col">Chassi</th>
                      <th scope="col">Modelo</th>
                      <th scope="col">Fabricante</th>
                      <th scope="col">Preço Atual</th>
                      <th scope="col">Condição</th>
                      <th scope="col">Concessionária</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dados.map((dado) => (
                      <tr key={dado.id}>
                        <td>{dado.tipo}</td>
                        <td>{dado.chassi}</td>
                        <td>{dado.nomeModelo}</td>
                        <td>{dado.nomeFabricante}</td>
                        <td>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(dado.precoAtual)}
                        </td>
                        <td>{dado.condicao}</td>
                        <td>{dado.nomeConcessionaria}</td>
                        <td>
                          <Stack spacing={1} padding={0} direction="row">
                            <IconButton aria-label="edit" onClick={() => editar(dado.id)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={() => excluir(dado.id)}>
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

export default ListagemVeiculo;