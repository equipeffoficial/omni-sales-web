import { Category } from '../models/Category';

const API_URL = 'https://omni-sales-production.up.railway.app/categorias'; // Substitua pela URL real

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Erro ao buscar as categorias.');
  }
  const data: Category[] = await response.json();
  return data;
};
