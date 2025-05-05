// Simula una petición para obtener artículos del blog

import { BlogPost } from "../types";

export const fetchBlogs = async (): Promise<BlogPost[]> => {
  return [
    {
      id: "1",
      title: "Cómo destacar como artista en plataformas digitales",
      slug: "destacar-como-artista-digital",
      summary: "Consejos prácticos para crecer tu presencia en línea...",
      content: "Contenido completo del artículo...",
      coverImage: "/images/blog1.jpg",
      author: {
        name: "Ana Martínez",
        avatarUrl: "/images/authors/ana.jpg"
      },
      tags: ["arte", "digital", "marketing"],
      createdAt: "2025-04-20T10:00:00Z",
      updatedAt: "2025-04-20T10:00:00Z",
      status: "published"
    },
    {
      id: "2",
      title: "Tendencias de arte digital en 2025",
      slug: "tendencias-arte-digital-2025",
      summary: "Explora los estilos, técnicas y herramientas más populares...",
      content: "Contenido completo del artículo...",
      coverImage: "/images/blog2.jpg",
      author: {
        name: "Carlos Rojas",
        avatarUrl: "/images/authors/carlos.jpg"
      },
      tags: ["tendencias", "arte", "digital"],
      createdAt: "2025-04-18T15:00:00Z",
      updatedAt: "2025-04-18T15:00:00Z",
      status: "published"
    }
    // Puedes agregar más objetos para pruebas
  ]
}
