import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import multer, { FileFilterCallback } from 'multer';
import { PrismaClient } from '@prisma/client';
import routes from './routes/routes';

// Tipos personalizados
interface AppError extends Error {
  status?: number;
  code?: string;
  details?: unknown;
}

// Configuración del servidor
dotenv.config();
const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;
const environment = process.env.NODE_ENV || 'development';

// Configuración de multer para manejo de archivos
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 5 // máximo 5 archivos
  },
  fileFilter: (_req: Request, file: { mimetype: string }, cb: FileFilterCallback): void => {
    // Validar tipos de archivo permitidos
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'audio/mpeg', 'audio/wav'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido'));
    }
  }
});

// Middleware de seguridad y optimización
app.use(helmet()); // Seguridad
app.use(compression()); // Compresión GZIP
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Middleware para logging en desarrollo
if (environment === 'development') {
  app.use((req: Request, _res: Response, next: NextFunction): void => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
  });
}

// Routes
app.use('/api', routes);

// Health check con información detallada
app.get('/health', (_req: Request, res: Response): void => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment,
    uptime: process.uptime()
  });
});

// Error handling mejorado
app.use((err: AppError, _req: Request, res: Response, next: NextFunction): void => {
  if (res.headersSent) {
    return next(err);
  }

  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    code: err.code,
    details: err.details
  });

  const status = err.status || 500;
  const response = {
    error: {
      message: err.message || 'Error interno del servidor',
      code: err.code || 'INTERNAL_ERROR',
      ...(environment === 'development' && { stack: err.stack })
    },
    status
  };

  res.status(status).json(response);
});

// 404 handler
app.use((_req: Request, res: Response): void => {
  res.status(404).json({
    error: {
      message: 'Recurso no encontrado',
      code: 'NOT_FOUND'
    },
    status: 404
  });
});

// Manejo de señales de terminación
const gracefulShutdown = async (): Promise<void> => {
  console.log('Iniciando apagado graceful...');
  
  // Cerrar conexión con la base de datos
  await prisma.$disconnect();
  
  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Iniciar servidor
const server = app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port} (${environment})`);
});

// Exportar para testing
export { app, server, prisma };
export type { AppError };