// Archivo: src/pages/blog/types.ts
// Tipos usados para los artículos del blog

export interface Author {
  name: string;
  avatarUrl: string;
  bio?: string;
  social?: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  coverImage: string;
  author: Author;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  readingTime?: number;
  status: 'published' | 'draft';
  featured?: boolean;
  relatedPosts?: string[];
}

export interface BlogFilters {
  tag?: string;
  search?: string;
  author?: string;
  page?: number;
  limit?: number;
  sortBy?: 'newest' | 'oldest' | 'popular';
}
  