// sortPosts.ts
// Ordena artículos de blog por fecha (más reciente primero)

import { BlogPost, BlogFilters } from "../types";

export function sortPosts(posts: BlogPost[], filters: BlogFilters = {}): BlogPost[] {
  const { sortBy = 'newest' } = filters;
  
  return [...posts].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'popular':
        // Aquí podríamos implementar lógica basada en vistas o interacciones
        return 0;
      default: // 'newest'
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
}

export function filterPosts(posts: BlogPost[], filters: BlogFilters): BlogPost[] {
  return posts.filter(post => {
    const matchesTag = !filters.tag || post.tags.includes(filters.tag);
    const matchesSearch = !filters.search || 
      post.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      post.summary.toLowerCase().includes(filters.search.toLowerCase());
    const matchesAuthor = !filters.author || 
      post.author.name.toLowerCase().includes(filters.author.toLowerCase());
    const isPublished = post.status === 'published';
    
    return matchesTag && matchesSearch && matchesAuthor && isPublished;
  });
}

export function paginatePosts(posts: BlogPost[], page: number = 1, limit: number = 6): BlogPost[] {
  const startIndex = (page - 1) * limit;
  return posts.slice(startIndex, startIndex + limit);
}
  