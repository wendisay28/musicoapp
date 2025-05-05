// BlogSidebar.tsx
// Barra lateral con categorías o enlaces a los artículos más populares

import React from "react";
import { Button } from "../../../components/ui/button.tsx";

type BlogSidebarProps = {
  onTagSelect: (tag: string) => void;
  selectedTag?: string;
};

const BlogSidebar: React.FC<BlogSidebarProps> = ({ onTagSelect, selectedTag }) => {
  // Ejemplo de tags (en una aplicación real, esto vendría de los posts)
  const tags = [
    "Arte Digital",
    "Pintura",
    "Escultura",
    "Fotografía",
    "Diseño",
    "Consejos",
    "Tutoriales"
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Categorías</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? "default" : "outline"}
            size="sm"
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BlogSidebar;
