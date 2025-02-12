import React, { useState } from "react";
import FormGroup from "../../components/form-group";
import Stack from "@mui/material/Stack";

const CadastroVeiculoMoto = ({ categoriaMoto, setCategoriaMoto, tipoMotorMoto, setTipoMotorMoto, cilindrada, setCilindrada , qtdMarcha, setQtdMarcha , transmissaoMoto, setTransmissaoMoto  }) => {

    return (
        <div>
            <h6>Informações de Moto</h6>

            <FormGroup label="Categoria da moto: *" htmlFor="inputCategoriaMoto">
                <input
                    type="text"
                    id="inputCategoriaMoto"
                    value={categoriaMoto}
                    className="form-control"
                    onChange={(e) => setCategoriaMoto(e.target.value)}
                />
            </FormGroup>
            <br/>
            <FormGroup label="Tipo de motor: *" htmlFor="inputTipoMotorMoto">
                <input
                    type="text"
                    id="inputTipoMotorMoto"
                    value={tipoMotorMoto}
                    className="form-control"
                    onChange={(e) => setTipoMotorMoto(e.target.value)}
                />
            </FormGroup>
            <br />
            <FormGroup label="Cilindrada: *" htmlFor="inputCilindrada">
                <input
                    type="text"
                    id="inputCilindrada"
                    value={cilindrada}
                    className="form-control"
                    onChange={(e) => setCilindrada(e.target.value)}
                />
            </FormGroup>

            
            <br />
            <FormGroup label="Quantidade de Marchas: *" htmlFor="inputQntMarcha">
                <input
                    type="number"
                    id="inputQntMarcha"
                    value={qtdMarcha}
                    className="form-control"
                    onChange={(e) => setQtdMarcha(e.target.value)}
                />
            </FormGroup>
            <br />
            <FormGroup label="Transmissão: *" htmlFor="inputTransmissaoMoto">
                <input
                    type="text"
                    id="inputTransmissaoMoto"
                    value={transmissaoMoto}
                    className="form-control"
                    onChange={(e) => setTransmissaoMoto(e.target.value)}
                />
            </FormGroup>
            

        </div>
    );
};

export default CadastroVeiculoMoto;
