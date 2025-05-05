// BlogArticlePage.tsx
// Página de detalle para un artículo del blog

import React from "react";
import { useParams } from "wouter";
import { dummyPosts } from "./data/dummyPosts";
import { formatDate } from "./utils";

const BlogArticlePage = () => {
  const params = useParams();
  const slug = params?.slug;

  // Encuentra el artículo por slug
  const post = dummyPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-xl text-gray-600">Artículo no encontrado</p>
          <a 
            href="/blog" 
            className="mt-4 inline-block text-primary hover:underline"
          >
            Volver al blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{formatDate(post.createdAt)}</span>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag: string) => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full rounded-xl mb-8"
        />
      )}

      <div className="prose max-w-none">
        <p>{post.content}</p>
      </div>
    </article>
  );
};

export default BlogArticlePage;
