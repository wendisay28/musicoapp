import { Counter, Histogram, Registry } from 'prom-client';
import { Request, Response, NextFunction } from 'express';

// Crear un registro de métricas
const register = new Registry();

// Contador de peticiones HTTP
const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total de peticiones HTTP',
  labelNames: ['method', 'route', 'status'],
  registers: [register],
});

// Histograma de duración de peticiones
const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duración de las peticiones HTTP en segundos',
  labelNames: ['method', 'route'],
  buckets: [0.1, 0.5, 1, 2, 5],
  registers: [register],
});

// Contador de errores
const httpErrorsTotal = new Counter({
  name: 'http_errors_total',
  help: 'Total de errores HTTP',
  labelNames: ['method', 'route', 'status'],
  registers: [register],
});

// Middleware para registrar métricas
export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const route = req.route?.path || req.path;

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const status = res.statusCode;

    // Registrar la petición
    httpRequestsTotal.inc({ method: req.method, route, status });

    // Registrar la duración
    httpRequestDuration.observe({ method: req.method, route }, duration);

    // Registrar errores
    if (status >= 400) {
      httpErrorsTotal.inc({ method: req.method, route, status });
    }
  });

  next();
};

// Función para obtener las métricas
export const getMetrics = async () => {
  return await register.metrics();
};

export { register }; 