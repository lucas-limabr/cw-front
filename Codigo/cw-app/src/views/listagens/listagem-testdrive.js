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

const baseURL = `${BASE_URL}/testdrives`;

function ListagemTestDrive() {
  const navigate = useNavigate();

  const [testDrivesOriginais, setTestDrivesOriginais] = useState([]);
  const [dados, setDados] = useState([]);

  const [filtroConcessionaria, setFiltroConcessionaria] = useState(null);
  const [filtroModelo, setFiltroModelo] = useState(null);
  const [filtroData, setFiltroData] = useState("");

  const formatarData = (data) => {
    if (!data) return "";
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  useEffect(() => {
    const carregarTestDrives = async () => {
      try {
        const response = await axios.get(baseURL);
        const dadosOrdenados = response.data.sort(
          (a, b) => new Date(b.dataAgendada) - new Date(a.dataAgendada)
        );
        setTestDrivesOriginais(dadosOrdenados);
        setDados(dadosOrdenados);
      } catch (error) {
        mensagemErro("Erro ao carregar a listagem de test drives.");
      }
    };
    carregarTestDrives();
  }, []);

  const criarOpcoesUnicas = useCallback((lista, chave) => {
    return [
      ...new Set(lista.map((item) => item[chave]).filter(Boolean)),
    ].map((valor) => ({ value: valor, label: valor }));
  }, []);

  const concessionariaOptions = useMemo(() => criarOpcoesUnicas(testDrivesOriginais, "razaoSocialConcessionaria"), [testDrivesOriginais, criarOpcoesUnicas]);
  const modeloOptions = useMemo(() => criarOpcoesUnicas(testDrivesOriginais, "modeloVeiculo"), [testDrivesOriginais, criarOpcoesUnicas]);

  const handleFiltrar = () => {
    let dadosFiltrados = [...testDrivesOriginais];

    if (filtroConcessionaria) {
      dadosFiltrados = dadosFiltrados.filter(d => d.razaoSocialConcessionaria === filtroConcessionaria.value);
    }
    if (filtroModelo) {
      dadosFiltrados = dadosFiltrados.filter(d => d.modeloVeiculo === filtroModelo.value);
    }
    if (filtroData) {
      dadosFiltrados = dadosFiltrados.filter(d => d.dataAgendada === filtroData);
    }

    setDados(dadosFiltrados);
  };

  const handleLimparFiltros = () => {
    setFiltroConcessionaria(null);
    setFiltroModelo(null);
    setFiltroData("");
    setDados(testDrivesOriginais);
  };

  const cadastrar = () => navigate(`/cadastro-testdrive`);
  const editar = (id) => navigate(`/cadastro-testdrive/${id}`);

  const excluir = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      mensagemSucesso("Test Drive excluído com sucesso!");
      const novosDados = testDrivesOriginais.filter((dado) => dado.id !== id);
      setTestDrivesOriginais(novosDados);
      setDados(novosDados);
    } catch (error) {
      mensagemErro("Erro ao excluir o Test Drive.");
    }
  };

  if (!dados) return null;

  return (
    <div className="container-fluid">
      <Card title="Listagem de Test Drives">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning mb-3"
                onClick={cadastrar}
              >
                Novo Test Drive
              </button>

              <div className="row mb-3 d-flex align-items-end">
                <div className="col-md-4">
                  <FormGroup label={<b>Concessionária:</b>}>
                    <Select options={concessionariaOptions} value={filtroConcessionaria} onChange={setFiltroConcessionaria} isClearable placeholder="Todas" />
                  </FormGroup>
                </div>
                <div className="col-md-3">
                  <FormGroup label={<b>Modelo:</b>}>
                    <Select options={modeloOptions} value={filtroModelo} onChange={setFiltroModelo} isClearable placeholder="Todos" />
                  </FormGroup>
                </div>
                <div className="col-md-3">
                  <FormGroup label={<b>Data Agendada:</b>}>
                    <input
                      type="date"
                      className="form-control"
                      value={filtroData}
                      onChange={(e) => setFiltroData(e.target.value)}
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
                      <th scope="col">CPF Cliente</th>
                      <th scope="col">Modelo Veículo</th>
                      <th scope="col">Concessionária</th>
                      <th scope="col">Data Agendada</th>
                      <th scope="col">Hora Agendada</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dados.map((dado) => (
                      <tr key={dado.id}>
                        <td>{dado.cpfCliente}</td>
                        <td>{dado.modeloVeiculo}</td>
                        <td>{dado.razaoSocialConcessionaria}</td>
                        <td>{formatarData(dado.dataAgendada)}</td>
                        <td>{dado.horaAgendada}</td>
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

export default ListagemTestDrive;