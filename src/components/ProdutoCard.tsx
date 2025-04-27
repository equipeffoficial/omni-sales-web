import React from 'react';
import { Produto } from '../models/Produto';
import { FaBoxOpen, FaTag, FaTrademark } from 'react-icons/fa';
import './ProdutoCard.css';

interface ProdutoCardProps {
  produto: Produto;
}

const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto }) => {
  return (
    <div className="produto-card">
      <div className="produto-imagem">
        <img src={produto.imagemUrl} alt={produto.descricao} />
      </div>
      <div className="produto-info">
        <p className="produto-nome">{produto.descricao}</p>
        <p className="produto-preco">
          R$ {produto.preco.toFixed(2).replace('.', ',')}
        </p>
        <div className="produto-detalhes">
          <span className="detalhe-container">
            <FaBoxOpen className="icone-detalhe" />
            <span>{produto.estoque} unidades em estoque</span>
          </span>
          <span className="detalhe-container">
            <FaTag className="icone-detalhe" />
            <span>{produto.categoria.descricao}</span>
          </span>
          <span className="detalhe-container">
            <FaTrademark className="icone-detalhe" />
            <span>{produto.marca.descricao}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProdutoCard;
