import React, { useState } from "react";
import FormGroup from "../../components/form-group";
import Stack from "@mui/material/Stack";

const CadastroVeiculoUsado = ({ quilometragem, setQuilometragem, documentacao, setDocumentacao, sinistro, setSinistro, laudoVistoria, setLaudoVistoria, manutencao, setManutencao }) => {

    return (
        <div>
            <h6>Informações de Veículo Usado</h6>
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


            <FormGroup label="Manutenção: *" htmlFor="inputManutencao">
                <input
                    type="text"
                    id="inputManuntencao"
                    value={manutencao}
                    className="form-control"
                    onChange={(e) => setManutencao(e.target.value)}
                />
            </FormGroup>


            <FormGroup label="Laudo Vistoria: *" htmlFor="inputLaudoVistoria">
                <input
                    type="text"
                    id="inputLaudoVistoria"
                    value={laudoVistoria}
                    className="form-control"
                    onChange={(e) => setLaudoVistoria(e.target.value)}
                />
            </FormGroup>
        </div>
    );
};

export default CadastroVeiculoUsado;
