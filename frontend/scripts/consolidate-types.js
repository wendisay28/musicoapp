import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorios destino para los tipos consolidados
const SHARED_TYPES_DIR = path.join(__dirname, '..', 'src/features/shared/types');

// Asegurarse de que los directorios existan
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Crear directorios necesarios
ensureDir(SHARED_TYPES_DIR);
ensureDir(path.join(SHARED_TYPES_DIR, 'models'));
ensureDir(path.join(SHARED_TYPES_DIR, 'api'));
ensureDir(path.join(SHARED_TYPES_DIR, 'components'));

// Consolidar tipos de modelos
const modelTypes = `import { ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Artist extends User {
  bio?: string;
  location?: string;
  services: Service[];
  reviews: Review[];
  rating: number;
  availability: Availability[];
}

export interface Event {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  location: string;
  date: string;
  price: number;
  priceUnit: string;
  capacity: number;
  organizer: User;
  attendees: User[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  duration: number;
  category: string;
  images: string[];
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  author: User;
  createdAt: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Availability {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}`;

// Consolidar tipos de API
const apiTypes = `export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface QueryParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  [key: string]: any;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}`;

// Escribir los archivos consolidados
fs.writeFileSync(path.join(SHARED_TYPES_DIR, 'models/index.ts'), modelTypes);
fs.writeFileSync(path.join(SHARED_TYPES_DIR, 'api/index.ts'), apiTypes);

// Actualizar el archivo de barril principal
const mainBarrel = `// Models
export * from './models';

// API Types
export * from './api';

// Component Types
export * from './components';`;

fs.writeFileSync(path.join(SHARED_TYPES_DIR, 'index.ts'), mainBarrel);

console.log('Types consolidation completed!'); 