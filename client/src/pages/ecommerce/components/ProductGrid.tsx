// Muestra una grilla de productos utilizando el componente ProductCard

import ProductCard from "./ProductCard";
import { Product } from "../types";

interface ProductGridProps {
  products: Product[]; // Lista de productos a mostrar
}

const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        No se encontraron productos.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
