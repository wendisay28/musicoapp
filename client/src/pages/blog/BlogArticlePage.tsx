// BlogArticlePage.tsx
// Página de detalle para un artículo del blog

import React from "react";
import { useParams } from "react-router-dom";
import { dummyPosts } from "./data/dummyPosts";
import { formatDate } from "./utils";

const BlogArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();

  // Encuentra el artículo por slug (creado desde el título)
  const post = dummyPosts.find((p) => p.slug === slug);

  if (!post) return <div className="p-4">Artículo no encontrado</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{formatDate(post.date)}</p>
      <img
        src={post.image}
        alt={post.title}
        className="w-full rounded-xl mb-6"
      />
      <div className="prose max-w-none">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default BlogArticlePage;
