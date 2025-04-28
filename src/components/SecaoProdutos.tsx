import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SecaoProdutos.css';
import { Produto } from '../models/Produto';
import ProdutoCard from './ProdutoCard';
import { SectionConfig } from '../models/SectionConfig';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface SecaoProdutosProps {
  config: SectionConfig;
}

const SecaoProdutos: React.FC<SecaoProdutosProps> = ({ config }) => {
  const navigate = useNavigate();
  const containerProdutosRef = useRef<HTMLDivElement>(null);

  // Pega os produtos diretamente do primeiro item da seção
  const produtos: Produto[] = config.itens.flatMap(item => item.produtos || []);

  const scrollLeft = () => {
    containerProdutosRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    containerProdutosRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const handleCardClick = (produto: Produto) => {
    // Agora ao clicar, vai para a tela de detalhes do produto
    navigate(`/produto/${produto.id}`, { state: produto });
  };

  if (produtos.length === 0) {
    return <p>Nenhum produto encontrado nesta seção.</p>;
  }

  return (
    <section className="produtos">
      {config.tituloVisivel && config.titulo && <h2>{config.titulo}</h2>}
      <div className="slider-produtos">
        <button className="btn-seta seta-esquerda" onClick={scrollLeft}>
          <FaArrowLeft />
        </button>
        <div className="grade-produtos" ref={containerProdutosRef}>
          {produtos.map((produto) => (
            <div
              key={produto.id}
              onClick={() => handleCardClick(produto)}
              style={{ cursor: 'pointer' }}
            >
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
