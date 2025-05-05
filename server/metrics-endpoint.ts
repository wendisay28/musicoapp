import { createServer } from 'http';
import { getMetrics } from './metrics';
import logger from './logger';

// Crear servidor HTTP para métricas
const metricsServer = createServer((req, res) => {
  if (req.url === '/metrics') {
    try {
      const metrics = getMetrics();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(metrics, null, 2));
      logger.info('Métricas solicitadas');
    } catch (error) {
      logger.error('Error al obtener métricas', { error });
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Error al obtener métricas' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
  }
});

// Iniciar servidor de métricas
const METRICS_PORT = process.env.METRICS_PORT || 3002;
metricsServer.listen(METRICS_PORT, () => {
  logger.info(`Servidor de métricas escuchando en puerto ${METRICS_PORT}`);
});

export { metricsServer }; 