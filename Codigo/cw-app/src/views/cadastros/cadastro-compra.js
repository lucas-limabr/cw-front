import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

import Stack from "@mui/material/Stack";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";

import { mensagemSucesso, mensagemErro } from "../../components/toastr";

import axios from "axios";
import { BASE_URL } from "../../config/axios";

const baseURL = `${BASE_URL}/compras`;
const clientesURL = `${BASE_URL}/clientes`;
const modelosURL = `${BASE_URL}/modelos`;
const chassiURL = `${BASE_URL}/veiculos`;

function CadastroCompra() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [data, setData] = useState("");
  const [formaPag, setFormaPag] = useState("");
  const [modelo, setModelo] = useState("");
  const [desconto, setDesconto] = useState("");
  const [cpfCliente, setCpfCliente] = useState("");
  const [cpfClientes, setCpfClientes] = useState([]);
  const [chassiVeiculo, setChassiVeiculo] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [chassiVeiculos, setChassiVeiculos] = useState([]);
  const [dados, setDados] = useState(null);

  function inicializar() {
    setId("");
    setData("");
    setFormaPag("");
    setModelo("");
    setDesconto("");
    setCpfCliente("");
    setChassiVeiculo("");
  }

  async function salvar() {
    const dadosCompra = {
      id,
      data,
      formaPag,
      modelo,
      desconto,
      cpfCliente,
      cpfCliente: cpfCliente ? cpfCliente.value : "",
      chassiVeiculo: chassiVeiculo ? chassiVeiculo.value : "",
    };

    try {
      if (!idParam) {
        await axios.post(`${baseURL}`, dadosCompra, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Compra realizada com sucesso.`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, dadosCompra, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Compra atualizada com sucesso.`);
      }
      navigate("/listagem-compra");
    } catch (error) {
      // Exiba uma mensagem de erro ao invés de um erro fatal
      mensagemErro(error.response?.data || "Erro ao salvar a compra.");
    }
  }

  async function carregarModelos() {
    try {
      const response = await axios.get(`${modelosURL}`);
      setModelos(response.data);
    } catch (error) {
      console.error("Erro ao carregar modelos:", error);
    }
  }

  //  Carregar os clientes do JSON
  useEffect(() => {
    async function carregarClientes() {
      try {
        const response = await axios.get(`${clientesURL}`); // Ajuste conforme a API
        const clientesFormatados = response.data.map((cliente) => ({
          value: cliente.cpf,
          label: cliente.cpf,
        }));
        setCpfClientes(clientesFormatados);
      } catch (error) {
        mensagemErro("Erro ao carregar os clientes.");
      }
    }

    async function carregarChassis() {
      try {
        const response = await axios.get(`${chassiURL}`); // Ajuste conforme a API
        const chassisFormatados = response.data.map((chassi) => ({
          value: chassi.chassi,
          label: chassi.chassi,
        }));
        setChassiVeiculos(chassisFormatados);
      } catch (error) {
        mensagemErro("Erro ao carregar os chassis.");
      }
    }

    carregarClientes();
    carregarChassis();
  }, []);

  async function buscar() {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const compra = response.data;
        setId(compra.id);
        setData(compra.data);
        setFormaPag(compra.formaPag);
        setDesconto(compra.desconto);
        setModelo(compra.modeloVeiculo);
        setCpfCliente(compra.cpfCliente);
        setChassiVeiculo(compra.chassiVeiculo);
        setDados(compra);
      } catch (error) {
        mensagemErro("Erro ao carregar os dados da compra.");
      }
    } else {
      inicializar();
    }
  }

  useEffect(() => {
    carregarModelos();
    buscar();
  }, [idParam]);

  return (
    <div className="container">
      <Card title="Cadastro de Compra">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <div className="bs-component">
              <FormGroup label="Data: *" htmlFor="inputData">
                <input
                  type="text"
                  id="inputData"
                  value={data}
                  className="form-control"
                  onChange={(e) => setData(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Modelo: *" htmlFor="inputModelo">
                <select
                  id="inputModelo"
                  value={modelo}
                  selected = {modelo}
                  className="form-control"
                  onChange={(e) => setModelo(e.target.value)}
                >
                  <option value="">Selecione um modelo</option>
                  {modelos.map((m) => (
                    <option key={m.id} value={m.nome}>
                      {m.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <br />
              <FormGroup label="CPF do Cliente: *">
                <Select
                  options={cpfClientes}
                  value={cpfCliente}
                  selected = {cpfCliente}
                  onChange={setCpfCliente}
                  placeholder="Selecione um CPF"
                  isSearchable
                />
              </FormGroup>
              <br />
              <FormGroup label="Chassi do veículo: *">
                <Select
                  options={chassiVeiculos}
                  selected = {chassiVeiculo}
                  value={chassi}
                  onChange={setChassiVeiculo}
                  placeholder="Selecione um Chassi"
                  isSearchable
                />
              </FormGroup>
              <br />
              <FormGroup label="Forma de pagamento: *" htmlFor="inputFormaPag">
                <input
                  type="text"
                  id="inputFormaPag"
                  value={formaPag}
                  className="form-control"
                  onChange={(e) => setFormaPag(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Desconto: *" htmlFor="inputDesconto">
                <input
                  type="text"
                  id="inputDesconto"
                  value={desconto}
                  className="form-control"
                  onChange={(e) => setDesconto(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="CPF do Cliente: *" htmlFor="inputCpfCliente">
                <input
                  type="text"
                  id="inputCpfCliente"
                  value={cpfCliente}
                  className="form-control"
                  onChange={(e) => setCpfCliente(e.target.value)}
                />
              </FormGroup>
              <br />
              <Stack spacing={1} padding={1} direction="row">
                <button
                  onClick={salvar}
                  type="button"
                  className="btn btn-success"
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
                  type="button"
                  className="btn btn-danger"
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroCompra;
