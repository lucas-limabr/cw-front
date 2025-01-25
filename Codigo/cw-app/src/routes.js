import React from "react";

import CadastroFabricante from "./views/cadastro-fabricante";
import CadastroModelo from "./views/cadastro-modelo";
import CadastroVeiculo from "./views/cadastro-veiculo";
import CadastroVendedor from "./views/cadastro-vendedor";
import CadastroCliente from "./views/cadastro-cliente";
import CadastroGestor from "./views/cadastro-gestor.js";
import CadastroTestDrive from "./views/cadastro-testdrive";
import CadastroConcessionaria from "./views/cadastro-concessionaria";
import CadastroItemSerie from "./views/cadastro-item-serie";
import CadastroEmpresa from "./views/cadastro-empresa";
import CadastroCompra from "./views/cadastro-compra.js";

import ListagemFabricante from "./views/listagem-fabricante";
import ListagemModelo from "./views/listagem-modelo";
import ListagemVeiculo from "./views/listagem-veiculo";
import ListagemVendedor from "./views/listagem-vendedor";
import ListagemAgendamentoTestDrive from "./views/listagem-agendamento-test-drive";
import ListagemCompra from "./views/listagem-compra";
import ListagemGestor from "./views/listagem-gestor";
import ListagemConcessionaria from "./views/listagem-concessionaria";
import ListagemCliente from "./views/listagem-cliente";
import ListagemItensSeries from "./views/listagem-item-serie";
import ListagemEmpresa from "./views/listagem-empresa";

import { Route, Routes, BrowserRouter } from "react-router-dom";


function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/cadastro-concessionaria/:idParam?"
          element={<CadastroConcessionaria />}
        />
        <Route
          path="/cadastro-fabricante/:idParam?"
          element={<CadastroFabricante />}
        />
        <Route path="/cadastro-modelo/:idParam?" element={<CadastroModelo />} />
        <Route
          path="/cadastro-item-serie/:idParam?"
          element={<CadastroItemSerie />}
        />
        <Route
          path="/cadastro-testdrive/:idParam?"
          element={<CadastroTestDrive />}
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
          path="/cadastro-empresa/:idParam?"
          element={<CadastroEmpresa />}
        />

        <Route
          path="/cadastro-compra/:idParam?"
          element={<CadastroCompra />}
        />

        <Route path="/listagem-fabricante" element={<ListagemFabricante />} />

        <Route
          path="/cadastro-cliente/:idParam?"
          element={<CadastroCliente />}
        />

        <Route
          path="/cadastro-gestor/:idParam?"
          element={<CadastroGestor />}
        />

        <Route path="/listagem-modelo" element={<ListagemModelo />} />
        <Route path="/listagem-item-serie" element={<ListagemItensSeries />} />
        <Route path="/listagem-veiculo" element={<ListagemVeiculo />} />
        <Route path="/listagem-vendedor" element={<ListagemVendedor />} />

        <Route path="/listagem-fabricante" element={<ListagemFabricante />} />

        <Route
          path="/listagem-agendamento-test-drive"
          element={<ListagemAgendamentoTestDrive />}
        />

        <Route path="/listagem-cliente" element={<ListagemCliente />} />

        <Route
          path="/listagem-empresa"
          element={<ListagemEmpresa />}
        />

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
