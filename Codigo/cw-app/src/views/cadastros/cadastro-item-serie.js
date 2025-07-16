import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";

import { mensagemSucesso, mensagemErro } from "../../components/toastr";

import axios from "axios";
import { BASE_URL } from "../../config/axios";

const baseURL = `${BASE_URL}/itemseries`;

function CadastroItemSerie() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [descricao, setDescricao] = useState("");

  const [dados, setDados] = useState(null);

  function inicializar() {
    setId("");
    setDescricao("");
  }

  async function salvar() {
    const data = {
      id,
      descricao,
    };

    try {
      if (!idParam) {
        await axios.post(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Item de série ${descricao} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Item de série ${descricao} alterado com sucesso!`);
      }
      navigate("/listagem-item-serie");
    } catch (error) {
      mensagemErro(error.response?.data || "Erro ao salvar veículo.");
    }
  }

  async function buscar() {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const item_serie = response.data;
        setId(item_serie.id);
        setDescricao(item_serie.descricao);
      } catch (error) {
        mensagemErro("Erro ao carregar os dados do item de série.");
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
      <Card title="Cadastro de Item de Série">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <div className="bs-component">
              <FormGroup label="Descricao: *" htmlFor="inputDescricao">
                <input
                  type="text"
                  id="inputDescricao"
                  value={descricao}
                  className="form-control"
                  onChange={(e) => setDescricao(e.target.value)}
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

export default CadastroItemSerie;
