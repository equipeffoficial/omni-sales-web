import React, { useEffect, useState } from 'react';
import SectionRenderer from '../components/SectionRenderer';
import { SectionConfig } from '../models/SectionConfig';
import { buscarSecoes } from '../services/SecaoService';
import './Home.css';

const Home: React.FC = () => {
  const [sections, setSections] = useState<SectionConfig[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const carregarSecoes = async () => {
      try {
        const dados = await buscarSecoes();
        setSections(dados);
      } catch (err: any) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    };
    carregarSecoes();
  }, []);

  if (carregando) return <p>Carregando seções...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <div className="home">
      {sections.map((section) => (
        <SectionRenderer key={section.id} config={section} />
      ))}
    </div>
  );
};

export default Home;
