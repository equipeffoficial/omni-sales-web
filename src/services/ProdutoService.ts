import { Produto } from '../models/Produto';


const BASE_URL = 'http://localhost:8080/produtos';

export const buscarProdutos = async (): Promise<Produto[]> => {
  const resposta = await fetch(`${BASE_URL}?descricao=`);
  if (!resposta.ok) {
    throw new Error('Erro ao buscar os produtos.');
  }
  const data = await resposta.json();
  return data.produtos;
};

export const buscarProdutosPorDescricao = async (
  descricao: string
): Promise<Produto[]> => {
  const url = `${BASE_URL}?descricao=${descricao}`;
  const resposta = await fetch(url);
  if (!resposta.ok) {
    throw new Error('Erro ao buscar os produtos.');
  }
  const data = await resposta.json();
  return data.produtos;
};

export const buscarProdutoPorId = async (id: number): Promise<Produto> => {
  const url = `${BASE_URL}/${id}`;  // Corrige a URL para o ambiente certo
  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error(`Erro ao buscar o produto ID ${id}`);
  }

  return await resposta.json();
};

export const buscarProdutosPorIds = async (ids: number[]): Promise<Produto[]> => {
  const query = ids.join(',');
  const url = `${BASE_URL}/por-ids?ids=${query}`;
  const resposta = await fetch(url);
  if (!resposta.ok) {
    throw new Error(`Erro ao buscar os produtos pelos IDs: ${ids}`);
  }
  return await resposta.json();
};



export const buscarProdutosPorCategoria = async (
  categoriaId: number
): Promise<Produto[]> => {
  const url = `${BASE_URL}/categoria/${categoriaId}`;
  const resposta = await fetch(url);
  if (!resposta.ok) {
    throw new Error('Erro ao buscar os produtos por categoria.');
  }
  const data = await resposta.json();
  return data;
};

export const buscarProdutosPorMarca = async (
  marcaId: number
): Promise<Produto[]> => {
  const url = `${BASE_URL}/marca/${marcaId}`;
  const resposta = await fetch(url);
  if (!resposta.ok) {
    throw new Error('Erro ao buscar os produtos por marca.');
  }
  const data = await resposta.json();
  return data;
};
