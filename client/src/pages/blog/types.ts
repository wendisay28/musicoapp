// Archivo: src/pages/blog/types.ts
// Tipos usados para los artículos del blog

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    coverImage: string;
    author: {
      name: string;
      avatarUrl: string;
    };
    createdAt: string; // fecha en formato ISO
    tags?: string[];
  }
  