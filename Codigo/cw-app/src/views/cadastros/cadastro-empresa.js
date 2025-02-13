import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";

import { mensagemSucesso, mensagemErro } from "../../components/toastr";

import axios from "axios";
import { BASE_URL } from "../../config/axios";

const baseURL = `${BASE_URL}/empresas`;

function CadastroEmpresa() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [uf, setUf] = useState("");
  const [email, setEmail] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");

  const [dados, setDados] = useState(null);

  function inicializar() {
    setId("");
    setRazaoSocial("");
    setCnpj("");
    setTelefone("");
    setEmail("");
    setLogradouro("");
    setNumero("");
    setComplemento("");
    setBairro("");
    setCep("");
    setUf("");
  }

  async function salvar() {
    const data = {
      id,
      razaoSocial,
      cnpj,
      telefone,
      email,
      logradouro,
      numero,
      complemento,
      bairro,
      cep,
      uf
    };

    try {
      if (!idParam) {
        await axios.post(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Empresa ${razaoSocial} cadastrada com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Empresa ${razaoSocial} alterada com sucesso!`);
      }
      navigate("/listagem-empresa");
    } catch (error) {
      mensagemErro(error.response?.data || "Erro ao salvar empresa.");
    }
  }

  async function buscar() {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const empresa = response.data;
        setId(empresa.id);
        setRazaoSocial(empresa.razaoSocial);
        setCnpj(empresa.cnpj);
        setTelefone(empresa.telefone);
        setEmail(empresa.email);
        setLogradouro(empresa.logradouro);
        setNumero(empresa.numero);
        setComplemento(empresa.complemento);
        setBairro(empresa.bairro);
        setCep(empresa.cep);
        setUf(empresa.uf);

      } catch (error) {
        mensagemErro("Erro ao carregar os dados da empresa.");
      }
    } else {
      inicializar();
    }
  }

  function cancelar() {
    navigate(`/listagem-empresa/`);
  }

  useEffect(() => {
    buscar();
  }, [idParam]);

  return (
    <div className="container">
      <Card title="Cadastro de Empresa">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <div className="bs-component">
              <FormGroup label="RazaoSocial: *" htmlFor="inputRazaoSocial">
                <input
                  type="text"
                  id="inputRazaoSocial"
                  value={razaoSocial}
                  className="form-control"
                  onChange={(e) => setRazaoSocial(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="CNPJ: *" htmlFor="inputCnpj">
                <input
                  type="text"
                  id="inpuCnpj"
                  value={cnpj}
                  className="form-control"
                  onChange={(e) => setCnpj(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Telefone: *" htmlFor="inputTelefone">
                <input
                  type="text"
                  id="inputTelefone"
                  value={telefone}
                  className="form-control"
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </FormGroup>
              <br />

              <FormGroup label="E-mail: *" htmlFor="inputEmail">
                <input
                  type="text"
                  id="inputEmail"
                  value={email}
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Logradouro: *" htmlFor="inputLogradouro">
                <input
                  type="text"
                  id="inputLogradouro"
                  value={logradouro}
                  className="form-control"
                  onChange={(e) => setLogradouro(e.target.value)}
                />
              </FormGroup>
              <br />

              <FormGroup label="Número: *" htmlFor="inputNumero">
                <input
                  type="text"
                  id="inputNumero"
                  value={numero}
                  className="form-control"
                  onChange={(e) => setNumero(e.target.value)}
                />
              </FormGroup>

              <br />

              <FormGroup label="Complemento: *" htmlFor="inputComplemento">
                <input
                  type="text"
                  id="inputComplemento"
                  value={complemento}
                  className="form-control"
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </FormGroup>

              <br />

              <FormGroup label="Bairro: *" htmlFor="inputBairro">
                <input
                  type="text"
                  id="inputBairro"
                  value={bairro}
                  className="form-control"
                  onChange={(e) => setBairro(e.target.value)}
                />
              </FormGroup>

              <br />
              <FormGroup label="UF: *" htmlFor="inputUf">
                <input
                  type="text"
                  id="inputUf"
                  value={uf}
                  className="form-control"
                  onChange={(e) => setUf(e.target.value)}
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

export default CadastroEmpresa;
