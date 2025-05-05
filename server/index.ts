import { httpServer, wss, io } from './websocket';
import { metricsServer } from './metrics-endpoint';
import logger from './logger';

// Manejar cierre limpio
process.on('SIGTERM', () => {
  logger.info('Recibida señal SIGTERM, cerrando servidores...');
  
  // Cerrar servidor WebSocket
  wss.close(() => {
    logger.info('Servidor WebSocket cerrado');
  });
  
  // Cerrar servidor Socket.IO
  io.close(() => {
    logger.info('Servidor Socket.IO cerrado');
  });
  
  // Cerrar servidor HTTP
  httpServer.close(() => {
    logger.info('Servidor HTTP cerrado');
  });
  
  // Cerrar servidor de métricas
  metricsServer.close(() => {
    logger.info('Servidor de métricas cerrado');
  });
});

// Manejar errores no capturados
process.on('uncaughtException', (error) => {
  logger.error('Error no capturado', { error });
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Promesa rechazada no manejada', { reason, promise });
}); 