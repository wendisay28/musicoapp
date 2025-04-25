// Componente ArtistSection.tsx
// Muestra una cuadrícula de artistas destacados con botón "Ver más" y opción de búsqueda por ubicación

import Link from "next/link";

// Datos simulados de artistas
const artists = [
  {
    id: 1,
    name: "María López",
    specialty: "Pintora",
    image: "/images/artists/maria.jpg",
  },
  {
    id: 2,
    name: "Carlos Pérez",
    specialty: "Músico",
    image: "/images/artists/carlos.jpg",
  },
  {
    id: 3,
    name: "Laura Gómez",
    specialty: "Escultora",
    image: "/images/artists/laura.jpg",
  },
  {
    id: 4,
    name: "Daniel Ruiz",
    specialty: "Fotógrafo",
    image: "/images/artists/daniel.jpg",
  },
];

export default function ArtistSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Artistas recomendados</h2>
        <div className="flex gap-2">
          <Link href="/explore?filter=artistas">
            <span className="text-blue-600 hover:underline cursor-pointer">Ver más</span>
          </Link>
          <Link href="/explore?filter=ubicacion">
            <span className="text-blue-600 hover:underline cursor-pointer">Buscar por ubicación</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {artists.map((artist) => (
          <div key={artist.id} className="bg-white rounded-xl shadow p-4 text-center">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg font-medium">{artist.name}</h3>
            <p className="text-sm text-gray-500">{artist.specialty}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
