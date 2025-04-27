// src/components/TelaProdutos.tsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Produto } from "../../models/Produto";
import {
  buscarProdutosPorDescricao,
  buscarProdutosPorCategoria,
  buscarProdutosPorMarca,
  buscarProdutosPorIds,
} from "../../services/ProdutoService";
import ProdutoCard from "../../components/ProdutoCard";
import "./TelaProdutos.css";

const TelaProdutos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const location = useLocation();

  // Parâmetros de query (quando não vem do banner)
  const categoriaParam = searchParams.get("categoria");
  const marcaParam = searchParams.get("marca");
  const descricaoParam = searchParams.get("descricao") || "";

  useEffect(() => {
    const fetchProdutos = async () => {
      setCarregando(true);
      try {
        // Verifica se a navegação veio com state (do banner)
        const stateData = location.state as { productIds?: number[] } | null;
        let produtosEncontrados: Produto[] = [];

        // Se o state existe E possui a propriedade productIds...
        if (stateData && stateData.productIds !== undefined) {
          // Se o array tem itens, usa-o para buscar os produtos
          if (stateData.productIds.length > 0) {
            produtosEncontrados = await buscarProdutosPorIds(stateData.productIds);
          } else {
            // Se veio do banner mas o array está vazio, podemos optar por:
            // a) Exibir erro
            // setErro("Nenhum produto associado ao banner.");
            // b) Ignorar o state e fazer a busca normal:
            if (categoriaParam) {
              produtosEncontrados = await buscarProdutosPorCategoria(Number(categoriaParam));
            } else if (marcaParam) {
              produtosEncontrados = await buscarProdutosPorMarca(Number(marcaParam));
            } else {
              produtosEncontrados = await buscarProdutosPorDescricao(descricaoParam);
            }
          }
        } else {
          // Se não veio do state (ou seja, navegação normal), faz a busca com base nos parâmetros
          if (categoriaParam) {
            produtosEncontrados = await buscarProdutosPorCategoria(Number(categoriaParam));
          } else if (marcaParam) {
            produtosEncontrados = await buscarProdutosPorMarca(Number(marcaParam));
          } else {
            produtosEncontrados = await buscarProdutosPorDescricao(descricaoParam);
          }
        }
        setProdutos(produtosEncontrados);
      } catch (error: any) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    };

    fetchProdutos();
  }, [categoriaParam, marcaParam, descricaoParam, location.state]);

  if (carregando) return <p>Carregando produtos...</p>;
  if (erro) return <p>Erro ao carregar: {erro}</p>;

  return (
    <div className="tela-produtos">
      <aside className="filtros">
        <h2>Filtros</h2>
        {/* Coloque aqui filtros adicionais se desejar */}
      </aside>

      <main className="lista-produtos">
        <h2>
          Resultados para:{" "}
          {categoriaParam
            ? `Categoria ${categoriaParam}`
            : marcaParam
            ? `Marca ${marcaParam}`
            : descricaoParam}
        </h2>

        {produtos.length === 0 ? (
          <p>Nenhum produto encontrado.</p>
        ) : (
          <div className="grid-produtos">
            {produtos.map((produto) => (
              <div
                key={produto.id}
                onClick={() => navigate(`/produto/${produto.id}`, { state: produto })}
                style={{ cursor: 'pointer' }}
              >
                <ProdutoCard produto={produto} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TelaProdutos;
