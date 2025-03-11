import { Produto } from '../models/Produto';

const URL_API = 'https://omni-sales-production.up.railway.app/produtos?descricao='; 

export const buscarProdutos = async (): Promise<Produto[]> => {
  const resposta = await fetch(URL_API);
  if (!resposta.ok) {
    throw new Error('Erro ao buscar os produtos.');
  }
  const data = await resposta.json();
  // 'data' é um objeto que tem { produtos: [...], totalPages, ... }
  // Então retornamos somente o array 'produtos'
  return data.produtos;
};
