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
const modelosURL = `${BASE_URL}/modelos`; // Endpoint para buscar as marcas
const fabricantesURL = `${BASE_URL}/fabricantes`;
const concessionariasURL = `${BASE_URL}/concessionarias`;

function CadastroVeiculo() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [chassi, setChassi] = useState("");
  const [modelo, setModelo] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [precoAtual, setPrecoAtual] = useState("");
  const [cor, setCor] = useState("");
  const [razaoSocialConcessionaria, setConcessionaria] = useState("");
  const [condicao, setCondicao] = useState("");
  const [tipo, setTipo] = useState("");
  const [vendido, setVendido] = useState("");
  const [garantia, setGarantia] = useState("");


  //para veiculos usados
  const [quilometragem, setQuilometragem] = useState("");
  const [documentacao, setDocumentacao] = useState("");
  const [sinistro, setSinistro] = useState("");
  const [laudoVistoria, setLaudoVistoria] = useState("");
  const [manutencao, setManutencao] = useState("");
  

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
  const [transmissaoMoto, setTransmissaoMoto] = useState("");
  
  

  const [dados, setDados] = useState(null);
  const [modelos, setModelos] = useState([]);
  const [fabricantes, setFabricantes] = useState([]);
  const [concessionarias, setConcessionarias] = useState([]);

  // Função para buscar modelos disponíveis no servidor
  async function carregarModelos() {
    try {
      const response = await axios.get(`${modelosURL}`);
      setModelos(response.data);
    } catch (error) {
      console.error("Erro ao carregar modelos:", error);
    }
  }

  async function carregarFabricantes() {
    try {
      const response = await axios.get(`${fabricantesURL}`);
      setFabricantes(response.data);
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
    setFabricante("");
    setPrecoAtual("");
    setCor("");
    setConcessionaria("");
    setCondicao("");
    setVendido("");
    setGarantia("");
    setQuilometragem("");
    setDocumentacao("");
    setSinistro("");
    setLaudoVistoria("");
    setManutencao("");
    

    //moto
    setCilindrada("");
    setCategoriaMoto("");
    setQtdMarcha("");
    setTransmissaoMoto("");
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
      fabricante,
      precoAtual,
      cor,
      razaoSocialConcessionaria,
      condicao,
      tipo,
      vendido,
      garantia,
      ...(condicao === "Usado" && {
        quilometragem,
        documentacao,
        sinistro,
        manutencao,
        laudoVistoria
      }),
      ...(tipo === "Carro" && {
        categoriaCarro,
        potencia,
        tipoMotorCarro,
        transmissaoCarro,
        
      }),
      ...(tipo === "Moto" && {
        categoriaMoto,
        cilindrada,
        tipoMotorMoto,
        qtdMarcha,
        transmissaoMoto
      })
    };

    try {
      if (!idParam) {
        await axios.post(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Veículo ${modelo} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Veículo ${modelo} alterado com sucesso!`);
      }
      navigate("/listagem-veiculo");
    } catch (error) {
      mensagemErro(error.response?.data || "Erro ao salvar veículo.");
    }
  }

  async function buscar() {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const veiculo = response.data;
        setId(veiculo.id);
        setChassi(veiculo.chassi);
        setModelo(veiculo.modelo);
        setFabricante(veiculo.fabricante);
        setPrecoAtual(veiculo.precoAtual);
        setCor(veiculo.cor);
        setConcessionaria(veiculo.razaoSocialConcessionaria);
        setCondicao(veiculo.condicao);
        setTipo(veiculo.tipo);
        setVendido(veiculo.vendido);
        setGarantia(veiculo.garantia);

        setQuilometragem(veiculo.quilometragem);
        setDocumentacao(veiculo.documentacao);
        setSinistro(veiculo.sinistro);
        setManutencao(veiculo.manutencao);
        setLaudoVistoria(veiculo.laudoVistoria);

        //para motos e carros
        setPotencia(veiculo.potencia);
        setCilindrada(veiculo.cilindrada);
        setCategoriaCarro(veiculo.categoriaCarro);
        setCategoriaMoto(veiculo.categoriaMoto);
        setTransmissaoCarro(veiculo.transmissaoCarro);
        setTransmissaoMoto(veiculo.transmissaoMoto);
        setTipoMotorCarro(veiculo.tipoMotorCarro);
        setTipoMotorMoto(veiculo.tipoMotorMoto);
        setCategoriaMoto(veiculo.tipoMotorMoto);
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
    carregarFabricantes();
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
              
              <FormGroup label="Foto: *" htmlFor="inputFoto">
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
              <FormGroup label="Fabricante: *" htmlFor="inputFabricante">
                <select
                  id="inputFabricante"
                  value={fabricante}
                  className="form-control"
                  onChange={(e) => setFabricante(e.target.value)}
                >
                  <option value="">Selecione uma fabricante</option>
                  {fabricantes.map((m) => (
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
              <FormGroup label="Vendido: *" htmlFor="inputVendido">
                <input
                  type="text"
                  id="inputVendido"
                  value={vendido}
                  className="form-control"
                  onChange={(e) => setVendido(e.target.value)}
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
                transmissaoMoto={transmissaoMoto}
                setTransmissaoMoto={setTransmissaoMoto}
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
