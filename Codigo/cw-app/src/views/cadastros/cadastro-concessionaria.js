import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import { mensagemSucesso, mensagemErro } from "../../components/toastr";
import axios from "axios";
import { BASE_URL } from "../../config/axios";

const baseURL = `${BASE_URL}/concessionarias`;
const empresasURL = `${BASE_URL}/empresas`;

function CadastroConcessionaria() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone1, setTelefone1] = useState("");
  const [telefone2, setTelefone2] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [uf, setUf] = useState("");
  const [complemento, setComplemento] = useState("");
  const [empresaId, setEmpresaId] = useState("");
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    axios.get(empresasURL)
      .then(response => {
        setEmpresas(response.data);
      })
      .catch(error => {
        mensagemErro('Erro ao carregar a lista de empresas matriz.');
      });
  }, []);

  function inicializar() {
    setId("");
    setRazaoSocial("");
    setCnpj("");
    setTelefone1("");
    setTelefone2("");
    setEmail1("");
    setEmail2("");
    setLogradouro("");
    setNumero("");
    setBairro("");
    setCep("");
    setUf("");
    setComplemento("");
    setEmpresaId("");
  }

  async function salvar() {
    if (!empresaId) {
      mensagemErro("O campo Empresa Matriz é obrigatório.");
      return;
    }
    
    const data = {
      razaoSocial,
      cnpj,
      telefone1,
      telefone2,
      email1,
      email2,
      logradouro,
      numero,
      bairro,
      cep,
      uf,
      complemento,
      empresaId,
    };

    try {
      if (!idParam) {
        await axios.post(baseURL, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Concessionária ${razaoSocial} cadastrada com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Concessionária ${razaoSocial} alterada com sucesso!`);
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
        setTelefone1(concessionaria.telefone1);
        setTelefone2(concessionaria.telefone2);
        setEmail1(concessionaria.email1);
        setEmail2(concessionaria.email2);
        setLogradouro(concessionaria.logradouro);
        setNumero(concessionaria.numero);
        setBairro(concessionaria.bairro);
        setCep(concessionaria.cep);
        setUf(concessionaria.uf);
        setComplemento(concessionaria.complemento);
        setEmpresaId(concessionaria.empresaId);
      } catch (error) {
        mensagemErro("Erro ao carregar os dados da concessionária.");
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
      <Card title="Cadastro de Concessionária">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <div className="bs-component">
              <FormGroup label="Razão Social: *" htmlFor="inputRazaoSocial">
                <input type="text" id="inputRazaoSocial" value={razaoSocial} className="form-control" onChange={(e) => setRazaoSocial(e.target.value)} />
              </FormGroup>
              <br />
              <FormGroup label="CNPJ: *" htmlFor="inputCnpj">
                <input type="text" id="inputCnpj" value={cnpj} className="form-control" onChange={(e) => setCnpj(e.target.value)} />
              </FormGroup>
              <br />
              <FormGroup label="Empresa Matriz: *" htmlFor="selectEmpresa">
                <select
                  className="form-control"
                  id="selectEmpresa"
                  value={empresaId}
                  onChange={(e) => setEmpresaId(e.target.value)}
                >
                  <option value="">Selecione uma empresa</option>
                  {empresas.map((empresa) => (
                    <option key={empresa.id} value={empresa.id}>
                      {empresa.razaoSocial}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <br />
              <FormGroup label="Telefone - 1: *" htmlFor="inputTelefone1">
                <input type="text" id="inputTelefone1" value={telefone1} className="form-control" onChange={(e) => setTelefone1(e.target.value)} />
              </FormGroup>
              <br />
              <FormGroup label="Telefone - 2: *" htmlFor="inputTelefone1">
                <input type="text" id="inputTelefone2" value={telefone2} className="form-control" onChange={(e) => setTelefone2(e.target.value)} />
              </FormGroup>
              <br />
              <FormGroup label="Email - 1: *" htmlFor="inputEmail1">
                <input type="email" id="inputEmail1" value={email1} className="form-control" onChange={(e) => setEmail1(e.target.value)} />
              </FormGroup>
              <br />
              <FormGroup label="Email - 2: *" htmlFor="inputEmail2">
                <input type="email" id="inputEmail2" value={email2} className="form-control" onChange={(e) => setEmail2(e.target.value)} />
              </FormGroup>
              <br />
              <FormGroup label="Logradouro: *" htmlFor="inputLogradouro">
                <input type="text" id="inputLogradouro" value={logradouro} className="form-control" onChange={(e) => setLogradouro(e.target.value)} />
              </FormGroup>
              <br />
              <FormGroup label="Número: *" htmlFor="inputNumero">
                <input type="text" id="inputNumero" value={numero} className="form-control" onChange={(e) => setNumero(e.target.value)} />
              </FormGroup>
              <br />
              <FormGroup label="Complemento:" htmlFor="inputComplemento">
                <input type="text" id="inputComplemento" value={complemento} className="form-control" onChange={(e) => setComplemento(e.target.value)} />
              </FormGroup>
              <br />
              <FormGroup label="Bairro: *" htmlFor="inputBairro">
                <input type="text" id="inputBairro" value={bairro} className="form-control" onChange={(e) => setBairro(e.target.value)} />
              </FormGroup>
              <br />
              <FormGroup label="CEP: *" htmlFor="inputCep">
                <input type="text" id="inputCep" value={cep} className="form-control" onChange={(e) => setCep(e.target.value)} />
              </FormGroup>
              <br />
              <FormGroup label="UF: *" htmlFor="inputUf">
                <input type="text" id="inputUf" value={uf} className="form-control" onChange={(e) => setUf(e.target.value)} />
              </FormGroup>
              <br />
              <Stack spacing={1} padding={1} direction="row">
                <button onClick={salvar} type="button" className="btn btn-success">
                  Salvar
                </button>
                <button onClick={inicializar} type="button" className="btn btn-danger">
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