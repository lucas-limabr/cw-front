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
import VisibilityIcon from "@mui/icons-material/Visibility";

const baseURL = `${BASE_URL}/vendas`;
const veiculosURL = `${BASE_URL}/veiculos`;

function ListagemVenda() {
  const navigate = useNavigate();
  
  const [vendasOriginais, setVendasOriginais] = useState([]);
  const [dados, setDados] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [detalhesVenda, setDetalhesVenda] = useState(null);

  const [filtroCliente, setFiltroCliente] = useState(null);
  const [filtroVendedor, setFiltroVendedor] = useState(null);

  useEffect(() => {
    const carregarDadosIniciais = async () => {
      try {
        const [vendasRes, veiculosRes] = await Promise.all([
          axios.get(baseURL),
          axios.get(veiculosURL)
        ]);
        const vendasOrdenadas = vendasRes.data.sort((a, b) => b.id - a.id);
        setVendasOriginais(vendasOrdenadas);
        setDados(vendasOrdenadas);
        setVeiculos(veiculosRes.data);
      } catch (error) {
        mensagemErro("Erro ao carregar dados da página.");
      }
    };
    carregarDadosIniciais();
  }, []);

  const clienteOptions = useMemo(() => {
    const clientesUnicos = {};
    vendasOriginais.forEach(venda => {
      if (venda.cpfCliente && !clientesUnicos[venda.cpfCliente]) {
        clientesUnicos[venda.cpfCliente] = venda.nomeCliente;
      }
    });
    return Object.entries(clientesUnicos).map(([cpf, nome]) => ({
      value: cpf,
      label: `${nome} (${cpf})`
    }));
  }, [vendasOriginais]);

  const vendedorOptions = useMemo(() => {
    const vendedoresUnicos = {};
    vendasOriginais.forEach(venda => {
      if (venda.cpfVendedor && !vendedoresUnicos[venda.cpfVendedor]) {
        vendedoresUnicos[venda.cpfVendedor] = venda.nomeVendedor;
      }
    });
    return Object.entries(vendedoresUnicos).map(([cpf, nome]) => ({
      value: cpf,
      label: `${nome} (${cpf})`
    }));
  }, [vendasOriginais]);

  const handleFiltrar = () => {
    let vendasFiltradas = [...vendasOriginais];
    if (filtroCliente) {
      vendasFiltradas = vendasFiltradas.filter(v => v.cpfCliente === filtroCliente.value);
    }
    if (filtroVendedor) {
      vendasFiltradas = vendasFiltradas.filter(v => v.cpfVendedor === filtroVendedor.value);
    }
    setDados(vendasFiltradas);
  };

  const handleLimparFiltros = () => {
    setFiltroCliente(null);
    setFiltroVendedor(null);
    setDados(vendasOriginais);
  };

  const cadastrar = () => navigate(`/cadastro-venda`);
  const editar = (id) => navigate(`/cadastro-venda/${id}`);

  const excluir = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      mensagemSucesso(`Venda excluída com sucesso!`);
      const novasVendas = vendasOriginais.filter((dado) => dado.id !== id);
      setVendasOriginais(novasVendas);
      setDados(novasVendas);
      if (detalhesVenda && detalhesVenda.id === id) {
        setDetalhesVenda(null);
      }
    } catch (error) {
      mensagemErro(`Erro ao excluir a venda.`);
    }
  };

  const visualizarDetalhes = async (id) => {
    setDetalhesVenda(null);
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      setDetalhesVenda(response.data);
    } catch (error) {
      mensagemErro("Erro ao buscar detalhes da venda.");
    }
  };

  const valorTotalVenda = useMemo(() => {
    if (!detalhesVenda || !detalhesVenda.itens || veiculos.length === 0) return 0;
    const valorBruto = detalhesVenda.itens.reduce((acc, item) => {
      const veiculoInfo = veiculos.find(v => v.id === item.veiculoId);
      return acc + (Number(veiculoInfo?.precoAtual) || 0);
    }, 0);
    const desconto = Number(detalhesVenda.desconto) || 0;
    return valorBruto - desconto;
  }, [detalhesVenda, veiculos]);

  if (!dados) return null;

  return (
    <div className="container">
      <Card title="Listagem de Vendas">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button type="button" className="btn btn-warning mb-3" onClick={cadastrar}>
                Nova Venda
              </button>

              <div className="row mb-3">
                <div className="col-md-5">
                  <FormGroup label={<b>Cliente:</b>}>
                    <Select
                      options={clienteOptions}
                      value={filtroCliente}
                      onChange={setFiltroCliente}
                      placeholder="Todos"
                      isClearable
                    />
                  </FormGroup>
                </div>
                <div className="col-md-5">
                  <FormGroup label={<b>Vendedor:</b>}>
                    <Select
                      options={vendedorOptions}
                      value={filtroVendedor}
                      onChange={setFiltroVendedor}
                      placeholder="Todos"
                      isClearable
                    />
                  </FormGroup>
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button onClick={handleFiltrar} type="button" className="btn btn-primary me-2">Filtrar</button>
                  <button onClick={handleLimparFiltros} type="button" className="btn btn-secondary">Limpar</button>
                </div>
              </div>
              
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Código</th>
                      <th scope="col">Data</th>
                      <th scope="col">Cliente</th>
                      <th scope="col">Vendedor</th>
                      <th scope="col">Pagamento</th>
                      <th scope="col">Status</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dados.map((dado) => (
                      <tr key={dado.id}>
                        <td>{dado.id}</td>
                        <td>{dado.data}</td>
                        <td>{dado.nomeCliente}</td>
                        <td>{dado.nomeVendedor}</td>
                        <td>{dado.formaPag}</td>
                        <td>{dado.aprovada}</td>
                        <td>
                          <Stack spacing={1} padding={0} direction="row">
                            <IconButton aria-label="details" onClick={() => visualizarDetalhes(dado.id)}>
                              <VisibilityIcon />
                            </IconButton>
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
      <br />
      {detalhesVenda && (
        <Card title={`Detalhes da Venda: ${detalhesVenda.id}`} className="mt-4">
          <div className="row">
            <div className="col-lg-12">
              <h5 className="card-title mt-2">Itens da Venda</h5>
              <table className="table table-sm table-bordered">
                <thead>
                  <tr>
                    <th>Modelo</th>
                    <th>Chassi</th>
                    <th>Preço do Item</th>
                    <th>Desconto do Item</th>
                  </tr>
                </thead>
                <tbody>
                  {detalhesVenda.itens.map(item => {
                    const veiculoInfo = veiculos.find(v => v.id === item.veiculoId);
                    return (
                      <tr key={item.veiculoId}>
                        <td>{veiculoInfo?.nomeModelo || 'Não encontrado'}</td>
                        <td>{veiculoInfo?.chassi || 'Não encontrado'}</td>
                        <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(veiculoInfo?.precoAtual || 0)}</td>
                        <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.descontoParcial || 0)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="d-flex justify-content-end mt-3">
                <div className="text-end">
                  <p className="mb-1">
                    <strong>Desconto Total:</strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(detalhesVenda.desconto || 0)}
                  </p>
                  <h4 className="mb-0">
                    <strong>Valor Total:</strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotalVenda)}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default ListagemVenda;