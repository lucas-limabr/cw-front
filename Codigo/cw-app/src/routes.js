import React from "react";

import CadastroFabricante from "./views/cadastro-fabricante";
import CadastroModelo from "./views/cadastro-modelo";
import CadastroVeiculo from "./views/cadastro-veiculo";
import CadastroVendedor from "./views/cadastro-vendedor";
import CadastroCliente from "./views/cadastro-cliente";

import ListagemFabricante from "./views/listagem-fabricante";
import ListagemModelo from "./views/listagem-modelo";
import ListagemVeiculo from "./views/listagem-veiculo";
import ListagemVendedor from "./views/listagem-vendedor";
import ListagemAgendamentoTestDrive from "./views/listagem-agendamento-test-drive";
import ListagemCompra from "./views/listagem-compra";
import ListagemGestor from "./views/listagem-gestor";
import ListagemConcessionaria from "./views/listagem-concessionaria";

import ListagemCliente from "./views/listagem-cliente";

import { Route, Routes, BrowserRouter } from "react-router-dom";

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/cadastro-fabricante/:idParam?"
          element={<CadastroFabricante />}
        />
        <Route path="/cadastro-modelo/:idParam?" element={<CadastroModelo />} />
        <Route
          path="/cadastro-veiculo/:idParam?"
          element={<CadastroVeiculo />}
        />
        <Route
          path="/cadastro-vendedor/:idParam?"
          element={<CadastroVendedor />}
        />

        <Route path="/listagem-fabricante" element={<ListagemFabricante />} />

        <Route
          path="/cadastro-cliente/:idParam?"
          element={<CadastroCliente />}
        />

        <Route path="/listagem-modelo" element={<ListagemModelo />} />
        <Route path="/listagem-veiculo" element={<ListagemVeiculo />} />
        <Route path="/listagem-vendedor" element={<ListagemVendedor />} />

        <Route path="/listagem-fabricante" element={<ListagemFabricante />} />

        <Route
          path="/listagem-agendamento-test-drive"
          element={<ListagemAgendamentoTestDrive />}
        />

        <Route path="/listagem-cliente" element={<ListagemCliente />} />

        <Route
          path="/listagem-concessionaria"
          element={<ListagemConcessionaria />}
        />

        <Route path="/listagem-gestor" element={<ListagemGestor />} />

        <Route path="/listagem-compra" element={<ListagemCompra />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
