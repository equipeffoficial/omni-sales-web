// models/SectionConfig.ts
import { Produto } from './Produto';

export type SectionType = 'BANNER' | 'CATEGORIAS' | 'INSTAGRAM' | 'PRODUTOS';

export interface SectionItem {
  id: number;
  secaoId: number;
  titulo: string;
  tituloVisivel: boolean;
  imagem: string;
  produtos?: Produto[];
}

export interface SectionConfig {
  id: number;
  sequencia: number;
  imagem: string;
  tipo: string;        // Ex: "BANNER"
  titulo: string;
  tituloVisivel: boolean;
  itens: SectionItem[];
}
