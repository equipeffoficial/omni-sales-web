// components/SectionRenderer.tsx

import React from 'react';
import BannerSlider from './BannerSlider';
import CategoriesSection from './CategoriesSection';
import SecaoMarcas from './SecaoInstagram';
import SecaoProdutos from './SecaoProdutos';
import { SectionConfig } from '../models/SectionConfig';

interface SectionRendererProps {
  config: SectionConfig;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({ config }) => {
  switch (config.tipo) {
    case 'BANNER':
      return <BannerSlider config={config} />;
    case 'CATEGORIAS':
      return <CategoriesSection config={config} />;
    case 'INSTAGRAM':
      return <SecaoMarcas config={config} />;
    case 'PRODUTOS':
      return <SecaoProdutos config={config} />;
    default:
      return null;
  }
};

export default SectionRenderer;
