import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CadastroAdmSuporte from "./views/cadastros/cadastro-admsuporte.js";
import CadastroAdmEmpresa from "./views/cadastros/cadastro-admempresa.js";
import CadastroAcessorio from "./views/cadastros/cadastro-acessorio.js";
import CadastroCliente from "./views/cadastros/cadastro-cliente.js";
import CadastroCompra from "./views/cadastros/cadastro-venda.js";
import CadastroConcessionaria from "./views/cadastros/cadastro-concessionaria.js";
import CadastroEmpresa from "./views/cadastros/cadastro-empresa.js";
import CadastroFabricante from "./views/cadastros/cadastro-fabricante.js";
import CadastroGestor from "./views/cadastros/cadastro-gestor.js";
import CadastroItemSerie from "./views/cadastros/cadastro-item-serie.js";
import CadastroModelo from "./views/cadastros/cadastro-modelo.js";
import CadastroTestDrive from "./views/cadastros/cadastro-testdrive.js";
import CadastroVeiculo from "./views/cadastros/cadastro-veiculo.js";
import CadastroVendedor from "./views/cadastros/cadastro-vendedor.js";

import ListagemAdmSuporte from "./views/listagens/listagem-admsuporte.js";
import ListagemAdmEmpresa from "./views/listagens/listagem-admempresa.js";
import ListagemAcessorio from "./views/listagens/listagem-acessorio.js";
import ListagemCliente from "./views/listagens/listagem-cliente.js";
import ListagemCompra from "./views/listagens/listagem-venda.js";
import ListagemConcessionaria from "./views/listagens/listagem-concessionaria.js";
import ListagemEmpresa from "./views/listagens/listagem-empresa.js";
import ListagemFabricante from "./views/listagens/listagem-fabricante.js";
import ListagemGestor from "./views/listagens/listagem-gestor.js";
import ListagemItensSeries from "./views/listagens/listagem-item-serie.js";
import ListagemModelo from "./views/listagens/listagem-modelo.js";
import ListagemTestDrive from "./views/listagens/listagem-testdrive.js";
import ListagemVeiculo from "./views/listagens/listagem-veiculo.js";
import ListagemVendedor from "./views/listagens/listagem-vendedor.js";

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro-admsuporte/:idParam?" element={<CadastroAdmSuporte />} />
        <Route path="/cadastro-admempresa/:idParam?" element={<CadastroAdmEmpresa />} />
        {/* <Route path="/cadastro-acessorio/:idParam?" element={<CadastroAcessorio />} /> */}
        <Route path="/cadastro-cliente/:idParam?" element={<CadastroCliente />} />
        <Route path="/cadastro-venda/:idParam?" element={<CadastroCompra />} />
        <Route path="/cadastro-concessionaria/:idParam?" element={<CadastroConcessionaria />} />
        <Route path="/cadastro-empresa/:idParam?" element={<CadastroEmpresa />} />
        <Route path="/cadastro-fabricante/:idParam?" element={<CadastroFabricante />} />
        <Route path="/cadastro-gestor/:idParam?" element={<CadastroGestor />} />
        <Route path="/cadastro-item-serie/:idParam?" element={<CadastroItemSerie />} />
        <Route path="/cadastro-modelo/:idParam?" element={<CadastroModelo />} />
        <Route path="/cadastro-testdrive/:idParam?" element={<CadastroTestDrive />} />
        <Route path="/cadastro-veiculo/:idParam?" element={<CadastroVeiculo />} />
        <Route path="/cadastro-vendedor/:idParam?" element={<CadastroVendedor />} />

        <Route path="/listagem-admsuporte" element={<ListagemAdmSuporte />} />
        <Route path="/listagem-admempresa" element={<ListagemAdmEmpresa />} />
        {/* <Route path="/listagem-acessorio" element={<ListagemAcessorio />} /> */}
        <Route path="/listagem-cliente" element={<ListagemCliente />} />
        <Route path="/listagem-venda" element={<ListagemCompra />} />
        <Route path="/listagem-concessionaria" element={<ListagemConcessionaria />} />
        <Route path="/listagem-empresa" element={<ListagemEmpresa />} />
        <Route path="/listagem-fabricante" element={<ListagemFabricante />} />
        <Route path="/listagem-gestor" element={<ListagemGestor />} />
        <Route path="/listagem-item-serie" element={<ListagemItensSeries />} />
        <Route path="/listagem-modelo" element={<ListagemModelo />} />
        <Route path="/listagem-testdrive" element={<ListagemTestDrive />} />
        <Route path="/listagem-veiculo" element={<ListagemVeiculo />} />
        <Route path="/listagem-vendedor" element={<ListagemVendedor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
