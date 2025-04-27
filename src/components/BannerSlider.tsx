// src/components/BannerSlider.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./BannerSlider.css";
import { SectionConfig, SectionItem } from "../models/SectionConfig";

interface BannerSliderProps {
  config: SectionConfig;
}

const BannerSlider: React.FC<BannerSliderProps> = ({ config }) => {
  const navigate = useNavigate();

  const handleItemClick = (item: SectionItem) => {
    if (item.produtos && item.produtos.length > 0) {
      // Se houver mais de um produto, navega para a tela de produtos filtrados
      const productIds = item.produtos.map(prod => prod.id);
      navigate("/produtos", { state: { productIds } });
    } else if (item.id) {
      // Se houver apenas um produto, navega para o detalhe do produto
      navigate(`/produto/${item.id}`);
    }
  };

  return (
    <div className="banner-container">
      {config.tituloVisivel && config.titulo && <h2>{config.titulo}</h2>}

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="banner-swiper"
      >
        {config.itens.map((item, index) => (
          <SwiperSlide key={index} onClick={() => handleItemClick(item)}>
            <img src={item.imagem} alt={`Banner ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
