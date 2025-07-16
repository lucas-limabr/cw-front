import React from "react";
import "../../App.css";
import FormGroup from "../../components/form-group";
import Stack from "@mui/material/Stack";

const CadastroVeiculoUsado = ({
    quilometragem, setQuilometragem,
    documentacao, setDocumentacao,
    sinistroAcidente, setSinistroAcidente,
    laudoVistoria, setLaudoVistoria,
    manutencao, setManutencao,
    dataUltimaRevisao, setDataUltimaRevisao,
    contatoProprietario, setContatoProprietario
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
                        <span className="span-padding">Regular</span>
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
                        <span className="span-padding">Pendente (algum documento em aberto)</span>
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
                        <span className="span-padding">Aguardando renovação (em vias de renovação, como licenciamento)</span>
                    </label>
                    < br />
                    <label>
                        <input
                            id="documentacao"
                            type="radio"
                            value="Atrasada (documentação não renovada no prazo)"
                            checked={documentacao === "Atrasada (documentação não renovada no prazo)"}
                            onChange={() => setDocumentacao("Atrasada (documentação não renovada no prazo)")}
                        />
                        <span className="span-padding">Atrasada (documentação não renovada no prazo)</span>
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
                        <span className="span-padding">Em processo de transferência (caso o veículo esteja mudando de proprietário)</span>
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
                        <span className="span-padding">Suspensa (algum impedimento legal)</span>
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
                        <span className="span-padding">Manutenção em dia</span>
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
                        <span className="span-padding">Atrasada (documentação não renovada no prazo)</span>
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
                        <span className="span-padding">Revisão de fábrica realizada</span>
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
                        <span className="span-padding">Revisão pendente</span>
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
                        <span className="span-padding">Manutenção corretiva realizada (conserto de algum defeito)</span>
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
                        <span className="span-padding">Manutenção preventiva realizada</span>
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
                        <span className="span-padding">Nenhuma manutenção registrada</span>
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
                        <span className="span-padding">Sem histórico de sinistros</span>
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
                        <span className="span-padding">Acidente leve (Pequenos danos, como arranhões ou amassados)</span>
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
                        <span className="span-padding">Acidente moderado (Danos maiores, mas sem comprometimento estrutural)</span>
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
                        <span className="span-padding">Acidente grave (Danos significativos, envolvendo partes estruturais)</span>
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
                        <span className="span-padding">Recuperado de sinistro (Veículo reparado após sinistro)</span>
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
                        <span className="span-padding">Laudo 100% Aprovado</span>
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
                        <span className="span-padding">Aprovado com Observações</span>
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
                        <span className="span-padding">Reprovado – Danos Estruturais</span>
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
                        <span className="span-padding">Em análise</span>
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
            <FormGroup label="Contato do Proprietário: " htmlFor="inputContato">
                <input
                    type="text"
                    id="inputContato"
                    value={contatoProprietario}
                    className="form-control"
                    onChange={(e) => setContatoProprietario(e.target.value)}
                />
            </FormGroup>
        </div>
    );
};

export default CadastroVeiculoUsado;
