import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";

import { mensagemSucesso, mensagemErro } from "../../components/toastr";

import axios from "axios";
import { BASE_URL } from "../../config/axios";

const baseURL = `${BASE_URL}/clientes`;

function CadastroCliente() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [datanascimento, setDatanascimento] = useState("");
  const [telefone1, setTelefone1] = useState("");
  const [telefone2, setTelefone2] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [uf, setUf] = useState("");

  const [dados, setDados] = useState(null);

  function inicializar() {
    setId("");
    setNome("");
    setCpf("");
    setLogin("");
    setSenha("");
    setDatanascimento("");
    setTelefone1("");
    setTelefone2("");
    setEmail1("");
    setEmail2("");
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
      nome,
      cpf,
      login,
      senha,
      datanascimento,
      telefone1,
      telefone2,
      email1,
      email2,
      logradouro,
      numero,
      complemento,
      bairro,
      cep,
      uf,
    };

    try {
      if (!idParam) {
        await axios.post(`${baseURL}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Cliente ${nome} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Cliente ${nome} alterado com sucesso!`);
      }
      navigate("/listagem-cliente");
    } catch (error) {
      mensagemErro(error.response?.data || "Erro ao salvar cliente.");
    }
  }

  async function buscar() {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const cliente = response.data;
        setId(cliente.id);
        setNome(cliente.nome);
        setCpf(cliente.cpf);
        setLogin(cliente.login);
        setSenha(cliente.senha);
        setDatanascimento(cliente.datanascimento);
        setTelefone1(cliente.telefone1);
        setTelefone2(cliente.telefone2);
        setEmail1(cliente.email1);
        setEmail2(cliente.email2);
        setLogradouro(cliente.logradouro);
        setNumero(cliente.numero);
        setComplemento(cliente.complemento);
        setBairro(cliente.bairro);
        setCep(cliente.cep);
        setUf(cliente.uf);
        setDados(cliente);
      } catch (error) {
        mensagemErro("Erro ao carregar os dados do cliente.");
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
      <Card title="Cadastro de Cliente">
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
              <FormGroup label="CPF: *" htmlFor="inputCpf">
                <input
                  type="text"
                  id="inputCpf"
                  value={cpf}
                  className="form-control"
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Login: *" htmlFor="inputLogin">
                <input
                  type="text"
                  id="inputLogin"
                  value={login}
                  className="form-control"
                  onChange={(e) => setLogin(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Senha: *" htmlFor="inputSenha">
                <input
                  type="password"
                  id="inputSenha"
                  value={senha}
                  className="form-control"
                  onChange={(e) => setSenha(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup
                label="Data de Nascimento: *"
                htmlFor="inputDataNascimento"
              >
                <input
                  type="date"
                  id="inputDataNascimento"
                  value={datanascimento}
                  className="form-control"
                  onChange={(e) => setDatanascimento(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Telefone - 1: *" htmlFor="inputTelefone1">
                <input
                  type="text"
                  id="inputTelefone1"
                  value={telefone1}
                  className="form-control"
                  onChange={(e) => setTelefone1(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Telefone - 2: *" htmlFor="inputTelefone1">
                <input
                  type="text"
                  id="inputTelefone2"
                  value={telefone2}
                  className="form-control"
                  onChange={(e) => setTelefone2(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Email - 1: *" htmlFor="inputEmail1">
                <input
                  type="email"
                  id="inputEmail1"
                  value={email1}
                  className="form-control"
                  onChange={(e) => setEmail1(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Email - 2: *" htmlFor="inputEmail2">
                <input
                  type="email"
                  id="inputEmail2"
                  value={email2}
                  className="form-control"
                  onChange={(e) => setEmail2(e.target.value)}
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

export default CadastroCliente;
