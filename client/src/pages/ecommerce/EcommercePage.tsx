// src/pages/ecommerce/EcommercePage.tsx
// Página principal del ecommerce que renderiza los productos con sus filtros

import React, { useState } from "react";
import ProductFilter from "./components/ProductFilter";
import ProductGrid from "./components/ProductGrid";
import { dummyProducts } from "./dummyProducts";
import { Product } from "./types";

const EcommercePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  // Filtramos los productos si hay una categoría seleccionada
  const filteredProducts: Product[] =
    selectedCategory === "Todos"
      ? dummyProducts
      : dummyProducts.filter(
          (product) => product.category === selectedCategory
        );

  // Obtenemos las categorías únicas de los productos
  const categories = Array.from(
    new Set(dummyProducts.map((product) => product.category))
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
      <ProductFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default EcommercePage;
