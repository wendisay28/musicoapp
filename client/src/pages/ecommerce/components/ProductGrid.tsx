// Muestra una grilla de productos utilizando el componente ProductCard

import { Product } from "../types.js";
import ProductCard from "./ProductCard.jsx";
import { GridList } from "../../../components/ui/GridList.jsx";

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  favorites?: string[];
  loading?: boolean;
}

export default function ProductGrid({
  products,
  onAddToCart,
  onToggleFavorite,
  favorites = [],
  loading = false,
}: ProductGridProps) {
  return (
    <GridList
      items={products}
      renderItem={(product) => (
        <ProductCard
          product={product}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.includes(product.id)}
        />
      )}
      gridClassName="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      loading={loading}
      emptyMessage="No hay productos disponibles"
    />
  );
}
