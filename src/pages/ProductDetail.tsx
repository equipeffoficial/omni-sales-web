// ProductDetail.tsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Produto } from "../models/Produto";
import "./ProductDetail.css";
import { buscarProdutoPorId } from "../services/ProdutoService";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [produto, setProduto] = useState<Produto | null>(
    location.state as Produto | null
  );
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!produto && id) {
      buscarProdutoPorId(Number(id))
        .then((data) => {
          setProduto(data);
          setCarregando(false);
        })
        .catch((error) => {
          console.error("Erro ao buscar produto:", error);
          setErro("Produto não encontrado.");
          setCarregando(false);
        });
    } else {
      setCarregando(false);
    }
  }, [id, produto]);

  if (carregando) return <p>Carregando produto...</p>;
  if (erro) return <p>{erro}</p>;

  if (!produto) {
    return (
      <div className="product-detail">
        <h2>Produto não encontrado</h2>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <button className="btn-back" onClick={() => navigate(-1)}>Voltar</button>
      <div className="product-main-image">
        <img src={produto.imagemUrl} alt={produto.descricao} />
      </div>
      <div className="product-info">
        <h1>{produto.descricao}</h1>
        <p className="price">
          R$ {produto.preco ? produto.preco.toFixed(2).replace(".", ",") : "0,00"}
        </p>
        <p><strong>Estoque:</strong> {produto.estoque}</p>
        {/* Ajuste o model para que categoria e marca sejam objetos, se for o caso */}
        <p><strong>Categoria:</strong> {produto.categoria.descricao}</p>
        <p><strong>Marca:</strong> {produto.marca.descricao}</p>
        <button className="btn-add-to-cart">Adicionar ao Carrinho</button>
      </div>
    </div>
  );
};

export default ProductDetail;
