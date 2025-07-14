import React, { useState } from "react";
import FormGroup from "../../components/form-group";
import Stack from "@mui/material/Stack";

const CadastroVeiculoCarro = ({ categoriaCarro, setCategoriaCarro, tipoMotorCarro, setTipoMotorCarro, potencia, setPotencia, transmissaoCarro, setTransmissaoCarro, }) => {

    return (
        <div>
            <h5>Informações de Carro</h5>
            <br />

            <FormGroup label="Categoria do carro: *" htmlFor="inputCategoriaCarro">
                <input
                    type="text"
                    id="inputCategoriaCarro"
                    value={categoriaCarro}
                    className="form-control"
                    onChange={(e) => setCategoriaCarro(e.target.value)}
                />
            </FormGroup>

            <br />

            <FormGroup label="Tipo de motor: *" htmlFor="inputTipoMotorMoto">
                <input
                    type="text"
                    name="inputTipoMotorCarro"
                    id="inputTipoMotorCarro"
                    value={tipoMotorCarro}
                    className="form-control"
                    onChange={(e) => setTipoMotorCarro(e.target.value)}
                />
            </FormGroup>
            <br />

            <FormGroup label="Potência(cv): *" htmlFor="inputPotencia">
                <input
                    type="number"
                    id="inputPotencia"
                    value={potencia}
                    className="form-control"
                    onChange={(e) => { setPotencia(e.target.value) }}
                />
            </FormGroup>

            <br />
            <FormGroup label="Transmissão: *" htmlFor="inputTransmissaoCarro">
                <input
                    type="text"
                    id="inputTrasnmissaoCarro"
                    value={transmissaoCarro}
                    className="form-control"
                    onChange={(e) => setTransmissaoCarro(e.target.value)}
                />
            </FormGroup>
        </div>

    );
};

export default CadastroVeiculoCarro;
