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
const concessionariasURL = `${BASE_URL}/concessionarias`;

function CadastroCompra() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [dados, setDados] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [concessionarias, setConcessionarias] = useState([]);
  
  const [id, setId] = useState("");
  const [data, setData] = useState("");
  const [formaPag, setFormaPag] = useState("");
  const [desconto, setDesconto] = useState("");
  const [cpfCliente, setCpfCliente] = useState(null);
  const [modeloVeiculo, setModeloVeiculo] = useState("");
  const [chassiVeiculo, setChassiVeiculo] = useState("");
  const [concessionaria, setConcessionaria] = useState(null);

  // Carregar os dados das compras ou resetar os campos
  useEffect(() => {
    async function buscar() {
      if (idParam) {
        try {
          const response = await axios.get(`${baseURL}/${idParam}`);
          const compra = response.data;
          setId(compra.id);
          setData(compra.data);
          setFormaPag(compra.formaPag);
          setDesconto(compra.desconto);
          setCpfCliente({ value: compra.cpfCliente, label: compra.cpfCliente });
          setModeloVeiculo(compra.modeloVeiculo);
          setChassiVeiculo(compra.chassiVeiculo);
          setConcessionaria({ value: compra.idConcessionaria, label: compra.razaoSocialConcessionaria });
          setDados(compra);
        } catch (error) {
          mensagemErro("Erro ao carregar os dados da compra.");
        }
      } else {
        // Limpa os campos se não houver idParam
        limparCampos();
      }
    }

    buscar();
  }, [idParam]);

  // Carregar clientes, modelos e concessionárias
  useEffect(() => {
    async function carregarClientes() {
      try {
        const response = await axios.get(clientesURL);
        const clientesFormatados = response.data.map((cliente) => ({
          value: cliente.cpf,
          label: cliente.cpf,
        }));
        setClientes(clientesFormatados);
      } catch (error) {
        mensagemErro("Erro ao carregar clientes.");
      }
    }

    async function carregarModelos() {
      try {
        const response = await axios.get(modelosURL);
        setModelos(response.data);
      } catch (error) {
        mensagemErro("Erro ao carregar modelos.");
      }
    }

    async function carregarConcessionarias() {
      try {
        const response = await axios.get(concessionariasURL);
        const concessionariasFormatadas = response.data.map((concessionaria) => ({
          value: concessionaria.id,
          label: concessionaria.razaoSocial,
        }));
        setConcessionarias(concessionariasFormatadas);
      } catch (error) {
        mensagemErro("Erro ao carregar concessionárias.");
      }
    }

    carregarClientes();
    carregarModelos();
    carregarConcessionarias();
  }, []);

  // Função para limpar os campos
  function limparCampos() {
    setId("");
    setData("");
    setFormaPag("");
    setDesconto("");
    setCpfCliente(null);
    setModeloVeiculo("");
    setChassiVeiculo("");
    setConcessionaria(null);
  }

  // Função para salvar os dados da compra
  async function salvar() {
    const dataCompra = {
      id,
      data,
      formaPag,
      desconto,
      cpfCliente: cpfCliente ? cpfCliente.value : "",
      modeloVeiculo,
      chassiVeiculo,
      idConcessionaria: concessionaria ? concessionaria.value : "",
    };

    try {
      if (!idParam) {
        await axios.post(`${baseURL}`, dataCompra, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso("Compra cadastrada com sucesso!");
      } else {
        await axios.put(`${baseURL}/${idParam}`, dataCompra, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso("Compra atualizada com sucesso!");
      }
      navigate("/listagem-compras");
    } catch (error) {
      mensagemErro("Erro ao salvar a compra.");
    }
  }

  // Função para cancelar
  function cancelar() {
    navigate("/listagem-compras");
  }

  return (
    <div className="container">
      <Card title="Cadastro de Compra">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <div className="bs-component">
              <FormGroup label="Data: *" htmlFor="inputData">
                <input
                  type="date"
                  id="inputData"
                  value={data}
                  className="form-control"
                  onChange={(e) => setData(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Forma de Pagamento: *" htmlFor="inputFormaPag">
                <select
                  id="inputFormaPag"
                  value={formaPag}
                  className="form-control"
                  onChange={(e) => setFormaPag(e.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Boleto Bancário">Boleto Bancário</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>
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
              <FormGroup label="CPF do Cliente: *">
                <Select
                  options={clientes}
                  value={cpfCliente}
                  onChange={setCpfCliente}
                  placeholder="Selecione um CPF"
                  isSearchable
                />
              </FormGroup>
              <br />
              <FormGroup label="Modelo: *">
                <input
                  type="text"
                  value={modeloVeiculo}
                  className="form-control"
                  onChange={(e) => setModeloVeiculo(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Chassi do Veículo: *">
                <input
                  type="text"
                  value={chassiVeiculo}
                  className="form-control"
                  onChange={(e) => setChassiVeiculo(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Concessionária: *">
                <Select
                  options={concessionarias}
                  value={concessionaria}
                  onChange={setConcessionaria}
                  placeholder="Selecione uma concessionária"
                  isSearchable
                />
              </FormGroup>
              <br />
              <Stack spacing={1} padding={1} direction="row">
                <button onClick={salvar} type="button" className="btn btn-success">
                  Salvar
                </button>
                <button onClick={cancelar} type="button" className="btn btn-danger">
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
