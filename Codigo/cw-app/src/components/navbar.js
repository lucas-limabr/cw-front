import React from "react";
import "bootswatch/dist/flatly/bootstrap.css";

import NavbarItem from "./navbarItem";

function Navbar(props) {
  const navbarItems = [
    { href: "/listagem-gestor", label: "Gestores" },
    { href: "/listagem-vendedor", label: "Vendedores" },
    { href: "/listagem-fabricante", label: "Fabricantes" },
    { href: "/listagem-modelo", label: "Modelos" },
    { href: "/listagem-empresa", label: "Empresas" },
    { href: "/listagem-concessionaria", label: "Concessionarias" },
    { href: "/listagem-item-serie", label: "Itens" },
    { href: "/listagem-veiculo", label: "Veículos" },
    { href: "/listagem-testdrive", label: "Test-drive" },
    { href: "/listagem-compra", label: "Compras" },
    { href: "/listagem-cliente", label: "Clientes" },
  ];

  return (
    <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div className="container">
        <a href="/" className="navbar-brand">
          ConcessWeb
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
          {navbarItems.map((item, index) => (
            <ul className="navbar-nav" key={index}>
              <NavbarItem render="true" href={item.href} label={item.label} />
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
