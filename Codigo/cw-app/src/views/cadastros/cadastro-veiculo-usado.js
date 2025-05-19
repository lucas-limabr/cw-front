import React from "react";
import FormGroup from "../../components/form-group";
import Stack from "@mui/material/Stack";

const CadastroVeiculoUsado = ({
    quilometragem, setQuilometragem,
    documentacao, setDocumentacao,
    sinistro, setSinistro,
    laudoVistoria, setLaudoVistoria,
    manutencao, setManutencao,
    ultimaRevisao, setUltimaRevisao,
    nomeProprietario, setNomeProprietario,
    emailProprietario, setEmailProprietario,
    telefoneProprietario, setTelefoneProprietario
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
                    onChange={(e) => {
                        const valor = e.target.value;
                        setQuilometragem(valor === '' ? null : parseFloat(valor));
                    }}
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
                    value={sinistro}
                    className="form-control"
                    onChange={(e) => setSinistro(e.target.value)}
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
                    value={ultimaRevisao}
                    className="form-control"
                    onChange={(e) => setUltimaRevisao(e.target.value)}
                />
            </FormGroup>
            <br />
            <FormGroup label="Nome do Proprietário: *" htmlFor="inputNome">
                <input
                    type="text"
                    id="inputNome"
                    value={nomeProprietario}
                    className="form-control"
                    onChange={(e) => setNomeProprietario(e.target.value)}
                />
            </FormGroup>
            <br />
            <FormGroup label="E-mail do Proprietário: *" htmlFor="inputEmailProprietario">
                <input
                    type="email"
                    id="inputEmailProprietario"
                    value={emailProprietario}
                    className="form-control"
                    onChange={(e) => setEmailProprietario(e.target.value)}
                />
            </FormGroup>
            <br />
            <FormGroup label="Telefone do Proprietário: *" htmlFor="inputTelefoneProprietario">
                <input
                    type="tel"
                    id="inputTelefoneProprietario"
                    value={telefoneProprietario}
                    className="form-control"
                    onChange={(e) => setTelefoneProprietario(e.target.value)}
                />
            </FormGroup>
        </div>
    );
};

export default CadastroVeiculoUsado;
