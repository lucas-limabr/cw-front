import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CadastroVeiculoUsado from "./sub-cadastro-veiculo";

import Stack from "@mui/material/Stack";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";

import { mensagemSucesso, mensagemErro } from "../../components/toastr";

import axios from "axios";
import { BASE_URL } from "../../config/axios";

const baseURL = `${BASE_URL}/veiculos`;
const modelosURL = `${BASE_URL}/modelos`; // Endpoint para buscar as marcas
const fabricantesURL = `${BASE_URL}/fabricantes`;

function CadastroVeiculo() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [chassi, setChassi] = useState("");
  const [modelo, setModelo] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [precoAtual, setPrecoAtual] = useState("");
  const [cor, setCor] = useState("");
  const [condicao, setCondicao] = useState("");
  const [vendido, setVendido] = useState("");
  const [garantia, setGarantia] = useState("");
  const [quilometragem, setQuilometragem] = useState("");
  const [documentacao, setDocumentacao] = useState("");
  const [sinistro, setSinistro] = useState("");

  const [dados, setDados] = useState(null);
  const [modelos, setModelos] = useState([]);
  const [fabricantes, setFabricantes] = useState([]);

  // Função para buscar modelos disponíveis no servidor
  async function carregarModelos() {
    try {
      const response = await axios.get(`${modelosURL}/read`);
      setModelos(response.data);
    } catch (error) {
      console.error("Erro ao carregar modelos:", error);
    }
  }

  async function carregarFabricantes() {
    try {
      const response = await axios.get(`${fabricantesURL}/read`);
      setFabricantes(response.data);
    } catch (error) {
      console.error("Erro ao carregar modelos:", error);
    }
  }

  function inicializar() {
    setId("");
    setChassi("");
    setModelo("");
    setFabricante("");
    setPrecoAtual("");
    setCor("");
    setCondicao("");
    setVendido("");
    setGarantia("");
    setQuilometragem("");
    setDocumentacao("");
    setSinistro("");
  }

  async function salvar() {
    const data = {
      id,
      chassi,
      modelo,
      fabricante,
      precoAtual,
      cor,
      condicao,
      vendido,
      garantia,
      ...(condicao === "Usado" && {
        quilometragem,
        documentacao,
        sinistro
      })
    };

    try {
      if (!idParam) {
        await axios.post(`${baseURL}/create/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Veículo ${modelo} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/update/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Veículo ${modelo} alterado com sucesso!`);
      }
      navigate("/listagem-veiculos");
    } catch (error) {
      mensagemErro(error.response?.data || "Erro ao salvar veículo.");
    }
  }

  async function buscar() {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/read/${idParam}`);
        const veiculo = response.data;
        setId(veiculo.id);
        setChassi(veiculo.chassi);
        setModelo(veiculo.modelo);
        setFabricante(veiculo.fabricante);
        setPrecoAtual(veiculo.precoAtual);
        setCor(veiculo.cor);
        setCondicao(veiculo.condicao);
        setVendido(veiculo.vendido);
        setGarantia(veiculo.garantia);
        setQuilometragem(veiculo.quilometragem);
        setDocumentacao(veiculo.documentacao);
        setSinistro(veiculo.sinistro);
        setDados(veiculo);
      } catch (error) {
        mensagemErro("Erro ao carregar os dados do veículo.");
      }
    } else {
      inicializar();
    }
  }

  useEffect(() => {
    carregarFabricantes();
    carregarModelos();
    buscar();
  }, [idParam]);

  return (
    <div className="container">
      <Card title="Cadastro de Veículo">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <div className="bs-component">
              <FormGroup label="Chassi: *" htmlFor="inputVin">
                <input
                  type="text"
                  id="inputVin"
                  value={chassi}
                  className="form-control"
                  onChange={(e) => setChassi(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Modelo: *" htmlFor="inputModelo">
                <select
                  id="inputModelo"
                  value={modelo}
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
              <FormGroup label="Fabricante: *" htmlFor="inputFabricante">
                <select
                  id="inputFabricante"
                  value={fabricante}
                  className="form-control"
                  onChange={(e) => setFabricante(e.target.value)}
                >
                  <option value="">Selecione uma fabricante</option>
                  {fabricantes.map((m) => (
                    <option key={m.id} value={m.nome}>
                      {m.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <br />
              <FormGroup label="Preço Atual: *" htmlFor="inputPrecoAtual">
                <input
                  type="number"
                  id="inputPrecoAtual"
                  value={precoAtual}
                  className="form-control"
                  onChange={(e) => setPrecoAtual(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Cor: *" htmlFor="inputCor">
                <input
                  type="text"
                  id="inputCor"
                  value={cor}
                  className="form-control"
                  onChange={(e) => setCor(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Vendido: *" htmlFor="inputVendido">
                <input
                  type="text"
                  id="inputVendido"
                  value={vendido}
                  className="form-control"
                  onChange={(e) => setVendido(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Garantia: *" htmlFor="inputGarantia">
                <input
                  type="text"
                  id="inputGarantia"
                  value={garantia}
                  className="form-control"
                  onChange={(e) => setGarantia(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Condição: *" htmlFor="inputCondicao">
                <div>
                  <label>
                    <input
                      type="radio"
                      value="Novo"
                      checked={condicao === "Novo"}
                      onChange={() => setCondicao("Novo")}
                    />
                    Novo
                  </label>
                  <label style={{ marginLeft: "20px" }}>
                    <input
                      type="radio"
                      value="Usado"
                      checked={condicao === "Usado"}
                      onChange={() => setCondicao("Usado")}
                    />
                    Usado
                  </label>
                </div>
              </FormGroup>
              <br />
              {condicao === "Usado" && (
                <CadastroVeiculoUsado
                  quilometragem={quilometragem}
                  setQuilometragem={setQuilometragem}
                  documentacao={documentacao}
                  setDocumentacao={setDocumentacao}
                  sinistro={sinistro}
                  setSinistro={setSinistro}
                />
              )}

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

export default CadastroVeiculo;
