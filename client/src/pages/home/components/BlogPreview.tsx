// Vista previa del blog, muestra artículos recientes con imagen y botón de ver más

import { FC } from "react";
import { Button } from "../../../components/ui/button.tsx";
import { BlogPost } from "../../blog/types.ts";
import BlogCard from "../../blog/components/BlogCard.tsx";

// Artículos de blog de ejemplo
const blogPosts: BlogPost[] = [
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

const BlogPreview: FC = () => {
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Blog & Noticias</h2>
        <Button variant="outline" size="sm">
          Ver más artículos
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default BlogPreview;
