import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";

import { mensagemSucesso, mensagemErro } from "../../components/toastr";

import axios from "axios";
import { BASE_URL } from "../../config/axios";

const baseURL = `${BASE_URL}/compras`;

function CadastroCompra() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [data, setData] = useState("");
  const [formaPag, setFormaPag] = useState("");
  const [desconto, setDesconto] = useState("");
  const [cpfCliente, setCpfCliente] = useState("");
  const [concessionaria, setConcessionaria] = useState("");
  const [veiculo, setVeiculo] = useState("");

  const [dados, setDados] = useState(null);

  function inicializar() {
    setId("");
    setData("");
    setFormaPag("");
    setDesconto("");
    setCpfCliente("");
    setConcessionaria("");
    setVeiculo("");
  }

  async function salvar() {
    const data = {
      id,
      data,
      formaPag,
      desconto,
      cpfCliente,
      concessionaria,
      veiculo,
    };

    try {
      if (!idParam) {
        await axios.post(`${baseURL}/create/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Compra realizada`);
      } else {
        await axios.put(`${baseURL}/update/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Não foi possível efetuar a compra`);
      }
      navigate("/listagem-compra");
    } catch (error) {
      mensagemErro(error.response?.data || "Erro ao salvar compra.");
    }
  }

  async function buscar() {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/read/${idParam}`);
        const compra = response.data;
        setId(compra.id);
        setData(compra.data);
        setFormaPag(compra.formaPag);
        setDesconto(compra.desconto);
        setCpfCliente(compra.cpfCliente);
        setConcessionaria(compra.razaoSocialConcessionaria);
        setVeiculo(compra.modeloVeiculo);
        setDados(compra);
      } catch (error) {
        mensagemErro("Erro ao carregar os dados da compra.");
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
              <FormGroup
                label="Concessionaria: *"
                htmlFor="inputConcessionaria"
              >
                <input
                  type="text"
                  id="inputConcessionaria"
                  value={concessionaria}
                  className="form-control"
                  onChange={(e) => setConcessionaria(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Veículo: *" htmlFor="inputVeiculo">
                <input
                  type="text"
                  id="inputVeiculo"
                  value={veiculo}
                  className="form-control"
                  onChange={(e) => setVeiculo(e.target.value)}
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
