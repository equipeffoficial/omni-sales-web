// services/SecaoService.ts
import { SectionConfig, SectionItem } from '../models/SectionConfig';

const BASE_URL = 'http://localhost:8080/secoes';

export const buscarSecoes = async (): Promise<SectionConfig[]> => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Erro ao buscar seções');
  }

  const rawData: any[] = await response.json();

  const resultado: SectionConfig[] = rawData.map(sec => ({
    id: sec.id,
    sequencia: sec.sequencia ?? 0,
    imagem: sec.imagem ?? '',
    tipo: sec.tipo,
    titulo: sec.titulo,
    tituloVisivel: sec.tituloVisivel,
    itens: (sec.itens ?? []).map((item: any) => ({
      id: item.id,
      secaoId: item.secaoId,
      titulo: item.titulo,
      tituloVisivel: item.tituloVisivel,
      imagem: item.imagem,
      produtos: item.produtos ?? []
    }))
  }));

  return resultado;
};
