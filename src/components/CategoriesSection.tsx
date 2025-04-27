import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoriesSection.css';
import { SectionConfig, SectionItem } from '../models/SectionConfig';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface CategoriesSectionProps {
  config: SectionConfig;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ config }) => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (item: SectionItem) => {
    const produtos = item.produtos || [];

    if (produtos.length === 1) {
      navigate(`/produto/${produtos[0].id}`, { state: produtos[0] });
    } else if (produtos.length > 1) {
      const productIds = produtos.map(p => p.id);
      navigate('/produtos', { state: { productIds } });
    } else {
      console.warn(`Nenhum produto disponível para a categoria "${item.titulo}"`);
    }
  };

  return (
    <section className="categories">
      {config.tituloVisivel && config.titulo && <h2>{config.titulo}</h2>}

      <div className="slider-container">
        <button className="scroll-button left" onClick={scrollLeft}>
          <FaArrowLeft />
        </button>

        <div className="category-cards" ref={scrollContainerRef}>
          {config.itens.map((item) => (
            <div key={item.id} className="category-card" onClick={() => handleCategoryClick(item)}>
              <div className="image-wrapper">
                <img src={item.imagem} alt={item.titulo} />
              </div>
              <div className="category-description">
                <h3>{item.titulo}</h3>
              </div>
            </div>
          ))}
        </div>

        <button className="scroll-button right" onClick={scrollRight}>
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default CategoriesSection;
