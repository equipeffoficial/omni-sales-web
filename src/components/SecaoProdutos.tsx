import React, { useEffect, useState, useRef } from 'react';
import './SecaoProdutos.css';
import { Produto } from '../models/Produto';
import { buscarProdutos } from '../services/ProdutoService';
import { FaArrowLeft, FaArrowRight, FaBoxOpen, FaTag, FaTrademark } from 'react-icons/fa';

const SecaoProdutos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  // Referência para o contêiner rolável de produtos
  const containerProdutosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const dados = await buscarProdutos();
        // Se a API retorna um objeto com a chave "produtos"
        setProdutos(dados);
      } catch (err: any) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    };

    carregarProdutos();
  }, []);

  const scrollLeft = () => {
    if (containerProdutosRef.current) {
      containerProdutosRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerProdutosRef.current) {
      containerProdutosRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (carregando) {
    return <p>Carregando produtos...</p>;
  }

  if (erro) {
    return <p>Erro: {erro}</p>;
  }

  return (
    <section className="produtos">
      <h2>Mais Vendidos</h2>
      <div className="slider-produtos">
        <button className="btn-seta seta-esquerda" onClick={scrollLeft}>
          <FaArrowLeft />
        </button>
        <div className="grade-produtos" ref={containerProdutosRef}>
          {produtos.map((produto) => (
            <div key={produto.id} className="produto-card">
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
                    <span>{produto.categoria}</span>
                  </span>
                  <span className="detalhe-container">
                    <FaTrademark className="icone-detalhe" />
                    <span>{produto.marca}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="btn-seta seta-direita" onClick={scrollRight}>
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default SecaoProdutos;
