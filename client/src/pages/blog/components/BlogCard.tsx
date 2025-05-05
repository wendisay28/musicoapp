// BlogCard.tsx
// Componente que representa una vista previa individual de un artículo del blog

import React from "react";
import { BlogPost } from "../types.ts";
import { Link } from "wouter";

type BlogCardProps = {
  post: BlogPost;
};

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="rounded-xl shadow hover:shadow-md transition cursor-pointer">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-48 object-cover rounded-t-xl" 
        />
        <div className="p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>{post.createdAt}</span>
            <span>•</span>
            <span>{post.author.name}</span>
          </div>
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-gray-600 mt-2">{post.summary}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 mt-3">
              {post.tags.map(tag => (
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
      </div>
    </Link>
  );
};

export default BlogCard;
