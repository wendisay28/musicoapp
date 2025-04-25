// Simula una petición para obtener artículos del blog

import { Blog } from "../types/blog"

export const fetchBlogs = async (): Promise<Blog[]> => {
  // Este arreglo simula datos desde un backend
  return [
    {
      id: "1",
      title: "Cómo destacar como artista en plataformas digitales",
      excerpt: "Consejos prácticos para crecer tu presencia en línea...",
      content: "Contenido completo del artículo...",
      image: "/images/blog1.jpg",
      date: "2025-04-20",
      category: "Consejos"
    },
    {
      id: "2",
      title: "Tendencias de arte digital en 2025",
      excerpt: "Explora los estilos, técnicas y herramientas más populares...",
      content: "Contenido completo del artículo...",
      image: "/images/blog2.jpg",
      date: "2025-04-18",
      category: "Tendencias"
    }
    // Puedes agregar más objetos para pruebas
  ]
}
