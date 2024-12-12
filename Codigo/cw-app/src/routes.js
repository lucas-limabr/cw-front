import React from "react";

import CadastroFabricante from "./views/cadastro-fabricante";
import CadastroModelo from "./views/cadastro-modelo";
import CadastroVeiculo from "./views/cadastro-veiculo";
import CadastroVendedor from "./views/cadastro-vendedor";

import ListagemFabricante from "./views/listagem-fabricante";
import ListagemModelo from "./views/listagem-modelo";
import ListagemVeiculo from "./views/listagem-veiculo";
import ListagemVendedor from "./views/listagem-vendedor";
import ListagemAgendamentoTestDrive from "./views/listagem-agendamento-test-drives";

import { Route, Routes, BrowserRouter } from "react-router-dom";

function Rotas(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/cadastro-fabricante/:idParam?"
                    element={<CadastroFabricante />}
                />
                <Route
                    path="/cadastro-modelo/:idParam?"
                    element={<CadastroModelo />}
                />
                <Route
                    path="/cadastro-veiculo/:idParam?"
                    element={<CadastroVeiculo />}
                />
                <Route
                    path="/cadastro-vendedor/:idParam?"
                    element={<CadastroVendedor />}
                />

                <Route
                    path="/listagem-fabricante"
                    element={<ListagemFabricante />}
                />
                <Route path="/listagem-modelo" element={<ListagemModelo />} />
                <Route path="/listagem-veiculo" element={<ListagemVeiculo />} />
                <Route
                    path="/listagem-vendedor"
                    element={<ListagemVendedor />}
                />


                <Route
                    path='/listagem-fabricante'
                    element={<ListagemFabricante />}
                />

                <Route
                    path='/listagem-agendamento-test-drives'
                    element={<ListagemAgendamentoTestDrive />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;
