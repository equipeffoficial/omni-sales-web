// src/components/SecaoProdutos.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SecaoProdutos.css';
import { Produto } from '../models/Produto';
import { buscarProdutos } from '../services/ProdutoService';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ProdutoCard from './ProdutoCard';
import { SectionConfig } from '../models/SectionConfig';

interface SecaoProdutosProps {
  config: SectionConfig;
}

const SecaoProdutos: React.FC<SecaoProdutosProps> = ({ config }) => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);
  const containerProdutosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const dados = await buscarProdutos();
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

  // Ao clicar em um produto, verifica a navegação definida na config
  const handleCardClick = (produto: Produto) => {
    if (config.id == 2) {
      navigate(`/produtos?=${produto.id}`);
       
    }
  };

  if (carregando) return <p>Carregando produtos...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <section className="produtos">
      {config.tituloVisivel && config.titulo && <h2>{config.titulo}</h2>}
      <div className="slider-produtos">
        <button className="btn-seta seta-esquerda" onClick={scrollLeft}>
          <FaArrowLeft />
        </button>
        <div className="grade-produtos" ref={containerProdutosRef}>
          {produtos.map((produto) => (
            <div key={produto.id} onClick={() => handleCardClick(produto)}>
              <ProdutoCard produto={produto} />
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
