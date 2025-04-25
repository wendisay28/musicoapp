// Componente BannerCarousel.tsx
// Muestra un carrusel de eventos destacados con imágenes promocionales.
// Utiliza react-slick para crear un slider simple.

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Datos simulados para los banners de eventos
const banners = [
  {
    id: 1,
    imageUrl: "/images/evento1.jpg",
    title: "Festival de Arte 2025",
    description: "Explora el talento local en vivo.",
  },
  {
    id: 2,
    imageUrl: "/images/evento2.jpg",
    title: "Concierto al Aire Libre",
    description: "Una noche inolvidable con grandes artistas.",
  },
  {
    id: 3,
    imageUrl: "/images/evento3.jpg",
    title: "Feria Cultural",
    description: "Gastronomía, música y arte en un solo lugar.",
  },
];

export default function BannerCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-4">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="px-2">
            <div
              className="h-56 md:h-72 rounded-xl bg-cover bg-center relative flex items-end overflow-hidden"
              style={{ backgroundImage: `url(${banner.imageUrl})` }}
            >
              <div className="bg-black/50 w-full text-white p-4">
                <h2 className="text-lg md:text-2xl font-bold">{banner.title}</h2>
                <p className="text-sm md:text-base">{banner.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
