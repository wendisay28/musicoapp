import { WebSocket } from 'ws';
import { Socket } from 'socket.io';

// Tipos de métricas
interface Metrics {
  connections: {
    total: number;
    active: number;
    closed: number;
    rejected: number;
  };
  messages: {
    sent: number;
    received: number;
    errors: number;
  };
  performance: {
    avgResponseTime: number;
    maxResponseTime: number;
    minResponseTime: number;
  };
}

// Inicializar métricas
const metrics: Metrics = {
  connections: {
    total: 0,
    active: 0,
    closed: 0,
    rejected: 0
  },
  messages: {
    sent: 0,
    received: 0,
    errors: 0
  },
  performance: {
    avgResponseTime: 0,
    maxResponseTime: 0,
    minResponseTime: Infinity
  }
};

// Historial de tiempos de respuesta
const responseTimes: number[] = [];

// Función para actualizar métricas de conexión
export function updateConnectionMetrics(type: 'connect' | 'disconnect' | 'reject') {
  switch (type) {
    case 'connect':
      metrics.connections.total++;
      metrics.connections.active++;
      break;
    case 'disconnect':
      metrics.connections.active--;
      metrics.connections.closed++;
      break;
    case 'reject':
      metrics.connections.rejected++;
      break;
  }
}

// Función para actualizar métricas de mensajes
export function updateMessageMetrics(type: 'sent' | 'received' | 'error') {
  switch (type) {
    case 'sent':
      metrics.messages.sent++;
      break;
    case 'received':
      metrics.messages.received++;
      break;
    case 'error':
      metrics.messages.errors++;
      break;
  }
}

// Función para actualizar métricas de rendimiento
export function updatePerformanceMetrics(responseTime: number) {
  responseTimes.push(responseTime);
  
  // Actualizar métricas de rendimiento
  metrics.performance.avgResponseTime = 
    responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
  metrics.performance.maxResponseTime = 
    Math.max(metrics.performance.maxResponseTime, responseTime);
  metrics.performance.minResponseTime = 
    Math.min(metrics.performance.minResponseTime, responseTime);
  
  // Mantener solo los últimos 1000 tiempos de respuesta
  if (responseTimes.length > 1000) {
    responseTimes.shift();
  }
}

// Función para obtener métricas actuales
export function getMetrics(): Metrics {
  return {
    ...metrics,
    performance: {
      ...metrics.performance,
      minResponseTime: metrics.performance.minResponseTime === Infinity ? 0 : metrics.performance.minResponseTime
    }
  };
}

// Función para resetear métricas
export function resetMetrics() {
  metrics.connections = {
    total: 0,
    active: 0,
    closed: 0,
    rejected: 0
  };
  metrics.messages = {
    sent: 0,
    received: 0,
    errors: 0
  };
  metrics.performance = {
    avgResponseTime: 0,
    maxResponseTime: 0,
    minResponseTime: Infinity
  };
  responseTimes.length = 0;
} 