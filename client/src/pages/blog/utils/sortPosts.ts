// sortPosts.ts
// Ordena artículos de blog por fecha (más reciente primero)

export interface BlogPost {
    id: string;
    title: string;
    date: string;
    content: string;
  }
  
  export function sortPosts(posts: BlogPost[]): BlogPost[] {
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  