import { Banner } from '../models/Banner';

const URL_API = 'https://omni-sales-production.up.railway.app/banners'; // Substitua pela URL real do endpoint

export const buscarBanners = async (): Promise<Banner[]> => {
  const resposta = await fetch(URL_API);
  if (!resposta.ok) {
    throw new Error('Erro ao buscar os banners.');
  }
  const data = await resposta.json();
  // Se a API retornar um objeto com a propriedade "banners", retorne data.banners
  // Caso contrário, retorne data diretamente se já for um array
  return data.banners || data;
};
