// Componente Header.tsx
// Encabezado principal de la página de inicio. Incluye:
// - Logo o título
// - Barra de búsqueda
// - Botón de notificaciones

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 shadow-sm bg-white sticky top-0 z-50">
      {/* Logo o Título */}
      <div className="text-xl font-bold text-gray-800">MiPlataforma</div>

      {/* Barra de búsqueda */}
      <div className="flex-1 mx-4 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Buscar..."
            className="pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:outline-none"
          />
        </div>
      </div>

      {/* Botón de notificaciones */}
      <Button variant="ghost" size="icon">
        <Bell className="text-gray-600" />
      </Button>
    </header>
  );
}
