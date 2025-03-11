import React from "react";
import BannerSlider from "../components/BannerSlider"; // Importamos o slider
import "./Home.css";
import CategoriesSection from '../components/CategoriesSection';
import SecaoMarcas from "../components/SecaoMarcas";
import SecaoProdutos from "../components/SecaoProdutos";

const Home: React.FC = () => {
  return (
    <div className="home">
      <SecaoMarcas/>
      <BannerSlider />
      <CategoriesSection />
      <SecaoProdutos/>
    </div>
  );
};

export default Home;
