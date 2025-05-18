import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CadastroVeiculoUsado from "./cadastro-veiculo-usado";

import Stack from "@mui/material/Stack";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";

import { mensagemSucesso, mensagemErro } from "../../components/toastr";

import axios from "axios";
import { BASE_URL } from "../../config/axios";
import CadastroVeiculoCarro from "./cadastro-veiculo-carro";
import CadastroVeiculoMoto from "./cadastro-veiculo-moto";

const baseURL = `${BASE_URL}/veiculos`;
const modelosURL = `${BASE_URL}/modelos`;
const concessionariasURL = `${BASE_URL}/concessionarias`;

function CadastroVeiculo() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [chassi, setChassi] = useState("");
  const [modelo, setModelo] = useState("");
  const [precoAtual, setPrecoAtual] = useState("");
  const [cor, setCor] = useState("");
  const [razaoSocialConcessionaria, setConcessionaria] = useState("");
  const [condicao, setCondicao] = useState("");
  const [tipo, setTipo] = useState("");
  const [garantia, setGarantia] = useState("");


  //para veiculos usados
  const [quilometragem, setQuilometragem] = useState("");
  const [documentacao, setDocumentacao] = useState("");
  const [sinistro, setSinistro] = useState("");
  const [laudoVistoria, setLaudoVistoria] = useState("");
  const [manutencao, setManutencao] = useState("");
  const [nomeProprietario, setNomeProprietario] = useState("");
  const [emailProprietario, setEmailProprietario] = useState("");
  const [telefoneProprietario, setTelefoneProprietario] = useState("");


  //para carros
  const [potencia, setPotencia] = useState("");
  const [categoriaCarro, setCategoriaCarro] = useState("");
  const [tipoMotorCarro, setTipoMotorCarro] = useState("");
  const [transmissaoCarro, setTransmissaoCarro] = useState("");

  //para motos
  const [categoriaMoto, setCategoriaMoto] = useState("");
  const [tipoMotorMoto, setTipoMotorMoto] = useState("");
  const [qtdMarcha, setQtdMarcha] = useState("");
  const [cilindrada, setCilindrada] = useState("");
  const [tipoPartidaMoto, setTipoPartidaMoto] = useState("");

  const [dados, setDados] = useState(null);
  const [modelos, setModelos] = useState([]);
  const [concessionarias, setConcessionarias] = useState([]);

  async function carregarModelos() {
    try {
      const response = await axios.get(`${modelosURL}`);
      setModelos(response.data);
    } catch (error) {
      console.error("Erro ao carregar modelos:", error);
    }
  }

  async function carregarConcessionarias() {
    try {
      const response = await axios.get(`${concessionariasURL}`);
      setConcessionarias(response.data);
    } catch (error) {
      console.error("Erro ao carregar concessionárias:", error);
    }
  }

  function inicializar() {
    setId("");
    setChassi("");
    setModelo("");
    setPrecoAtual("");
    setCor("");
    setConcessionaria("");
    setCondicao("");
    setGarantia("");
    setQuilometragem("");
    setDocumentacao("");
    setSinistro("");
    setLaudoVistoria("");
    setManutencao("");
    setNomeProprietario("");
    setEmailProprietario("");
    setTelefoneProprietario("");

    //moto
    setCilindrada("");
    setCategoriaMoto("");
    setQtdMarcha("");
    setTipoPartidaMoto("");
    setTipoMotorMoto("");

    //carro
    setCategoriaCarro("");
    setTransmissaoCarro("");
    setPotencia("");
    setTipoMotorCarro("");
  }

  async function salvar() {
    const data = {
      id,
      chassi,
      modelo,
      precoAtual,
      cor,
      razaoSocialConcessionaria,
      condicao,
      tipo,
      garantia,
      ...(condicao === "Usado" && {
        quilometragem,
        documentacao,
        sinistro,
        manutencao,
        laudoVistoria,
        nomeProprietario,
        emailProprietario,
        telefoneProprietario
      }),
      ...(tipo === "Carro"
        ? {
          categoriaCarro,
          potencia,
          tipoMotorCarro,
          transmissaoCarro
        }
        : {
          categoriaCarro: null, // Removendo atributos de Carro se for Moto
          potencia: null,
          tipoMotorCarro: null,
          transmissaoCarro: null
        }),
      ...(tipo === "Moto"
        ? {
          categoriaMoto,
          cilindrada,
          tipoMotorMoto,
          qtdMarcha,
          tipoPartidaMoto
        }
        : {
          categoriaMoto: null, // Removendo atributos de Moto se for Carro
          cilindrada: null,
          tipoMotorMoto: null,
          qtdMarcha: null,
          tipoPartidaMoto: null
        })
    };

    try {
      if (!idParam) {
        await axios.post(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" }
        });
        mensagemSucesso(`Veículo ${modelo} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" }
        });
        mensagemSucesso(`Veículo ${modelo} alterado com sucesso!`);
      }
      navigate("/listagem-veiculo");
    } catch (error) {
      mensagemErro(error.response?.data || "Erro ao salvar veículo.");
    }
  }


  function cancelar() {
    navigate(`/listagem-veiculo/`);
  }

  async function buscar() {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const veiculo = response.data;
        setId(veiculo.id);
        setChassi(veiculo.chassi);
        setModelo(veiculo.modelo);
        setPrecoAtual(veiculo.precoAtual);
        setCor(veiculo.cor);
        setConcessionaria(veiculo.razaoSocialConcessionaria);
        setCondicao(veiculo.condicao);
        setTipo(veiculo.tipo);
        setGarantia(veiculo.garantia);

        setQuilometragem(veiculo.quilometragem);
        setDocumentacao(veiculo.documentacao);
        setSinistro(veiculo.sinistro);
        setManutencao(veiculo.manutencao);
        setLaudoVistoria(veiculo.laudoVistoria);
        setNomeProprietario(veiculo.nomeProprietario);
        setEmailProprietario(veiculo.emailProprietario);
        setTelefoneProprietario(veiculo.telefoneProprietario);

        //para motos e carros
        setPotencia(veiculo.potencia);
        setCilindrada(veiculo.cilindrada);
        setCategoriaCarro(veiculo.categoriaCarro);
        setCategoriaMoto(veiculo.categoriaMoto);
        setTransmissaoCarro(veiculo.transmissaoCarro);
        setTipoPartidaMoto(veiculo.tipoPartidaMoto);
        setTipoMotorCarro(veiculo.tipoMotorCarro);
        setTipoMotorMoto(veiculo.tipoMotorMoto);
        setQtdMarcha(veiculo.qtdMarcha);

        setDados(veiculo);
      } catch (error) {
        mensagemErro("Erro ao carregar os dados do veículo.");
      }
    } else {
      inicializar();
    }
  }

  useEffect(() => {
    carregarModelos();
    carregarConcessionarias();
    buscar();
  }, [idParam]);

  return (
    <div className="container">
      <Card title="Cadastro de Veículo">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <div className="bs-component">
              <FormGroup label="Chassi: *" htmlFor="inputVin">
                <input
                  type="text"
                  id="inputVin"
                  value={chassi}
                  className="form-control"
                  onChange={(e) => setChassi(e.target.value)}
                />
              </FormGroup>
              <br />

              <FormGroup label="Foto: " htmlFor="inputFoto">
                <input
                  type="file"
                  id="inputFoto"
                  className="form-control"
                />
              </FormGroup>
              <br />
              <FormGroup label="Modelo: *" htmlFor="inputModelo">
                <select
                  id="inputModelo"
                  value={modelo}
                  className="form-control"
                  onChange={(e) => setModelo(e.target.value)}
                >
                  <option value="">Selecione um modelo</option>
                  {modelos.map((m) => (
                    <option key={m.id} value={m.nome}>
                      {m.nome}
                    </option>
                  ))}
                </select>
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
                    <option key={m.id} value={m.razaoSocialConcessionaria}>
                      {m.razaoSocial}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <br />
              <FormGroup label="Preço Atual: *" htmlFor="inputPrecoAtual">
                <input
                  type="number"
                  id="inputPrecoAtual"
                  value={precoAtual}
                  className="form-control"
                  onChange={(e) => setPrecoAtual(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Cor: *" htmlFor="inputCor">
                <input
                  type="text"
                  id="inputCor"
                  value={cor}
                  className="form-control"
                  onChange={(e) => setCor(e.target.value)}
                />
              </FormGroup>
              <br />

              <FormGroup label="Garantia: *" htmlFor="inputGarantia">
                <input
                  type="text"
                  id="inputGarantia"
                  value={garantia}
                  className="form-control"
                  onChange={(e) => setGarantia(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Condição: *" htmlFor="inputTipo">
                <div>
                  <label>
                    <input
                      type="radio"
                      value="Novo"
                      checked={condicao === "Novo"}
                      onChange={() => setCondicao("Novo")}
                    />
                    Novo
                  </label>
                  <label style={{ marginLeft: "20px" }}>
                    <input
                      type="radio"
                      value="Usado"
                      checked={condicao === "Usado"}
                      onChange={() => setCondicao("Usado")}
                    />
                    Usado
                  </label>
                </div>
              </FormGroup>
              <br />
              {condicao === "Usado" && (
                <CadastroVeiculoUsado
                  quilometragem={quilometragem}
                  setQuilometragem={setQuilometragem}
                  documentacao={documentacao}
                  setDocumentacao={setDocumentacao}
                  sinistro={sinistro}
                  setSinistro={setSinistro}
                  laudoVistoria={laudoVistoria}
                  setLaudoVistoria={setLaudoVistoria}
                  manutencao={manutencao}
                  setManutencao={setManutencao}
                  nomeProprietario={nomeProprietario}
                  setNomeProprietario={setNomeProprietario}
                  telefoneProprietario={telefoneProprietario}
                  setTelefoneProprietario={setTelefoneProprietario}
                  emailProprietario={emailProprietario}
                  setEmailProprietario={setEmailProprietario}
                />
              )}
              <br />
              <FormGroup label="Tipo: *" htmlFor="inputTipo">
                <div>
                  <label>
                    <input
                      type="radio"
                      value="Carro"
                      checked={tipo === "Carro"}
                      onChange={() => setTipo("Carro")}
                    />
                    Carro
                  </label>
                  <label style={{ marginLeft: "20px" }}>
                    <input
                      type="radio"
                      value="Moto"
                      checked={tipo === "Moto"}
                      onChange={() => setTipo("Moto")}
                    />
                    Moto
                  </label>
                </div>
              </FormGroup>
              <br />
              {tipo === "Carro" && (
                <CadastroVeiculoCarro
                  potencia={potencia}
                  setPotencia={setPotencia}
                  categoriaCarro={categoriaCarro}
                  setCategoriaCarro={setCategoriaCarro}
                  transmissaoCarro={transmissaoCarro}
                  setTransmissaoCarro={setTransmissaoCarro}
                  tipoMotorCarro={tipoMotorCarro}
                  setTipoMotorCarro={setTipoMotorCarro}
                />
              )}
              <br />
              {tipo === "Moto" && (
                <CadastroVeiculoMoto
                  cilindrada={cilindrada}
                  setCilindrada={setCilindrada}
                  categoriaMoto={categoriaMoto}
                  setCategoriaMoto={setCategoriaMoto}
                  tipoPartidaMoto={tipoPartidaMoto}
                  setTipoPartidaMoto={setTipoPartidaMoto}
                  tipoMotorMoto={tipoMotorMoto}
                  setTipoMotorMoto={setTipoMotorMoto}
                  qtdMarcha={qtdMarcha}
                  setQtdMarcha={setQtdMarcha}
                />
              )}
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

export default CadastroVeiculo;
