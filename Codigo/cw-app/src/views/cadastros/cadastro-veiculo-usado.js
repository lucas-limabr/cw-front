import React from "react";
import FormGroup from "../../components/form-group";
import Stack from "@mui/material/Stack";

const CadastroVeiculoUsado = ({
    quilometragem, setQuilometragem,
    documentacao, setDocumentacao,
    sinistroAcidente, setSinistroAcidente,
    laudoVistoria, setLaudoVistoria,
    manutencao, setManutencao,
    dataUltimaRevisao, setDataUltimaRevisao,
    contatoProprietario, setContatoProprietario,
    garantia, setGarantia,
}) => {
    return (
        <div>
            <h5>Informações de Veículo Usado</h5>
            <br />
            <FormGroup label="Quilometragem: *" htmlFor="inputQuilometragem">
                <input
                    type="number"
                    id="inputQuilometragem"
                    value={quilometragem}
                    className="form-control"
                    onChange={(e) => { setQuilometragem(e.target.value) }}
                />
            </FormGroup>
            <br />
            <FormGroup label="Garantia *" htmlFor="garantia">
                <div>
                    <label>
                        <input
                            id="garantia"
                            type="radio"
                            value="Em vigencia"
                            checked={garantia === "Em vigencia"}
                            onChange={() => setGarantia("Em vigencia")}
                        />
                        Em vigência
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
                        Expirada
                    </label>
                    < br />
                    <label>
                        <input
                            id="garantia"
                            type="radio"
                            value="Próxima do vencimento"
                            checked={garantia === "Proxima do vencimento"}
                            onChange={() => setGarantia("Proxima do vencimento")}
                        />
                        Próxima do vencimento
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
                        Estendida
                    </label>
                    < br />
                    <label>
                        <input
                            id="garantia"
                            type="radio"
                            value="Nao disponivel"
                            checked={garantia === "Nao disponivel"}
                            onChange={() => setGarantia("Nao disponivel")}
                        />
                        Não disponível (caso o veículo não tenha garantia)
                    </label>
                    < br />
                    <label>
                        <input
                            id="garantia"
                            type="radio"
                            value="Garantia de fabrica"
                            checked={garantia === "Garantia de fabrica"}
                            onChange={() => setGarantia("Garantia de fabrica")}
                        />
                        Garantia de fábrica
                    </label>
                    < br />
                    <label>
                        <input
                            id="garantia"
                            type="radio"
                            value="Garantia de concessionaria"
                            checked={garantia === "Garantia de concessionaria"}
                            onChange={() => setGarantia("Garantia de concessionaria")}
                        />
                        Garantia de concessionária
                    </label>
                    < br />
                </div>
            </FormGroup>
            <br />
            <FormGroup label="Documentação *" htmlFor="documentacao">
                <div>
                    <label>
                        <input
                            id="documentacao"
                            type="radio"
                            value="Regular"
                            checked={documentacao === "Regular"}
                            onChange={() => setDocumentacao("Regular")}
                        />
                        Regular
                    </label>
                    < br />
                    <label>
                        <input
                            id="documentacao"
                            type="radio"
                            value="Pendente (algum documento em aberto)"
                            checked={documentacao === "Pendente (algum documento em aberto)"}
                            onChange={() => setDocumentacao("Pendente (algum documento em aberto)")}
                        />
                        Pendente (algum documento em aberto)
                    </label>
                    < br />
                    <label>
                        <input
                            id="documentacao"
                            type="radio"
                            value="Aguardando renovação (em vias de renovação, como licenciamento)"
                            checked={documentacao === "Aguardando renovação (em vias de renovação, como licenciamento)"}
                            onChange={() => setDocumentacao("Aguardando renovação (em vias de renovação, como licenciamento)")}
                        />
                        Aguardando renovação (em vias de renovação, como licenciamento)
                    </label>
                    < br />
                    <label>
                        <input
                            id="documentacao"
                            type="radio"
                            value="Atrasada (documentação não renovada no prazo)"
                            checked={documentacao === `Atrasada (documentação não renovada no prazo)`}
                            onChange={() => setDocumentacao(`Atrasada (documentação não renovada no prazo)`)}
                        />
                        Atrasada (documentação não renovada no prazo)
                    </label>
                    < br />
                    <label>
                        <input
                            id="documentacao"
                            type="radio"
                            value="Em processo de transferência (caso o veículo esteja mudando de proprietário)"
                            checked={documentacao === "Em processo de transferência (caso o veículo esteja mudando de proprietário)"}
                            onChange={() => setDocumentacao("Em processo de transferência (caso o veículo esteja mudando de proprietário)")}
                        />
                        Em processo de transferência (caso o veículo esteja mudando de proprietário)
                    </label>
                    < br />
                    <label>
                        <input
                            id="documentacao"
                            type="radio"
                            value="Suspensa (algum impedimento legal)"
                            checked={documentacao === "Suspensa (algum impedimento legal)"}
                            onChange={() => setDocumentacao("Suspensa (algum impedimento legal)")}
                        />
                        Suspensa (algum impedimento legal)
                    </label>
                    < br />
                </div>
            </FormGroup>
            <br />
            <FormGroup label="Histórico de manutenções *" htmlFor="manutencao">
                <div>
                    <label>
                        <input
                            id="manutencao"
                            type="radio"
                            value="Manutenção em dia"
                            checked={manutencao === "Manutenção em dia"}
                            onChange={() => setManutencao("Manutenção em dia")}
                        />
                        Manutenção em dia
                    </label>
                    < br />
                    <label>
                        <input
                            id="manutencao"
                            type="radio"
                            value="Atrasada (documentação não renovada no prazo)"
                            checked={manutencao === `Atrasada (documentação não renovada no prazo)`}
                            onChange={() => setManutencao(`Atrasada (documentação não renovada no prazo)`)}
                        />
                        Atrasada (documentação não renovada no prazo)
                    </label>
                    < br />
                    <label>
                        <input
                            id="manutencao"
                            type="radio"
                            value="Revisão de fábrica realizada"
                            checked={manutencao === "Revisão de fábrica realizada"}
                            onChange={() => setManutencao("Revisão de fábrica realizada")}
                        />
                        Revisão de fábrica realizada
                    </label>
                    < br />
                    <label>
                        <input
                            id="manutencao"
                            type="radio"
                            value=" Revisão pendente"
                            checked={manutencao === "Revisão pendente"}
                            onChange={() => setManutencao("Revisão pendente")}
                        />
                        Revisão pendente
                    </label>
                    < br />
                    <label>
                        <input
                            id="manutencao"
                            type="radio"
                            value="Manutenção corretiva realizada (conserto de algum defeito)"
                            checked={manutencao === "Manutenção corretiva realizada (conserto de algum defeito)"}
                            onChange={() => setManutencao("Manutenção corretiva realizada (conserto de algum defeito)")}
                        />
                        Manutenção corretiva realizada (conserto de algum defeito)
                    </label>
                    < br />
                    <label>
                        <input
                            id="manutencao"
                            type="radio"
                            value="Manutenção preventiva realizada"
                            checked={manutencao === "Manutenção preventiva realizada"}
                            onChange={() => setManutencao("Manutenção preventiva realizada")}
                        />
                        Manutenção preventiva realizada
                    </label>
                    < br />
                    <label>
                        <input
                            id="manutencao"
                            type="radio"
                            value="Nenhuma manutenção registrada"
                            checked={manutencao === "Nenhuma manutenção registrada"}
                            onChange={() => setManutencao("Nenhuma manutenção registrada")}
                        />
                        Nenhuma manutenção registrada
                    </label>
                    < br />
                </div>
            </FormGroup>
            <br />
            <FormGroup label=" Sinistros ou Histórico de Acidentes *" htmlFor="sinistro">
                <div>
                    <label>
                        <input
                            id="sinistro"
                            type="radio"
                            value="Sem histórico de sinistros"
                            checked={sinistroAcidente === "Sem histórico de sinistros"}
                            onChange={() => setSinistroAcidente("Sem histórico de sinistros")}
                        />
                        Sem histórico de sinistros
                    </label>
                    < br />
                    <label>
                        <input
                            id="sinistro"
                            type="radio"
                            value="Acidente leve (Pequenos danos, como arranhões ou amassados)"
                            checked={sinistroAcidente === "Acidente leve (Pequenos danos, como arranhões ou amassados)"}
                            onChange={() => setSinistroAcidente("Acidente leve (Pequenos danos, como arranhões ou amassados)")}
                        />
                        Acidente leve (Pequenos danos, como arranhões ou amassados)
                    </label>
                    < br />
                    <label>
                        <input
                            id="sinistro"
                            type="radio"
                            value="Acidente moderado (Danos maiores, mas sem comprometimento estrutural)"
                            checked={sinistroAcidente === "Acidente moderado (Danos maiores, mas sem comprometimento estrutural)"}
                            onChange={() => setSinistroAcidente("Acidente moderado (Danos maiores, mas sem comprometimento estrutural)")}
                        />
                        Acidente moderado (Danos maiores, mas sem comprometimento estrutural)
                    </label>
                    < br />
                    <label>
                        <input
                            id="sinistro"
                            type="radio"
                            value="Acidente grave (Danos significativos, envolvendo partes estruturais)"
                            checked={sinistroAcidente === "Acidente grave (Danos significativos, envolvendo partes estruturais)"}
                            onChange={() => setSinistroAcidente("Acidente grave (Danos significativos, envolvendo partes estruturais)")}
                        />
                        Acidente grave (Danos significativos, envolvendo partes estruturais)
                    </label>
                    < br />
                    <label>
                        <input
                            id="sinistro"
                            type="radio"
                            value="Recuperado de sinistro (Veículo reparado após sinistro)"
                            checked={sinistroAcidente === "Recuperado de sinistro (Veículo reparado após sinistro)"}
                            onChange={() => setSinistroAcidente("Recuperado de sinistro (Veículo reparado após sinistro)")}
                        />
                        Recuperado de sinistro (Veículo reparado após sinistro)
                    </label>
                    < br />
                </div>
            </FormGroup>
            <br />
            <FormGroup label="Laudo da Vistoria *" htmlFor="laudoVistoria">
                <div>
                    <label>
                        <input
                            id="laudoVistoria"
                            type="radio"
                            value="Laudo 100% Aprovado"
                            checked={laudoVistoria === "Laudo 100% Aprovado"}
                            onChange={() => setLaudoVistoria("Laudo 100% Aprovado")}
                        />
                        Laudo 100% Aprovado
                    </label>
                    < br />
                    <label>
                        <input
                            id="laudoVistoria"
                            type="radio"
                            value="Aprovado com Observações"
                            checked={laudoVistoria === "Aprovado com Observações"}
                            onChange={() => setLaudoVistoria("Aprovado com Observações")}
                        />
                        Aprovado com Observações
                    </label>
                    < br />
                    <label>
                        <input
                            id="laudoVistoria"
                            type="radio"
                            value="Reprovado – Danos Estruturais"
                            checked={laudoVistoria === "Reprovado – Danos Estruturais"}
                            onChange={() => setLaudoVistoria("Reprovado – Danos Estruturais")}
                        />
                        Reprovado – Danos Estruturais
                    </label>
                    < br />
                    <label>
                        <input
                            id="laudoVistoria"
                            type="radio"
                            value="Em análise"
                            checked={laudoVistoria === "Em análise"}
                            onChange={() => setLaudoVistoria("Em análise")}
                        />
                        Em análise
                    </label>
                    < br />
                </div>
            </FormGroup>
            <br />
            <FormGroup label="Data da Última Revisão: *" htmlFor="inputUltimaRevisao">
                <input
                    type="date"
                    id="inputUltimaRevisao"
                    value={dataUltimaRevisao}
                    className="form-control"
                    onChange={(e) => setDataUltimaRevisao(e.target.value)}
                />
            </FormGroup>
            <br />
            <FormGroup label="Nome do Proprietário: *" htmlFor="inputNome">
                <input
                    type="text"
                    id="inputNome"
                    value={contatoProprietario}
                    className="form-control"
                    onChange={(e) => setContatoProprietario(e.target.value)}
                />
            </FormGroup>
        </div>
    );
};

export default CadastroVeiculoUsado;
