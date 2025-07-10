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
                    onChange={(e) => { setQuilometragem(e.target.value)}}
                />
            </FormGroup>
            <br />
            <FormGroup label="Documentação: *" htmlFor="inputDocumentacao">
                <input
                    type="text"
                    id="inputDocumentacao"
                    value={documentacao}
                    className="form-control"
                    onChange={(e) => setDocumentacao(e.target.value)}
                />
            </FormGroup>
            <br />
            <FormGroup label="Sinistro: *" htmlFor="inputSinistro">
                <input
                    type="text"
                    id="inputSinistro"
                    value={sinistroAcidente}
                    className="form-control"
                    onChange={(e) => setSinistroAcidente(e.target.value)}
                />
            </FormGroup>
            <br />
            <FormGroup label="Manutenção: *" htmlFor="inputManutencao">
                <input
                    type="text"
                    id="inputManutencao"
                    value={manutencao}
                    className="form-control"
                    onChange={(e) => setManutencao(e.target.value)}
                />
            </FormGroup>
            <br />
            <FormGroup label="Laudo Vistoria: *" htmlFor="inputLaudoVistoria">
                <input
                    type="text"
                    id="inputLaudoVistoria"
                    value={laudoVistoria}
                    className="form-control"
                    onChange={(e) => setLaudoVistoria(e.target.value)}
                />
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
