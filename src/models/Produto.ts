export interface Produto {
  id: number;
  descricao: string;
  preco: number;
  estoque: number;
  imagemUrl: string;
  categoria: {
    id: number;
    descricao: string;
    imagem: string;
    dataCriacao: number[];
  };
  marca: {
    id: number;
    descricao: string;
    imagem: string;
    dataCriacao: number[];
  };
  dataCriacao: number[];
}
