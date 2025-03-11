import React, { useEffect, useState, useRef } from 'react';
import './SecaoMarcas.css';
import { Marca } from '../models/Marca';
import { buscarMarcas } from '../services/MarcaService';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const SecaoMarcas: React.FC = () => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  // Referência para o contêiner rolável
  const containerMarcasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carregarMarcas = async () => {
      try {
        const dados = await buscarMarcas();
        setMarcas(dados);
      } catch (err: any) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    };

    carregarMarcas();
  }, []);

  // Funções para rolar a lista
  const scrollLeft = () => {
    if (containerMarcasRef.current) {
      containerMarcasRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerMarcasRef.current) {
      containerMarcasRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  if (carregando) {
    return <p>Carregando marcas...</p>;
  }

  if (erro) {
    return <p>Erro: {erro}</p>;
  }

  return (
    <section className="marcas">
      <h2>Nossas Marcas</h2>
      <div className="slider-marcas">
        <button className="btn-seta seta-esquerda" onClick={scrollLeft}>
          <FaArrowLeft />
        </button>

        <div className="container-marcas" ref={containerMarcasRef}>
          {marcas.map((marca) => (
            <div key={marca.id} className="card-marca">
              <div className="logo-marca">
                <img src={marca.imagem} alt={marca.descricao} />
              </div>
              <p className="nome-marca">{marca.descricao}</p>
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

export default SecaoMarcas;
