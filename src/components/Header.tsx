import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import "./Header.css";

const Header: React.FC = () => {
  const [termoBusca, setTermoBusca] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Redireciona para /produtos?descricao=valorDigitado
    navigate(`/produtos?descricao=${termoBusca}`);
  };

  return (
    <header className="header">
      <div className="container">
        {/* Logo com Link para a home */}
        <Link to="/">
          <img src="/logo2.png" alt="Logo do E-commerce" className="logo" />
        </Link>

        {/* Formulário de Pesquisa */}
        <form onSubmit={handleSubmit} className="search-wrapper">
          <input
            type="text"
            placeholder="Buscar produtos, marcas e muito mais..."
            className="search-bar"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </form>

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
