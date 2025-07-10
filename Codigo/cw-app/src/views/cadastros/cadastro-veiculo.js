import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CadastroVeiculoUsado from "./cadastro-veiculo-usado";
import CurrencyInput from "react-currency-input-field";
import '../../App.css';

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
  const [precoAtual, setPrecoAtual] = useState("");
  const [cor, setCor] = useState("");
  const [concessionariaId, setConcessionariaId] = useState("");
  const [condicao, setCondicao] = useState("");
  const [tipo, setTipo] = useState("");
  const [garantia, setGarantia] = useState("");

  const [acessorios, setAcessorios] = useState([]);


  //atributos de modelo
  const [anoFabricacao, setAnoFabricacao] = useState("");
  const [modeloId, setModelo] = useState("");
  const [precoBase, setPrecoBase] = useState("");
  const [fotoModelo, setFotoModelo] = useState(null);
  const [qtdEstoqueVenda, setQtdEstoqueVenda] = useState("");
  const [permiteTestDrive, setPermiteTestDrive] = useState(false);
  const [qtdEstoque, setQtdEstoque] = useState("");

  //para veiculos usados
  const [quilometragem, setQuilometragem] = useState("");
  const [documentacao, setDocumentacao] = useState("");
  const [sinistroAcidente, setSinistroAcidente] = useState("");
  const [laudoVistoria, setLaudoVistoria] = useState("");
  const [manutencao, setManutencao] = useState("");
  const [dataUltimaRevisao, setDataUltimaRevisao] = useState("");
  const [contatoProprietario, setContatoProprietario] = useState("");

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

  const [dados, setDados] = useState("");
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
    setAnoFabricacao("");
    setPrecoAtual("");
    setPrecoBase("");
    setQtdEstoque("");
    setQtdEstoqueVenda("");
    setPermiteTestDrive(false);
    setCor("");
    setConcessionariaId("");
    setCondicao("");
    setFotoModelo(null);
    setGarantia("");
    setQuilometragem("");
    setDocumentacao("");
    setSinistroAcidente("");
    setLaudoVistoria("");
    setManutencao("");
    setDataUltimaRevisao("");
    setContatoProprietario("");
   
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

    // Converte "1234,56" para "1234.56"
    const precoAtualNumerico = parseFloat(precoAtual.replace(',', '.'));
    const precoBaseNumerico = parseFloat(precoBase.replace(',', '.'));

    const data = {
      id,
      chassi,
      precoAtual: precoAtualNumerico, // envia como número para o backend
      cor,
      condicao,
      concessionariaId: concessionariaId === "" ? null : parseInt(concessionariaId),
      garantia,
      modeloVeiculo: {
        precoBase: precoBaseNumerico,
        qtdEstoque: qtdEstoque === "" ? null : parseInt(qtdEstoque),
        qtdEstoqueVenda: qtdEstoqueVenda === "" ? null : parseInt(qtdEstoqueVenda),
        fotoModelo,
        modeloId: modeloId === "" ? null : Number(qtdEstoque),
        anoFabricacao,
        permiteTestDrive,
        tipoVeiculo: {
          tipo,
          ...(tipo === "Carro" &&
          {
            carro: {
              categoria: categoriaCarro,
              potencia: potencia === "" ? null : parseFloat(potencia),
              motorizacao: tipoMotorCarro,
              transmissao: transmissaoCarro
            },
            moto: null
          }),
          ...(tipo === "Moto"
            && {
            moto: {
              categoria: categoriaMoto,
              cilindrada: cilindrada === "" ? null : parseFloat(cilindrada),
              tipoMotor: tipoMotorMoto,
              qtdMarcha: qtdMarcha === "" ? null : parseInt(qtdMarcha),
              tipoPartida: tipoPartidaMoto
            },
            carro: null
          })
        }
      },
      ...(condicao === "Usado"
        ? {
          veiculoUsado: {
            quilometragem: quilometragem === "" ? null : parseFloat(quilometragem),
            documentacao: documentacao,
            sinistroAcidente: sinistroAcidente,
            manutencao: manutencao,
            laudoVistoria: laudoVistoria,
            dataUltimaRevisao: dataUltimaRevisao,
            contatoProprietario: contatoProprietario
          }
        }
        : {
          veiculoUsado: null
        }
      )
    };

    try {
      if (!idParam) {
        await axios.post(`${baseURL}`, data, {
          headers: { "Content-Type": "application/json" }
        });
        mensagemSucesso(`Veículo de chassi ${data.chassi} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" }
        });
        mensagemSucesso(`Veículo de chassi ${data.chassi} alterado com sucesso!`);
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
        setConcessionariaId(veiculo.concessionariaId);
        setPrecoAtual(veiculo.precoAtual);
        setCor(veiculo.cor);
        setGarantia(veiculo.garantia);
        setCondicao(veiculo.condicao);

        if (veiculo.condicao == "Usado") {
          setQuilometragem(veiculo.veiculoUsado.quilometragem);
          setDocumentacao(veiculo.veiculoUsado.documentacao);
          setSinistroAcidente(veiculo.veiculoUsado.sinistroAcidente);
          setManutencao(veiculo.veiculoUsado.manutencao);
          setLaudoVistoria(veiculo.veiculoUsado.laudoVistoria);
          setDataUltimaRevisao(veiculo.veiculoUsado.dataUltimaRevisao);
          setContatoProprietario(veiculo.veiculoUsado.contatoProprietario);
        }

        setAnoFabricacao(veiculo.modeloVeiculo.anoFabricacao);
        setPrecoBase(veiculo.modeloVeiculo.precoBase);
        setFotoModelo(veiculo.modeloVeiculo.fotoModelo);
        setQtdEstoqueVenda(veiculo.modeloVeiculo.qtdEstoqueVenda)
        setQtdEstoque(veiculo.modeloVeiculo.qtdEstoque);
        setPermiteTestDrive(veiculo.modeloVeiculo.permiteTestDrive);
        setModelo(veiculo.modeloVeiculo.modeloId);

        setTipo(veiculo.modeloVeiculo.tipoVeiculo.tipo);

        if (veiculo.modeloVeiculo.tipoVeiculo.tipo == "Carro") {
          setPotencia(veiculo.modeloVeiculo.tipoVeiculo.carro.potencia);
          setCategoriaCarro(veiculo.modeloVeiculo.tipoVeiculo.carro.categoria);
          setTransmissaoCarro(veiculo.categoria.transmissao);
          setTipoMotorCarro(veiculo.modeloVeiculo.tipoVeiculo.carro.motorizacao);
        }
        else if (veiculo.modeloVeiculo.tipoVeiculo.tipo == "Moto") {
          setTipoMotorMoto(veiculo.modeloVeiculo.tipoVeiculo.moto.tipoMotor);
          setCilindrada(veiculo.modeloVeiculo.tipoVeiculo.moto.cilindrada);
          setQtdMarcha(veiculo.modeloVeiculo.tipoVeiculo.moto.qtdMarcha);
          setTipoPartidaMoto(veiculo.modeloVeiculo.tipoVeiculo.moto.tipoPartida);
          setCategoriaMoto(veiculo.modeloVeiculo.tipoVeiculo.moto.categoria);
        }

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
              <FormGroup label="Chassi: *" htmlFor="inputChassi">
                <input
                  type="text"
                  id="inputChassi"
                  value={chassi}
                  className="form-control"
                  onChange={(e) => setChassi(e.target.value)}
                />
              </FormGroup>
              <br />
              {/* <FormGroup label="Foto: " htmlFor="inputFoto">
                <input
                  type="file"
                  id="inputFoto"
                  className="form-control"
                  onChange={(e) => setFotoModelo(e.target.files[0])}
                />
              </FormGroup>

              <br /> */}
              <FormGroup label="Modelo: *" htmlFor="inputModelo">
                <select
                  id="inputModelo"
                  value={modeloId}
                  className="form-control"
                  onChange={(e) => setModelo(e.target.value)}
                >
                  <option value="">Selecione um modelo</option>
                  {modelos.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <br />
              <FormGroup label="Concessionária: *" htmlFor="inputConcessionaria">
                <select
                  id="inputConcessionaria"
                  value={concessionariaId}
                  className="form-control"
                  onChange={(e) => setConcessionariaId(e.target.value)}
                >
                  <option value="">Selecione uma concessionária</option>
                  {concessionarias.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.razaoSocial}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <br />
              <FormGroup label="Ano de fabricação: *" htmlFor="inputAnoFabricacao">
                <input
                  type="text"
                  id="inputAnoFabricacao"
                  value={anoFabricacao}
                  className="form-control"
                  onChange={(e) => setAnoFabricacao(e.target.value)}
                />
              </FormGroup>
              <br />
              <FormGroup label="Preço Base: *" htmlFor="inputPrecoBase">
                <CurrencyInput
                  id="inputPrecoBase"
                  name="precoBase"
                  placeholder="Digite o preço base"
                  decimalsLimit={2}
                  decimalSeparator=","
                  groupSeparator="."
                  prefix="R$ "
                  onValueChange={(value) => setPrecoBase(value)}
                  className="currency-input"
                />
              </FormGroup>
              <br />
              <FormGroup label="Preço Atual: *" htmlFor="inputPrecoAtual">
                <CurrencyInput
                  id="precoAtual"
                  name="precoAtual"
                  placeholder="Digite o preço atual"
                  decimalsLimit={2}
                  decimalSeparator=","
                  groupSeparator="."
                  prefix="R$ "
                  onValueChange={(value) => setPrecoAtual(value)} // value é string ou null
                  className="currency-input"
                />
                <br />
              </FormGroup>
              <br />
              <FormGroup label="Permite test-drive? *" htmlFor="inputPermiteTestDrive">
                <div>
                  <label>
                    <input
                      id="inputPermiteTestDrive"
                      type="radio"
                      value="Sim"
                      checked={permiteTestDrive === "Sim"}
                      onChange={() => setPermiteTestDrive("Sim")}
                    />
                    Sim
                  </label>
                  <label style={{ marginLeft: "20px" }}>
                    <input
                      id="inputPermiteTestDrive"
                      type="radio"
                      value="Não"
                      checked={permiteTestDrive === "Não"}
                      onChange={() => setPermiteTestDrive("Não")}
                    />
                    Não
                  </label>
                </div>
              </FormGroup>
              <br />
              <FormGroup label="Quantidade em estoque: " htmlFor="quantidadeEstoque">
                <input
                  id="quantidadeEstoque"
                  name="quantidadeEstoque"
                  type="number"
                  value={qtdEstoque}
                  onChange={(e) => { setQtdEstoque(e.target.value) }}
                  className="currency-input"
                />
              </FormGroup>
              <br />
              <FormGroup label="Defina a quantidade mínima em estoque que quando atingida permitirá somente a venda do veículo e inativará o test-drive: " htmlFor="qtdEstoqueVenda">
                <input
                  id="qtdEstoqueVenda"
                  name="qtdEstoqueVenda"
                  type="number"
                  value={qtdEstoqueVenda}
                  onChange={(e) => { setQtdEstoque(e.target.value) }}
                  className="currency-input"
                />
              </FormGroup>
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
              <FormGroup label="Condição: *" htmlFor="inputCondicao">
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
                  sinistroAcidente={sinistroAcidente}
                  setSinistroAcidente={setSinistroAcidente}
                  laudoVistoria={laudoVistoria}
                  setLaudoVistoria={setLaudoVistoria}
                  manutencao={manutencao}
                  setManutencao={setManutencao}
                  dataUltimaRevisao={dataUltimaRevisao}
                  setDataUltimaRevisao={setDataUltimaRevisao}
                  contatoProprietario={contatoProprietario}
                  setContatoProprietario={setContatoProprietario}
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
