# ArtConect

Plataforma de conexión entre artistas y clientes.

## Estructura del Proyecto

```
artconect/
├── frontend/           # Aplicación React + Vite
│   ├── src/
│   │   ├── components/ # Componentes reutilizables
│   │   ├── features/   # Componentes específicos por funcionalidad
│   │   ├── hooks/      # Hooks personalizados
│   │   ├── lib/        # Utilidades y servicios
│   │   ├── pages/      # Páginas de la aplicación
│   │   ├── services/   # Servicios de API
│   │   └── types/      # Definiciones de tipos
│   └── package.json
│
├── backend/           # API Node.js + Express
│   ├── src/
│   │   ├── controllers/ # Controladores
│   │   ├── middleware/  # Middleware
│   │   ├── routes/      # Rutas de la API
│   │   ├── services/    # Lógica de negocio
│   │   └── lib/         # Utilidades
│   └── package.json
│
└── package.json       # Configuración del monorepo
```

## Requisitos

- Node.js >= 18
- npm >= 9
- PostgreSQL >= 14

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/artconect.git
cd artconect
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
# Frontend (.env)
VITE_API_URL=http://localhost:3000
VITE_FIREBASE_CONFIG={...}

# Backend (.env)
DATABASE_URL=postgresql://...
JWT_SECRET=...
```

4. Iniciar el desarrollo:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Scripts Disponibles

### Frontend
- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run test` - Ejecuta las pruebas
- `npm run lint` - Ejecuta el linter

### Backend
- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila TypeScript
- `npm run start` - Inicia el servidor en producción
- `npm run test` - Ejecuta las pruebas
- `npm run lint` - Ejecuta el linter

## Tecnologías Principales

### Frontend
- React 18
- TypeScript
- Vite
- React Query
- Tailwind CSS
- Radix UI
- React Hook Form
- Zod

### Backend
- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- Socket.IO
- Winston

## Convenciones de Código

- Usar TypeScript estricto
- Seguir el patrón de diseño de componentes
- Implementar pruebas unitarias
- Documentar funciones y componentes
- Usar ESLint y Prettier

## Contribución

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles. 