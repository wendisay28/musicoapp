// BlogPage.tsx
// Página principal del blog, lista de artículos con vista previa

import React, { useState } from "react";
import BlogCard from "./components/BlogCard.tsx";
import BlogFilter from "./components/BlogFilter.tsx";
import BlogSidebar from "./components/BlogSidebar.tsx";
import { BlogPost } from "./types.ts";

const BlogPage = () => {
  const [keyword, setKeyword] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>();

  // Ejemplo de posts (en una aplicación real, esto vendría de una API)
  const dummyPosts: BlogPost[] = [
    {
      id: "1",
      title: "El renacimiento del arte digital",
      slug: "renacimiento-arte-digital",
      content: "",
      summary: "Una mirada profunda al crecimiento del arte digital y su impacto en la cultura.",
      coverImage: "/images/blog1.jpg",
      author: {
        name: "Artista Digital",
        avatarUrl: "/images/avatar1.jpg"
      },
      tags: ["Arte Digital", "Cultura"],
      createdAt: "2024-04-01",
      updatedAt: "2024-04-01",
      status: "published",
      featured: true
    },
    {
      id: "2",
      title: "Consejos para artistas emergentes",
      slug: "consejos-artistas-emergentes",
      content: "",
      summary: "Estrategias y herramientas para artistas que inician su camino profesional.",
      coverImage: "/images/blog2.jpg",
      author: {
        name: "Experto en Arte",
        avatarUrl: "/images/avatar2.jpg"
      },
      tags: ["Consejos", "Desarrollo Profesional"],
      createdAt: "2024-04-02",
      updatedAt: "2024-04-02",
      status: "published",
      featured: true
    }
  ];

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag === selectedTag ? undefined : tag);
  };

  const filteredPosts = dummyPosts.filter(post => {
    const matchesKeyword = post.title.toLowerCase().includes(keyword.toLowerCase()) ||
      post.summary.toLowerCase().includes(keyword.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesKeyword && matchesTag;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <BlogSidebar onTagSelect={handleTagSelect} selectedTag={selectedTag} />
        </div>

        {/* Contenido principal del blog */}
        <div className="md:col-span-3">
          <BlogFilter
            keyword={keyword}
            onChangeKeyword={setKeyword}
          />

          <div className="grid gap-6">
            {filteredPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
