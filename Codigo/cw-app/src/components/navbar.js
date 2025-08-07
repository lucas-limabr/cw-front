import React from "react";
import "bootswatch/dist/flatly/bootstrap.css";

import NavbarItem from "./navbarItem";
import "../helper/verificaPermissao";
import { hasRole } from "../helper/verificaPermissao";

function Navbar(props) {

  const roles = localStorage.getItem("roles");

  const navbarItems = [
    { href: "/login", label: "Login/logout", role: '' },
    { href: "/listagem-admsuporte", label: "ADMSuporte", role: 'ROLE_ADMIN' },
    { href: "/listagem-admempresa", label: "ADMEmpresa", role: 'ROLE_ADMIN' },
    { href: "/listagem-empresa", label: "Empresas", role: 'ROLE_ADMIN' },
    { href: "/listagem-concessionaria", label: "Concessionarias", role: 'ROLE_USER' },
    //{ href: "/listagem-gestor", label: "Gestores" },
    { href: "/listagem-vendedor", label: "Vendedores", role: 'ROLE_ADMIN' },
    { href: "/listagem-fabricante", label: "Fabricantes", role: 'ROLE_USER' },
    { href: "/listagem-modelo", label: "Modelos", role: 'ROLE_USER' },
    { href: "/listagem-acessorio", label: "Acessórios", role: 'ROLE_USER' },
    { href: "/listagem-veiculo", label: "Veículos", role: 'ROLE_USER' },
    { href: "/listagem-testdrive", label: "TestDrive", role: 'ROLE_USER' },
    { href: "/listagem-venda", label: "Vendas", role: 'ROLE_USER' },
    { href: "/listagem-cliente", label: "Clientes", role: 'ROLE_USER' },
  ];

  return (
    <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-blue-royal">
      <div className="container">
        <a href="/" className="navbar-brand navbar-brand-custom">
          CONCESSWEB
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarResponsive">

          <ul className="navbar-nav">
            <NavbarItem key={0} render="true" href={navbarItems[0].href} label={navbarItems[0].label} />
          </ul>

          <ul className="navbar-nav">
            {navbarItems.map((item, index) =>
              hasRole(item.role) && (
                <NavbarItem key={index} render="true" href={item.href} label={item.label} />
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;