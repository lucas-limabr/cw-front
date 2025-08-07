import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";

import { mensagemSucesso, mensagemErro } from "../../components/toastr";

import axios from "axios";
import { BASE_URL } from "../../config/axios";

const baseURL = `${BASE_URL}/gestores`;
const concessionariasURL = `${BASE_URL}/concessionarias`;

function CadastroGestor() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
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
  const [razaoSocialConcessionaria, setConcessionaria] = useState("");
  const [cargo, setCargo] = useState("");

  const [dados, setDados] = useState(null);
  const [concessionarias, setConcessionarias] = useState([]);

  async function carregarConcessionarias() {
    try {
      const response = await axios.get(`${concessionariasURL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setConcessionarias(response.data);
    } catch (error) {
      console.error("Erro ao carregar concessionárias:", error);
    }
  }

  function inicializar() {
    setId("");
    setNome("");
    setCpf("");
    setLogin("");
    setSenha("");
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
    setCargo("");
    setConcessionaria("");
  }

  async function salvar() {
    const data = {
      id,
      nome,
      cpf,
      login,
      senha,
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
      cargo,
      razaoSocialConcessionaria,
    };

    try {
      if (!idParam) {
        await axios.post(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Gestor ${nome} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: {     "Content-Type": "application/json",     Authorization: `Bearer ${token}`   },
        });
        mensagemSucesso(`Gestor ${nome} alterado com sucesso!`);
      }
      navigate("/listagem-gestor");
    } catch (error) {
      mensagemErro(error.response?.data || "Erro ao salvar gestor.");
    }
  }

  const token = localStorage.getItem("token");

  async function buscar() {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const gestor = response.data;
        setId(gestor.id);
        setNome(gestor.nome);
        setCpf(gestor.cpf);
        setLogin(gestor.login);
        setSenha(gestor.senha);
        setTelefone1(gestor.telefone1);
        setTelefone2(gestor.telefone2);
        setEmail1(gestor.email1);
        setEmail2(gestor.email2);
        setLogradouro(gestor.logradouro);
        setNumero(gestor.numero);
        setComplemento(gestor.complemento);
        setBairro(gestor.bairro);
        setCep(gestor.cep);
        setUf(gestor.uf);
        setCargo("Gestor");
        setConcessionaria(gestor.razaoSocialConcessionaria);
        setDados(gestor);
      } catch (error) {
        mensagemErro("Erro ao carregar os dados do gestor.");
      }
    } else {
      inicializar();
    }
  }

  useEffect(() => {
    carregarConcessionarias();
    buscar();
  }, [idParam]);

  return (
    <div className="container">
      <Card title="Cadastro de Gestor">
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
              <FormGroup label="CEP *" htmlFor="inputCep">
                <input
                  type="text"
                  id="inputCep"
                  value={cep}
                  className="form-control"
                  onChange={(e) => setCep(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="UF *" htmlFor="inputUf">
                <input
                  type="text"
                  id="inputUf"
                  value={uf}
                  className="form-control"
                  onChange={(e) => setUf(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Concessionária: *" htmlFor="inputConcessionaria">
                <select
                  id="inputConcessionaria"
                  value={razaoSocialConcessionaria}
                  className="form-control"
                  onChange={(e) => setConcessionaria(e.target.value)}
                >
                  <option value="">Selecione uma concessionária</option>
                  {concessionarias.map((m) => (
                    <option key={m.id} value={m.razaoSocial}>
                      {m.razaoSocial}
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

export default CadastroGestor;
