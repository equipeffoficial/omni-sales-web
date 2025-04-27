import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './SecaoInstagram.css';
import { SectionConfig, SectionItem } from '../models/SectionConfig';

interface SecaoInstagramProps {
  config: SectionConfig;
}

const SecaoInstagram: React.FC<SecaoInstagramProps> = ({ config }) => {
  const navigate = useNavigate();
  const containerMarcasRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    containerMarcasRef.current?.scrollBy({ left: -150, behavior: 'smooth' });
  };

  const scrollRight = () => {
    containerMarcasRef.current?.scrollBy({ left: 150, behavior: 'smooth' });
  };

  const handleMarcaClick = (item: SectionItem) => {
    const produtos = item.produtos || [];

    if (produtos.length === 1) {
      // Vai para a página de detalhes do único produto
      navigate(`/produto/${produtos[0].id}`, { state: produtos[0] });
    } else if (produtos.length > 1) {
      // Vai para a listagem de produtos filtrada
      const productIds = produtos.map(p => p.id);
      navigate('/produtos', { state: { productIds } });
    } else {
      // Nenhum produto associado
      console.warn(`Nenhum produto disponível para o item "${item.titulo}"`);
    }
  };

  return (
    <section className="marcas">
      {config.tituloVisivel && config.titulo && <h2>{config.titulo}</h2>}
      <div className="slider-marcas">
        <button className="btn-seta seta-esquerda" onClick={scrollLeft}>
          <FaArrowLeft />
        </button>

        <div className="container-marcas" ref={containerMarcasRef}>

          {config.itens.map((item) => (
              <div
                    key={item.id}
                    className="card-marca"
                    onClick={() => handleMarcaClick(item)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="logo-marca">
                      <img src={item.imagem} alt={item.titulo || `Marca ${item.id}`} />
                    </div>

                    {/* Exibe o título SOMENTE se item.tituloVisivel for true */}
                    {item.tituloVisivel && (
                      <p className="nome-marca">{item.titulo || `Marca ${item.id}`}</p>
                    )}

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

export default SecaoInstagram;
