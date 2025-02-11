import React, { useState } from "react";
import FormGroup from "../../components/form-group";
import Stack from "@mui/material/Stack";

const CadastroVeiculoMoto = ({ cilindrada, setCilindrada }) => {

    return (
        <div>
            <h6>Informações de Moto</h6>
            <FormGroup label="Cilindrada: *" htmlFor="inputCilindrada">
                <input
                    type="number"
                    id="inputCilindrada"
                    value={cilindrada}
                    className="form-control"
                    onChange={(e) => setCilindrada(e.target.value)}
                />
            </FormGroup>
            <br />

        </div>
    );
};

export default CadastroVeiculoMoto;
