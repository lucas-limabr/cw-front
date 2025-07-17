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

  const [id, setId] = useState("");
  const [dataAgendada, setDataAgendada] = useState("");
  const [horaAgendada, setHoraAgendada] = useState("");
  const [dataEntregue, setDataEntregue] = useState("");
  const [horaEntregue, setHoraEntregue] = useState("");
  const [modeloVeiculo, setModelo] = useState("");
  const [cpfCliente, setCpfCliente] = useState(null);
  
  const [clientes, setClientes] = useState([]);
  const [modelos, setModelos] = useState([]);

  useEffect(() => {
    carregarClientes();
    carregarModelos();
  }, []);

  useEffect(() => {
    if (idParam) {
      buscar();
    }
  }, [idParam]);

  const inicializar = () => {
    setId("");
    setDataAgendada("");
    setHoraAgendada("");
    setDataEntregue("");
    setHoraEntregue("");
    setModelo("");
    setCpfCliente(null);
  };

  const carregarModelos = async () => {
    try {
      const response = await axios.get(modelosURL);
      setModelos(response.data);
    } catch (error) {
      mensagemErro("Erro ao carregar modelos.");
    }
  };

  const carregarClientes = async () => {
    try {
      const response = await axios.get(clientesURL);
      const formatados = response.data.map((c) => ({
        value: c.cpf,
        label: c.cpf,
      }));
      setClientes(formatados);
    } catch (error) {
      mensagemErro("Erro ao carregar os clientes.");
    }
  };

  const buscar = async () => {
    if (!idParam) {
      return;
    }
    try {
      const response = await axios.get(`${baseURL}/${idParam}`);
      const data = response.data;

      setId(data.id);
      setModelo(data.modeloVeiculo);
      setCpfCliente({ value: data.cpfCliente, label: data.cpfCliente });
      setDataAgendada(data.dataAgendada || "");
      setHoraAgendada(data.horaAgendada || "");
      setDataEntregue(data.dataEntregue || "");
      setHoraEntregue(data.horaEntregue || "");
    } catch (error) {
      mensagemErro("Erro ao buscar dados do test drive.");
    }
  };

  const salvar = async () => {
    // Nova validação de datas no front-end
    if (dataAgendada && horaAgendada && dataEntregue && horaEntregue) {
      const dataHoraAgendada = new Date(`${dataAgendada}T${horaAgendada}`);
      const dataHoraEntregue = new Date(`${dataEntregue}T${horaEntregue}`);

      if (dataHoraEntregue < dataHoraAgendada) {
        mensagemErro("A data e hora de entrega não podem ser anteriores à data e hora agendada.");
        return; // Impede o envio para a API
      }
    }

    const payload = {
      id,
      dataAgendada,
      horaAgendada,
      modeloVeiculo,
      cpfCliente: cpfCliente?.value || "",
      dataEntregue: dataEntregue || null, // Envia null se estiver vazio
      horaEntregue: horaEntregue || null, // Envia null se estiver vazio
    };

    try {
      if (idParam) {
        await axios.put(`${baseURL}/${idParam}`, payload);
        mensagemSucesso("Test drive atualizado com sucesso!");
      } else {
        await axios.post(baseURL, payload);
        mensagemSucesso("Test drive cadastrado com sucesso!");
      }
      navigate("/listagem-testdrive");
    } catch (error) {
      mensagemErro(error.response?.data || "Erro ao salvar test drive.");
    }
  };

  return (
    <div className="container">
      <Card title="Cadastro de Test Drive">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <div className="bs-component">
              <FormGroup className="mb-3" label="Data Agendada: *" htmlFor="inputDataAgendada">
                <input
                  type="date"
                  id="inputDataAgendada"
                  value={dataAgendada}
                  className="form-control"
                  onChange={(e) => setDataAgendada(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup className="mb-3" label="Hora Agendada: *" htmlFor="inputHoraAgendada">
                <input
                  type="time"
                  id="inputHoraAgendada"
                  value={horaAgendada}
                  className="form-control"
                  onChange={(e) => setHoraAgendada(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Modelo do Veículo: *" htmlFor="inputModelo">
                <Select
                  id="inputModelo"
                  options={modelos.map((m) => ({ label: m.nome, value: m.nome }))}
                  value={modeloVeiculo ? { label: modeloVeiculo, value: modeloVeiculo } : null}
                  onChange={(selected) => setModelo(selected?.value || "")}
                />
              </FormGroup>
              <br />
              <FormGroup label="CPF do Cliente: *" htmlFor="inputCpfCliente">
                <Select
                  id="inputCpfCliente"
                  options={clientes}
                  value={cpfCliente}
                  onChange={(selected) => setCpfCliente(selected)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Data Entregue:" htmlFor="inputDataEntregue">
                <input
                  type="date"
                  id="inputDataEntregue"
                  value={dataEntregue}
                  className="form-control"
                  onChange={(e) => setDataEntregue(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Hora Entregue:" htmlFor="inputHoraEntregue">
                <input
                  type="time"
                  id="inputHoraEntregue"
                  value={horaEntregue}
                  className="form-control"
                  onChange={(e) => setHoraEntregue(e.target.value)}
                />
              </FormGroup>

              <br />
              <Stack direction="row" spacing={2}>
                <button
                  onClick={salvar}
                  className="btn btn-success"
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
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

export default CadastroTestDrive;