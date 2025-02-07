import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

import Stack from "@mui/material/Stack";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";

import { mensagemSucesso, mensagemErro } from "../../components/toastr";

import axios from "axios";
import { BASE_URL } from "../../config/axios";

const baseURL = `${BASE_URL}/testdrives`;
const clientesURL = `${BASE_URL}/clientes`;
const modelosURL = `${BASE_URL}/modelos`;

function CadastroTestDrive() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [dados, setDados] = useState(null);

  const [id, setId] = useState("");
  const [dataAgendada, setDataAgendada] = useState("");
  const [horaAgendada, setHoraAgendada] = useState("");
  const [modelo, setModelo] = useState("");
  const [cpfCliente, setCpfCliente] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [modelos, setModelos] = useState([]);

  async function carregarModelos() {
    try {
      const response = await axios.get(`${modelosURL}`);
      setModelos(response.data);
    } catch (error) {
      console.error("Erro ao carregar modelos:", error);
    }
  }

  function inicializar() {
    setId("");
    setDataAgendada("");
    setHoraAgendada("");
    setModelo("");
    setCpfCliente("");
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
        setClientes(clientesFormatados);
      } catch (error) {
        mensagemErro("Erro ao carregar os clientes.");
      }
    }

    carregarClientes();
  }, []);

  async function buscar() {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const test_drive = response.data;
        setId(test_drive.id);
        setModelo(test_drive.modeloVeiculo);
        setDados(test_drive);
      } catch (error) {
        mensagemErro("Erro ao carregar os dados do veículo.");
      }
    } else {
      inicializar();
    }
  }

  useEffect(() => {
    carregarModelos();
    buscar();
  }, [idParam]);

  async function salvar() {
    const data = {
      id,
      dataAgendada,
      horaAgendada,
      modelo,
      cpfCliente: cpfCliente ? cpfCliente.value : "",
    };

    try {
      if (!idParam) {
        await axios.post(`${baseURL}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Test drive cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Test drive atualizado com sucesso!`);
      }
      navigate("/listagem-testdrive");
    } catch (error) {
      mensagemErro(error.response?.data || "Erro ao salvar test drive.");
    }
  }

  return (
    <div className="container">
      <Card title="Cadastro de Test Drive">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <div className="bs-component">
              <FormGroup label="Data Agendada: *" htmlFor="inputDataAgendada">
                <input
                  type="date"
                  id="inputDataAgendada"
                  value={dataAgendada}
                  className="form-control"
                  onChange={(e) => setDataAgendada(e.target.value)}
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
              <Stack spacing={1} padding={1} direction="row">
                <button onClick={salvar} type="button" className="btn btn-success">
                  Salvar
                </button>
                <button onClick={() => navigate("/listagem-testdrives")} type="button" className="btn btn-danger">
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

export default CadastroTestDrive;
