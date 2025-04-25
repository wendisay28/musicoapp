// Página principal de la aplicación: HomePage
// Contiene el header, carrusel de eventos, artistas recomendados,
// eventos cercanos, productos del marketplace y artículos del blog.

import { FC } from "react";
import Header from "./components/Header";
import BannerCarousel from "./components/BannerCarousel";
import RecommendedArtists from "./components/RecommendedArtists";
import NearbyEvents from "./components/NearbyEvents";
import MarketplacePreview from "./components/MarketplacePreview";
import BlogPreview from "./components/BlogPreview";

const HomePage: FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Encabezado con buscador y notificaciones */}
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-10">
        {/* Carrusel de eventos destacados */}
        <BannerCarousel />

        {/* Artistas recomendados con botón de ver más */}
        <RecommendedArtists />

        {/* Eventos cercanos con tarjeta */}
        <NearbyEvents />

        {/* Vista previa del marketplace de productos */}
        <MarketplacePreview />

        {/* Vista previa del blog */}
        <BlogPreview />
      </main>
    </div>
  );
};

export default HomePage;
