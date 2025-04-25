// Vista previa del blog, muestra artículos recientes con imagen y botón de ver más

import { FC } from "react";
import { Button } from "@/components/ui/button";

// Artículos de blog de ejemplo
const blogPosts = [
  {
    id: 1,
    title: "El renacimiento del arte digital",
    image: "/images/blog1.jpg",
    summary: "Una mirada profunda al crecimiento del arte digital y su impacto en la cultura.",
  },
  {
    id: 2,
    title: "Consejos para artistas emergentes",
    image: "/images/blog2.jpg",
    summary: "Estrategias y herramientas para artistas que inician su camino profesional.",
  },
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
          <div key={post.id} className="rounded-xl overflow-hidden shadow-md bg-white flex flex-col sm:flex-row">
            <img
              src={post.image}
              alt={post.title}
              className="w-full sm:w-48 h-40 object-cover"
            />
            <div className="p-4 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{post.summary}</p>
              </div>
              <Button variant="link" className="mt-2 p-0 text-primary" size="sm">
                Leer más
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogPreview;
