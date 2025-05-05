// BlogFilter.tsx
// Filtros para búsqueda por palabra clave o categoría

import React from "react";
import { Input } from "../../../components/ui/input.tsx";

type BlogFilterProps = {
  keyword: string;
  onChangeKeyword: (keyword: string) => void;
};

const BlogFilter: React.FC<BlogFilterProps> = ({ keyword, onChangeKeyword }) => {
  return (
    <div className="mb-6">
      <Input
        type="text"
        placeholder="Buscar artículos..."
        value={keyword}
        onChange={(e) => onChangeKeyword(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default BlogFilter;
