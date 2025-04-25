// BlogFilter.tsx
// Filtros para búsqueda por palabra clave o categoría

import React from "react";

type BlogFilterProps = {
  keyword: string;
  onChangeKeyword: (value: string) => void;
};

const BlogFilter: React.FC<BlogFilterProps> = ({ keyword, onChangeKeyword }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar artículos..."
        value={keyword}
        onChange={(e) => onChangeKeyword(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default BlogFilter;
