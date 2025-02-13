import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";

import { mensagemSucesso, mensagemErro } from "../../components/toastr";

import axios from "axios";
import { BASE_URL } from "../../config/axios";

const baseURL = `${BASE_URL}/concessionarias`;

function CadastroConcessionaria() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [uf, setUf] = useState("");
  const [complemento, setComplemento] = useState("");  // Adicionado o estado para complemento

  const [dados, setDados] = useState(null);

  function inicializar() {
    setId("");
    setRazaoSocial("");
    setCnpj("");
    setTelefone("");
    setEmail("");
    setLogradouro("");
    setNumero("");
    setBairro("");
    setCep("");
    setUf("");
    setComplemento("");  // Limpeza do campo complemento
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
      bairro,
      cep,
      uf,
      complemento,  // Incluído o campo complemento
    };

    try {
      if (!idParam) {
        await axios.post(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(
          `Concessionária ${razaoSocial} cadastrada com sucesso!`,
        );
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Concessionária ${razaoSocial} alterado com sucesso!`);
      }
      navigate("/listagem-concessionaria");
    } catch (error) {
      mensagemErro(error.response?.data || "Erro ao salvar concessionária.");
    }
  }

  async function buscar() {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const concessionaria = response.data;
        setId(concessionaria.id);
        setRazaoSocial(concessionaria.razaoSocial);
        setCnpj(concessionaria.cnpj);
        setTelefone(concessionaria.telefone);
        setEmail(concessionaria.email);
        setLogradouro(concessionaria.logradouro);
        setNumero(concessionaria.numero);
        setBairro(concessionaria.bairro);
        setCep(concessionaria.cep);
        setUf(concessionaria.uf);
        setComplemento(concessionaria.complemento);  // Carregar complemento
        setDados(concessionaria);
      } catch (error) {
        mensagemErro("Erro ao carregar os dados da concessionária.");
      }
    } else {
      inicializar();
    }
  }

  function cancelar() {
    navigate(`/listagem-concessionaria/`);
  }

  useEffect(() => {
    buscar();
  }, [idParam]);

  return (
    <div className="container">
      <Card title="Cadastro de Concessionária">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <div className="bs-component">
              <FormGroup label="Razão Social: *" htmlFor="inputRazaoSocial">
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
                  id="inputCnpj"
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
                  type="email"
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
              <FormGroup label="Complemento:" htmlFor="inputComplemento">
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
              <FormGroup label="CEP: *" htmlFor="inputCep">
                <input
                  type="text"
                  id="inputCep"
                  value={cep}
                  className="form-control"
                  onChange={(e) => setCep(e.target.value)}
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

export default CadastroConcessionaria;
