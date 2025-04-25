// BlogSidebar.tsx
// Barra lateral con categorías o enlaces a los artículos más populares

import React from "react";

type BlogSidebarProps = {
  categories: string[];
  onSelectCategory: (category: string) => void;
};

const BlogSidebar: React.FC<BlogSidebarProps> = ({ categories, onSelectCategory }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Categorías</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => onSelectCategory(category)}
            className="cursor-pointer text-blue-600 hover:underline"
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogSidebar;
