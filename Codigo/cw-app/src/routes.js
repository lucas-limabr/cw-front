import React from "react";
import CadastroCliente from './views/listagem-cliente';
import ListagemCliente from './views/cadastro-cliente';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/cadastro-usuarios/:idParam?'
                    element={<CadastroCliente />}
                />
                <Route path='/cadastro-cursos/:idParam?' element={<ListagemCliente />} />
                <Route
                    path='/cadastro-professores/:idParam?'
                    element={<ListagemCliente />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;
