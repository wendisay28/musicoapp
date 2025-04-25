// generateSlug.ts
// Convierte un título en un slug amigable para la URL (ej: "Mi Blog Post" → "mi-blog-post")

export function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }
  