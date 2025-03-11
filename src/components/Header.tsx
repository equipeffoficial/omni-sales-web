import React from "react";
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <img src="/logo2.png" alt="Logo do E-commerce" className="logo" />

        {/* Barra de Pesquisa com Ícone */}
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Buscar produtos, marcas e muito mais..."
            className="search-bar"
          />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>

        {/* Ícones do lado direito */}
        <div className="header-icons">
          <div className="icon-container">
            <FaUser />
            <span>Entrar</span>
          </div>
          <div className="icon-container">
            <FaHeart />
            <span>Favoritos</span>
          </div>
          <div className="icon-container">
            <FaShoppingCart />
            <span>Carrinho</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
