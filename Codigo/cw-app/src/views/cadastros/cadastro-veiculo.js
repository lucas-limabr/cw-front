import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CadastroVeiculoUsado from "./cadastro-veiculo-usado";
import CurrencyInput from "react-currency-input-field";
import '../../App.css';

import Stack from "@mui/material/Stack";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SeletorItens from "../../components/SeletorItens";

import { mensagemSucesso, mensagemErro } from "../../components/toastr";

import axios from "axios";
import { BASE_URL } from "../../config/axios";
import CadastroVeiculoCarro from "./cadastro-veiculo-carro";
import CadastroVeiculoMoto from "./cadastro-veiculo-moto";

const baseURL = `${BASE_URL}/veiculos`;
const modelosURL = `${BASE_URL}/modelos`;
const acessoriosURL = `${BASE_URL}/acessorios`;
const concessionariasURL = `${BASE_URL}/concessionarias`;

function CadastroVeiculo() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [chassi, setChassi] = useState("");
  const [precoAtual, setPrecoAtual] = useState("");
  const [cor, setCor] = useState("");
  const [concessionariaId, setConcessionariaId] = useState("");
  const [condicao, setCondicao] = useState("");
  const [tipo, setTipo] = useState("");
  const [garantia, setGarantia] = useState("");
  const [acessoriosIds, setAcessoriosIds] = useState([]);

  const [anoFabricacao, setAnoFabricacao] = useState("");
  const [modeloId, setModeloId] = useState("");
  const [precoBase, setPrecoBase] = useState("");
  const [fotoModelo, setFotoModelo] = useState(null);
  const [qtdEstoqueVenda, setQtdEstoqueVenda] = useState("");
  const [permiteTestDrive, setPermiteTestDrive] = useState(false);
  const [qtdEstoque, setQtdEstoque] = useState("");

  const [quilometragem, setQuilometragem] = useState("");
  const [documentacao, setDocumentacao] = useState("");
  const [sinistroAcidente, setSinistroAcidente] = useState("");
  const [laudoVistoria, setLaudoVistoria] = useState("");
  const [manutencao, setManutencao] = useState("");
  const [dataUltimaRevisao, setDataUltimaRevisao] = useState("");
  const [contatoProprietario, setContatoProprietario] = useState("");

  const [potencia, setPotencia] = useState("");
  const [categoriaCarro, setCategoriaCarro] = useState("");
  const [tipoMotorCarro, setTipoMotorCarro] = useState("");
  const [transmissaoCarro, setTransmissaoCarro] = useState("");

  const [categoriaMoto, setCategoriaMoto] = useState("");
  const [tipoMotorMoto, setTipoMotorMoto] = useState("");
  const [qtdMarcha, setQtdMarcha] = useState("");
  const [cilindrada, setCilindrada] = useState("");
  const [tipoPartidaMoto, setTipoPartidaMoto] = useState("");

  const [modelos, setModeloIds] = useState([]);
  const [concessionarias, setConcessionarias] = useState([]);
  const [acessorios, setAcessorios] = useState([]);

  const carregarModelos = useCallback(async () => {
    try {
      const response = await axios.get(`${modelosURL}`);
      setModeloIds(response.data);
    } catch (error) {
      console.error("Erro ao carregar modelos:", error);
    }
  }, []);

  const carregarAcessorios = useCallback(async () => {
    try {
      const response = await axios.get(`${acessoriosURL}`);
      setAcessorios(response.data);
    } catch (error) {
      console.error("Erro ao carregar acessórios:", error);
    }
  }, []);

  const carregarConcessionarias = useCallback(async () => {
    try {
      const response = await axios.get(`${concessionariasURL}`);
      setConcessionarias(response.data);
    } catch (error) {
      console.error("Erro ao carregar concessionárias:", error);
    }
  }, []);

  const inicializar = useCallback(() => {
    setChassi("");
    setModeloId("");
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
    setCilindrada("");
    setCategoriaMoto("");
    setQtdMarcha("");
    setTipoPartidaMoto("");
    setTipoMotorMoto("");
    setCategoriaCarro("");
    setTransmissaoCarro("");
    setPotencia("");
    setTipoMotorCarro("");
  }, []);

  async function salvar() {
    var precoAtualInput = precoAtual;
    var precoBaseInput = precoBase;
    if (typeof precoAtualInput === 'number') {
      precoAtualInput = precoAtual.toString();
    }

    if (typeof precoBaseInput === 'number') {
      precoBaseInput = precoBase.toString();
    }

    const precoAtualNumerico = parseFloat(precoAtualInput.replace(',', '.'));
    const precoBaseNumerico = parseFloat(precoBaseInput.replace(',', '.'));

    const data = {
      chassi: chassi,
      precoAtual: precoAtualNumerico,
      cor: cor,
      condicao: condicao,
      concessionariaId: concessionariaId === "" ? null : parseInt(concessionariaId),
      garantia: garantia,
      acessoriosIds: acessoriosIds,
      modeloVeiculo: {
        precoBase: precoBaseNumerico,
        qtdEstoque: qtdEstoque === "" ? null : parseInt(qtdEstoque),
        qtdEstoqueVenda: qtdEstoqueVenda === "" ? null : parseInt(qtdEstoqueVenda),
        fotoModelo,
        modeloId: modeloId === "" ? null : Number(modeloId),
        anoFabricacao: anoFabricacao,
        permiteTestDrive: permiteTestDrive,
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

  const buscar = useCallback(async () => {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const veiculo = response.data;
        setChassi(veiculo.chassi);
        setConcessionariaId(veiculo.concessionariaId);
        setPrecoAtual(veiculo.precoAtual);
        setCor(veiculo.cor);
        setGarantia(veiculo.garantia);
        setCondicao(veiculo.condicao);
        setAcessoriosIds(veiculo.acessoriosIds);

        if (veiculo.condicao === "Usado") {
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
        setModeloId(veiculo.modeloVeiculo.modeloId);

        setTipo(veiculo.modeloVeiculo.tipoVeiculo.tipo);

        if (veiculo.modeloVeiculo.tipoVeiculo.tipo === "Carro") {
          setPotencia(veiculo.modeloVeiculo.tipoVeiculo.carro.potencia);
          setCategoriaCarro(veiculo.modeloVeiculo.tipoVeiculo.carro.categoria);
          setTransmissaoCarro(veiculo.modeloVeiculo.tipoVeiculo.carro.transmissao);
          setTipoMotorCarro(veiculo.modeloVeiculo.tipoVeiculo.carro.motorizacao);
        }
        else if (veiculo.modeloVeiculo.tipoVeiculo.tipo === "Moto") {
          setTipoMotorMoto(veiculo.modeloVeiculo.tipoVeiculo.moto.tipoMotor);
          setCilindrada(veiculo.modeloVeiculo.tipoVeiculo.moto.cilindrada);
          setQtdMarcha(veiculo.modeloVeiculo.tipoVeiculo.moto.qtdMarcha);
          setTipoPartidaMoto(veiculo.modeloVeiculo.tipoVeiculo.moto.tipoPartida);
          setCategoriaMoto(veiculo.modeloVeiculo.tipoVeiculo.moto.categoria);
        }

      } catch (error) {
        mensagemErro("Erro ao carregar os dados do veículo.");
      }
    } else {
      inicializar();
    }
  }, [idParam, inicializar]);

  useEffect(() => {
    carregarModelos();
    carregarConcessionarias();
    carregarAcessorios();
    buscar();
  }, [buscar, carregarAcessorios, carregarConcessionarias, carregarModelos]);

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
              <FormGroup label="Modelo: *" htmlFor="inputModelo">
                <select
                  id="inputModelo"
                  value={modeloId}
                  className="form-control"
                  onChange={(e) => setModeloId(e.target.value)}
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
                  value={precoBase}
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
                  value={precoAtual}
                  placeholder="Digite o preço atual"
                  decimalsLimit={2}
                  decimalSeparator=","
                  groupSeparator="."
                  prefix="R$ "
                  onValueChange={(value) => setPrecoAtual(value)}
                  className="currency-input"
                />
                <br />
              </FormGroup>
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
                    &nbsp;Sim
                  </label>
                  <label style={{ marginLeft: "20px" }}>
                    <input
                      id="inputPermiteTestDrive"
                      type="radio"
                      value="Não"
                      checked={permiteTestDrive === "Não"}
                      onChange={() => setPermiteTestDrive("Não")}
                    />
                    &nbsp;Não
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
              {permiteTestDrive === "Sim" && (
                <FormGroup label="Defina a quantidade mínima em estoque que quando atingida permitirá somente a venda do veículo e inativará o test-drive: " htmlFor="qtdEstoqueVenda">
                  <input
                    id="qtdEstoqueVenda"
                    name="qtdEstoqueVenda"
                    type="number"
                    value={qtdEstoqueVenda}
                    onChange={(e) => { setQtdEstoqueVenda(e.target.value) }}
                    className="currency-input"
                  />
                  <br />
                </FormGroup>
              )}
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

              <SeletorItens
                itens={acessorios}
                selecionados={acessoriosIds}
                onSelecionadosChange={setAcessoriosIds}
                nomeAtributo="descricao"
                nomeCategoria="Acessórios"
              />
              <br />
              <FormGroup label="Garantia *" htmlFor="garantia">
                <div>
                  <label>
                    <input
                      id="garantia"
                      type="radio"
                      value="Em vigência"
                      checked={garantia === "Em vigência"}
                      onChange={() => setGarantia("Em vigência")}
                    />
                    <span className="span-padding">Em vigência</span>
                  </label>
                  < br />
                  <label>
                    <input
                      id="garantia"
                      type="radio"
                      value="Expirada"
                      checked={garantia === "Expirada"}
                      onChange={() => setGarantia("Expirada")}
                    />
                    <span className="span-padding">Expirada</span>
                  </label>
                  < br />
                  <label>
                    <input
                      id="garantia"
                      type="radio"
                      value="Próxima do vencimento"
                      checked={garantia === "Próxima do vencimento"}
                      onChange={() => setGarantia("Próxima do vencimento")}
                    />
                    <span className="span-padding">Próxima do vencimento</span>
                  </label>
                  < br />
                  <label>
                    <input
                      id="garantia"
                      type="radio"
                      value="Estendida"
                      checked={garantia === "Estendida"}
                      onChange={() => setGarantia("Estendida")}
                    />
                    <span className="span-padding">Estendida</span>
                  </label>
                  < br />
                  <label>
                    <input
                      id="garantia"
                      type="radio"
                      value="Não disponível (caso o veículo não tenha garantia)"
                      checked={garantia === "Não disponível (caso o veículo não tenha garantia)"}
                      onChange={() => setGarantia("Não disponível (caso o veículo não tenha garantia)")}
                    />
                    <span className="span-padding">Não disponível (caso o veículo não tenha garantia)</span>
                  </label>
                  < br />
                  <label>
                    <input
                      id="garantia"
                      type="radio"
                      value="Garantia de fábrica"
                      checked={garantia === "Garantia de fábrica"}
                      onChange={() => setGarantia("Garantia de fábrica")}
                    />
                    <span className="span-padding">Garantia de fábrica</span>
                  </label>
                  < br />
                  <label>
                    <input
                      id="garantia"
                      type="radio"
                      value="Garantia de concessionária"
                      checked={garantia === "Garantia de concessionária"}
                      onChange={() => setGarantia("Garantia de concessionária")}
                    />
                    <span className="span-padding">Garantia de concessionária</span>
                  </label>
                  < br />
                </div>
              </FormGroup>
              <br />
              <FormGroup label="Condição: *" htmlFor="inputCondicao">
                <div>
                  <label>
                    <input
                      type="radio"
                      value="Novo"
                      checked={condicao === "Novo"}
                      disabled={condicao === "Usado" && idParam !== null}
                      onChange={() => setCondicao("Novo")}
                    />
                    &nbsp;Novo
                  </label>
                  <label style={{ marginLeft: "20px" }}>
                    <input
                      type="radio"
                      value="Usado"
                      checked={condicao === "Usado"}
                      disabled={condicao === "Novo" && idParam !== null}
                      onChange={() => setCondicao("Usado")}
                    />
                    &nbsp;Usado
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
                      disabled={tipo === "Moto" && idParam !== null}
                      onChange={() => setTipo("Carro")}
                    />
                    &nbsp;Carro
                  </label>
                  <label style={{ marginLeft: "20px" }}>
                    <input
                      type="radio"
                      value="Moto"
                      checked={tipo === "Moto"}
                      disabled={tipo === "Carro" && idParam !== null}
                      onChange={() => setTipo("Moto")}
                    />
                    &nbsp;Moto
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
