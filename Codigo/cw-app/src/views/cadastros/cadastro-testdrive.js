import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";

import { mensagemSucesso, mensagemErro } from "../../components/toastr";

import axios from "axios";
import { BASE_URL } from "../../config/axios";

const baseURL = `${BASE_URL}/testdrives`;

function CadastroTestDrive() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [dataAgendada, setDataAgendada] = useState("");
  const [horaAgendada, setHoraAgendada] = useState("");
  const [dataEntregue, setDataEntregue] = useState("");
  const [horaEntregue, setHoraEntregue] = useState("");
  const [razaoSocialConcessionaria, setRazaoSocialConcessionaria] =
    useState("");
  const [idConcessionaria, setIdConcessionaria] = useState("");
  const [modeloVeiculo, setModeloVeiculo] = useState("");
  const [idModeloVeiculo, setIdModeloVeiculo] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [cpfCliente, setCpfCliente] = useState("");

  function inicializar() {
    setId("");
    setDataAgendada("");
    setHoraAgendada("");
    setDataEntregue("");
    setHoraEntregue("");
    setRazaoSocialConcessionaria("");
    setIdConcessionaria("");
    setModeloVeiculo("");
    setIdModeloVeiculo("");
    setIdCliente("");
    setCpfCliente("");
  }

  async function salvar() {
    const data = {
      id,
      dataAgendada,
      horaAgendada,
      dataEntregue,
      horaEntregue,
      razaoSocialConcessionaria,
      idConcessionaria,
      modeloVeiculo,
      idModeloVeiculo,
      idCliente,
      cpfCliente,
    };

    try {
      if (!idParam) {
        await axios.post(`${baseURL}/create`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Test drive cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/update/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Test drive atualizado com sucesso!`);
      }
      navigate("/listagem-testdrives");
    } catch (error) {
      mensagemErro(error.response?.data || "Erro ao salvar test drive.");
    }
  }

  async function buscar() {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/read/${idParam}`);
        const testDrive = response.data;
        setId(testDrive.id);
        setDataAgendada(testDrive.dataAgendada);
        setHoraAgendada(testDrive.horaAgendada);
        setDataEntregue(testDrive.dataEntregue);
        setHoraEntregue(testDrive.horaEntregue);
        setRazaoSocialConcessionaria(testDrive.razaoSocialConcessionaria);
        setIdConcessionaria(testDrive.idConcessionaria);
        setModeloVeiculo(testDrive.modeloVeiculo);
        setIdModeloVeiculo(testDrive.idModeloVeiculo);
        setIdCliente(testDrive.idCliente);
        setCpfCliente(testDrive.cpfCliente);
      } catch (error) {
        mensagemErro("Erro ao carregar os dados do test drive.");
      }
    } else {
      inicializar();
    }
  }

  useEffect(() => {
    buscar();
  }, [idParam]);

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
              <FormGroup label="Hora Agendada: *" htmlFor="inputHoraAgendada">
                <input
                  type="time"
                  id="inputHoraAgendada"
                  value={horaAgendada}
                  className="form-control"
                  onChange={(e) => setHoraAgendada(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup
                label="Razão Social da Concessionária: *"
                htmlFor="inputRazaoSocial"
              >
                <input
                  type="text"
                  id="inputRazaoSocial"
                  value={razaoSocialConcessionaria}
                  className="form-control"
                  onChange={(e) => setRazaoSocialConcessionaria(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup
                label="Modelo do Veículo: *"
                htmlFor="inputModeloVeiculo"
              >
                <input
                  type="text"
                  id="inputModeloVeiculo"
                  value={modeloVeiculo}
                  className="form-control"
                  onChange={(e) => setModeloVeiculo(e.target.value)}
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

export default CadastroTestDrive;
