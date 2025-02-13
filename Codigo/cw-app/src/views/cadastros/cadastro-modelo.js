import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";

import { mensagemSucesso, mensagemErro } from "../../components/toastr";

import axios from "axios";
import { BASE_URL } from "../../config/axios";

const baseURL = `${BASE_URL}/modelos`;
const marcasURL = `${BASE_URL}/fabricantes`; // Endpoint para buscar as marcas

function CadastroModelo() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [marca, setMarca] = useState("");
  const [nome, setNome] = useState("");

  const [dados, setDados] = useState(null);
  const [marcas, setMarcas] = useState([]); // Estado para armazenar as marcas

  // Função para buscar marcas disponíveis no servidor
  async function carregarMarcas() {
    try {
      const response = await axios.get(`${marcasURL}`);
      setMarcas(response.data);
    } catch (error) {
      console.error("Erro ao carregar marcas:", error);
    }
  }

  function inicializar() {
    setId("");
    setMarca("");
    setNome("");
  }

  async function salvar() {
    const data = {
      id,
      marca,
      nome,
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
        const veiculo = response.data;
        setId(veiculo.id);
        setNome(veiculo.nome);
        setMarca(veiculo.marca); // Preencher o select com a marca correta
        setDados(veiculo);
      } catch (error) {
        mensagemErro("Erro ao carregar os dados do veículo.");
      }
    } else {
      inicializar();
    }
  }

  useEffect(() => {
    carregarMarcas(); // Buscar marcas ao carregar a página
    buscar(); // Buscar dados do veículo se for edição
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
              <FormGroup label="Marca: *" htmlFor="inputMarca">
                <select
                  id="inputMarca"
                  value={marca}
                  className="form-control"
                  onChange={(e) => setMarca(e.target.value)}
                >
                  <option value="">Selecione uma marca</option>
                  {marcas.map((m) => (
                    <option key={m.id} value={m.nome}>
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
