// BlogPage.tsx
// Página principal del blog, lista de artículos con vista previa

import React from "react";
import BlogCard from "./components/BlogCard";
import BlogFilter from "./components/BlogFilter";
import BlogSidebar from "./components/BlogSidebar";
import { dummyPosts } from "./data/dummyPosts";
import { sortPosts } from "./utils";

const BlogPage = () => {
  // Ordena los posts por fecha más reciente
  const sortedPosts = sortPosts(dummyPosts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
      {/* Sidebar con categorías, autores, etc */}
      <div className="md:col-span-1">
        <BlogSidebar />
      </div>

      {/* Contenido principal del blog */}
      <div className="md:col-span-3 space-y-4">
        <BlogFilter />
        {sortedPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
