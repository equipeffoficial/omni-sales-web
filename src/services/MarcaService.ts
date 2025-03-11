import { Marca } from '../models/Marca';

const URL_API = 'https://omni-sales-production.up.railway.app/marcas';

export const buscarMarcas = async (): Promise<Marca[]> => {
  const resposta = await fetch(URL_API);
  if (!resposta.ok) {
    throw new Error('Erro ao buscar as marcas.');
  }
  const dados: Marca[] = await resposta.json();
  return dados;
};
