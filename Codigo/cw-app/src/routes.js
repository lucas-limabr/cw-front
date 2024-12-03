import React from "react";
import CadastroCliente from './views/cadastro-cliente';
import ListagemCliente from './views/listagem-cliente';
import CadastroFabricante from './views/cadastro-fabricante'
import ListagemFabricante from './views/listagem-fabricante'
import CadastroModelo from './views/cadastro-modelo'
import ListagemModelo from './views/listagem-modelo'
import CadastroFuncionario from './views/cadastro-funcionario'
import ListagemFuncionario from './views/listagem-funcionario'
import CadastroVeiculo from './views/cadastro-veiculo'
import ListagemVeiculo from './views/listagem-veiculo'

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/cadastro-cliente/:idParam?'
                    element={<CadastroCliente />}
                />
                <Route path='/cadastro-cursos/:idParam?' element={<ListagemCliente />} />

                <Route
                    path='/cadastro-fabricante/:idParam?'
                    element={<CadastroFabricante />}
                />


                <Route
                    path='/listagem-fabricante/:idParam?'
                    element={<ListagemFabricante />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;
