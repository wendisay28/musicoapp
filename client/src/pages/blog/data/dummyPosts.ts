// Archivo: src/pages/blog/dummyPosts.ts
// Datos simulados de artículos del blog, usados como placeholder antes de conectar con el backend

import { BlogPost } from "./types";

export const dummyPosts: BlogPost[] = [
  {
    id: "1",
    title: "Cómo iniciar tu carrera como artista digital",
    slug: "como-iniciar-carrera-artista-digital",
    summary: "Una guía paso a paso para lanzar tu carrera en el mundo del arte digital.",
    content: `
      <p>Iniciar como artista digital puede parecer abrumador, pero con las herramientas adecuadas y una mentalidad creativa, puedes comenzar a destacar en poco tiempo.</p>
      <p>En este artículo exploramos desde las plataformas recomendadas, hasta cómo construir un portafolio sólido y encontrar tus primeros clientes.</p>
    `,
    coverImage: "/images/blog/artista-digital.jpg",
    author: {
      name: "Laura Méndez",
      avatarUrl: "/images/authors/laura.jpg"
    },
    createdAt: "2024-11-10T10:00:00Z",
    tags: ["arte", "digital", "carrera"]
  },
  {
    id: "2",
    title: "Tendencias creativas para el 2025",
    slug: "tendencias-creativas-2025",
    summary: "Estas son las principales corrientes artísticas que dominarán el nuevo año.",
    content: `
      <p>Desde el arte generativo con IA hasta la estética de los años 2000, el 2025 trae una mezcla de nostalgia y tecnología.</p>
      <p>Conoce las 5 tendencias que transformarán la industria creativa y cómo puedes integrarlas en tu estilo personal.</p>
    `,
    coverImage: "/images/blog/tendencias-2025.jpg",
    author: {
      name: "Carlos Rojas",
      avatarUrl: "/images/authors/carlos.jpg"
    },
    createdAt: "2025-02-02T15:00:00Z",
    tags: ["tendencias", "arte", "inspiración"]
  }
];
