import React, { useState } from "react";
import FormGroup from "../../components/form-group";
import Stack from "@mui/material/Stack";

const CadastroVeiculoCarro = ({ potencia, setPotencia }) => {

    return (
        <div>
            <h6>Informações de Carro</h6>
            <FormGroup label="Potência(cv): *" htmlFor="inputPotencia">
                <input
                    type="number"
                    id="inputPotencia"
                    value={potencia}
                    className="form-control"
                    onChange={(e) => setPotencia(e.target.value)}
                />
            </FormGroup>
            <br />

        </div>
    );
};

export default CadastroVeiculoCarro;
