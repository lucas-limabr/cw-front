import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";

import { mensagemSucesso, mensagemErro } from "../../components/toastr";

import axios from "axios";
import { BASE_URL } from "../../config/axios";

const baseURL = `${BASE_URL}/modelos`;
const fabricantesURL = `${BASE_URL}/fabricantes`;

function CadastroModelo() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [fabricante, setFabricante] = useState(null);
  const [nome, setNome] = useState("");

  const [dados, setDados] = useState(null);
  const [fabricantes, setFabricantes] = useState([]);

  async function carregarFabricantes() {
    try {
      const response = await axios.get(`${fabricantesURL}`);
      setFabricantes(response.data);
    } catch (error) {
      console.error("Erro ao carregar fabricantes:", error);
    }
  }

  function inicializar() {
    setFabricante("");
    setNome("");
  }

  async function salvar() {
    const data = {
      nome: nome,
      fabricanteId:  parseInt(fabricante)
    };

    try {
      if (!idParam) {
        await axios.post(`${baseURL}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Modelo ${nome} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Modelo ${nome} alterado com sucesso!`);
      }
      navigate("/listagem-modelo");
    } catch (error) {
      mensagemErro(error.response?.data || "Erro ao salvar modelo.");
    }
  }

  function cancelar() {
    navigate(`/listagem-modelo/`);
  }

  async function buscar() {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const modelo = response.data;
        setNome(modelo.nome);
        setFabricante(modelo.fabricanteId);
        setDados(modelo);
      } catch (error) {
        mensagemErro("Erro ao carregar os dados do veículo.");
      }
    } else {
      inicializar();
    }
  }

  useEffect(() => {
    carregarFabricantes();
    buscar();
  }, [idParam]);

  return (
    <div className="container">
      <Card title="Cadastro de Veículo">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <div className="bs-component">
              <FormGroup label="Nome: *" htmlFor="inputNome">
                <input
                  type="text"
                  id="inputNome"
                  value={nome}
                  className="form-control"
                  onChange={(e) => setNome(e.target.value)}
                />
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
                    <option key={m.id} value={m.id}>
                      {m.nome}
                    </option>
                  ))}
                </select>
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

export default CadastroModelo;
