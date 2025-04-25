// BlogCard.tsx
// Componente que representa una vista previa individual de un artículo del blog

import React from "react";

type BlogCardProps = {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  onClick: () => void;
};

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, image, date, author, onClick }) => {
  return (
    <div className="rounded-xl shadow hover:shadow-md transition cursor-pointer" onClick={onClick}>
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-xl" />
      <div className="p-4">
        <p className="text-sm text-gray-500">{date} • {author}</p>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 mt-2">{excerpt}</p>
      </div>
    </div>
  );
};

export default BlogCard;
