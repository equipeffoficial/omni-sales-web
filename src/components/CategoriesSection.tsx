import React, { useEffect, useRef, useState } from 'react';
import './CategoriesSection.css';
import { Category } from '../models/Category';
import { fetchCategories } from '../services/CategoryService';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Referência para o contêiner rolável
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

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

  if (isLoading) {
    return <p>Carregando categorias...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <section className="categories">
      <h2>Categorias dos produtos</h2>
      <div className="slider-container">
        <button className="scroll-button left" onClick={scrollLeft}>
          <FaArrowLeft />
        </button>
        <div className="category-cards" ref={scrollContainerRef}>
          {categories.map((cat) => (
            <div key={cat.id} className="category-card">
              <div className="image-wrapper">
                <img src={cat.imagem} alt={cat.descricao} />
              </div>
              <div className="category-description">
                <h3>{cat.descricao}</h3>
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
