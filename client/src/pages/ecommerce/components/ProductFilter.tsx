// Muestra filtros para buscar productos por categoría, precio u otros criterios

import { useState } from "react";

interface ProductFilterProps {
  categories: string[]; // Lista de categorías disponibles
  onFilterChange: (filters: { category: string; minPrice: number; maxPrice: number }) => void;
}

const ProductFilter = ({ categories, onFilterChange }: ProductFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleFilter = () => {
    onFilterChange({
      category: selectedCategory,
      minPrice,
      maxPrice,
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Precio mínimo</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Precio máximo</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
          />
        </div>
      </div>

      <button
        onClick={handleFilter}
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
      >
        Aplicar filtros
      </button>
    </div>
  );
};

export default ProductFilter;
