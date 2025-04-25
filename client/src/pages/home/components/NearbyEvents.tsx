// Componente NearbyEventsSection.tsx
// Muestra eventos cercanos con imagen, título, fecha y lugar. Incluye botón "Ver más"

import Link from "next/link";

// Datos simulados de eventos
const events = [
  {
    id: 1,
    title: "Feria de Arte Local",
    date: "2025-05-10",
    location: "Bogotá, Colombia",
    image: "/images/events/evento1.jpg",
  },
  {
    id: 2,
    title: "Concierto al Parque",
    date: "2025-05-12",
    location: "Medellín, Colombia",
    image: "/images/events/evento2.jpg",
  },
  {
    id: 3,
    title: "Expo Fotografía Urbana",
    date: "2025-05-15",
    location: "Cali, Colombia",
    image: "/images/events/evento3.jpg",
  },
  {
    id: 4,
    title: "Encuentro de Escultura",
    date: "2025-05-18",
    location: "Cartagena, Colombia",
    image: "/images/events/evento4.jpg",
  },
];

export default function NearbyEventsSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Eventos cercanos</h2>
        <Link href="/explore?filter=eventos">
          <span className="text-blue-600 hover:underline cursor-pointer">Ver más</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow p-4">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg font-medium">{event.title}</h3>
            <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">{event.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
