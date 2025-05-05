import { WebSocketServer, WebSocket } from 'ws';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import logger from './logger';
import { updateConnectionMetrics, updateMessageMetrics, updatePerformanceMetrics } from './metrics';
import { checkRateLimit, incrementConnections, incrementMessages, decrementConnections } from './rate-limiter';

// Cargar variables de entorno
dotenv.config();

// Tipos de mensajes
interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  data?: any;
}

// Configuración de seguridad
const SECURITY_CONFIG = {
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  maxConnections: parseInt(process.env.MAX_CONNECTIONS || '1000', 10),
  messageSizeLimit: parseInt(process.env.MESSAGE_SIZE_LIMIT || '1048576', 10), // 1MB
  pingTimeout: parseInt(process.env.PING_TIMEOUT || '60000', 10),
  pingInterval: parseInt(process.env.PING_INTERVAL || '25000', 10)
};

// Crear servidor HTTP
const httpServer = createServer();

// Crear servidor WebSocket con configuración de seguridad
const wss = new WebSocketServer({ 
  server: httpServer,
  maxPayload: SECURITY_CONFIG.messageSizeLimit,
  perMessageDeflate: {
    zlibDeflateOptions: {
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    clientNoContextTakeover: true,
    serverNoContextTakeover: true,
    serverMaxWindowBits: 10,
    concurrencyLimit: 10,
    threshold: 1024
  }
});

// Crear servidor Socket.IO con configuración de seguridad
const io = new Server(httpServer, {
  cors: {
    origin: SECURITY_CONFIG.allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"]
  },
  maxHttpBufferSize: SECURITY_CONFIG.messageSizeLimit,
  pingTimeout: SECURITY_CONFIG.pingTimeout,
  pingInterval: SECURITY_CONFIG.pingInterval,
  connectTimeout: 45000,
  transports: ['websocket', 'polling']
});

// Almacenar conexiones activas con límite
const clients = new Set<WebSocket>();

// Middleware de autenticación
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    logger.warn('Intento de conexión sin token', { ip: socket.handshake.address });
    return next(new Error('No autorizado'));
  }
  // Aquí iría la lógica de verificación del token
  // Por ahora solo simulamos la verificación
  if (token === 'valid-token') {
    return next();
  }
  logger.warn('Token inválido', { ip: socket.handshake.address });
  return next(new Error('Token inválido'));
});

// Middleware de rate limiting
io.use((socket, next) => {
  const ip = socket.handshake.address;
  const rateLimitCheck = checkRateLimit(ip);
  
  if (!rateLimitCheck.allowed) {
    logger.warn('Rate limit excedido', { ip, message: rateLimitCheck.message });
    return next(new Error(rateLimitCheck.message));
  }
  
  incrementConnections(ip);
  next();
});

// Manejar conexiones WebSocket
wss.on('connection', (ws, req) => {
  const startTime = Date.now();
  const ip = req.socket.remoteAddress || 'unknown';
  
  // Verificar rate limit
  const rateLimitCheck = checkRateLimit(ip);
  if (!rateLimitCheck.allowed) {
    logger.warn('Rate limit excedido en WebSocket', { ip, message: rateLimitCheck.message });
    ws.close(1008, rateLimitCheck.message);
    return;
  }

  // Verificar origen
  const origin = req.headers.origin;
  if (origin && !SECURITY_CONFIG.allowedOrigins.includes(origin)) {
    logger.warn('Origen no permitido', { ip, origin });
    ws.close(1008, 'Origen no permitido');
    return;
  }

  // Verificar límite de conexiones
  if (clients.size >= SECURITY_CONFIG.maxConnections) {
    logger.warn('Límite de conexiones alcanzado', { ip });
    ws.close(1008, 'Límite de conexiones alcanzado');
    return;
  }

  logger.info('Nueva conexión WebSocket', { ip });
  clients.add(ws);
  incrementConnections(ip);
  updateConnectionMetrics('connect');

  // Configurar ping-pong
  const pingInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.ping();
    } else {
      clearInterval(pingInterval);
    }
  }, SECURITY_CONFIG.pingInterval);

  // Manejar mensajes
  ws.on('message', (message) => {
    const messageStartTime = Date.now();
    try {
      // Verificar tamaño del mensaje
      const messageStr = message.toString();
      if (messageStr.length > SECURITY_CONFIG.messageSizeLimit) {
        logger.warn('Mensaje demasiado grande', { ip, size: messageStr.length });
        ws.send(JSON.stringify({ error: 'Mensaje demasiado grande' }));
        return;
      }

      // Verificar rate limit de mensajes
      incrementMessages(ip);
      const data = JSON.parse(messageStr);
      logger.info('Mensaje recibido', { ip, type: data.type });
      updateMessageMetrics('received');

      // Broadcast a todos los clientes
      clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
          updateMessageMetrics('sent');
        }
      });

      // Actualizar métricas de rendimiento
      const responseTime = Date.now() - messageStartTime;
      updatePerformanceMetrics(responseTime);
    } catch (error) {
      logger.error('Error al procesar mensaje', { ip, error });
      updateMessageMetrics('error');
      ws.send(JSON.stringify({ error: 'Error al procesar mensaje' }));
    }
  });

  // Manejar cierre de conexión
  ws.on('close', () => {
    logger.info('Conexión WebSocket cerrada', { ip });
    clearInterval(pingInterval);
    clients.delete(ws);
    decrementConnections(ip);
    updateConnectionMetrics('disconnect');
  });

  // Manejar errores
  ws.on('error', (error) => {
    logger.error('Error en WebSocket', { ip, error });
    clearInterval(pingInterval);
    clients.delete(ws);
    decrementConnections(ip);
    updateConnectionMetrics('disconnect');
  });
});

// Manejar conexiones Socket.IO
io.on('connection', (socket) => {
  const ip = socket.handshake.address;
  logger.info('Nueva conexión Socket.IO', { ip });

  // Manejar mensajes
  socket.on('notification', (data) => {
    const startTime = Date.now();
    try {
      // Verificar tamaño del mensaje
      if (JSON.stringify(data).length > SECURITY_CONFIG.messageSizeLimit) {
        logger.warn('Notificación demasiado grande', { ip, size: JSON.stringify(data).length });
        socket.emit('error', 'Mensaje demasiado grande');
        return;
      }

      // Verificar rate limit de mensajes
      incrementMessages(ip);
      logger.info('Notificación recibida', { ip, type: data.type });
      updateMessageMetrics('received');

      // Broadcast a todos los clientes
      io.emit('notification', data);
      updateMessageMetrics('sent');

      // Actualizar métricas de rendimiento
      const responseTime = Date.now() - startTime;
      updatePerformanceMetrics(responseTime);
    } catch (error) {
      logger.error('Error al procesar notificación', { ip, error });
      updateMessageMetrics('error');
      socket.emit('error', 'Error al procesar notificación');
    }
  });

  // Manejar desconexión
  socket.on('disconnect', () => {
    logger.info('Conexión Socket.IO cerrada', { ip });
    decrementConnections(ip);
    updateConnectionMetrics('disconnect');
  });
});

// Iniciar servidor
const PORT = process.env.WS_PORT || 3001;
httpServer.listen(PORT, () => {
  logger.info(`Servidor WebSocket escuchando en puerto ${PORT}`);
});

// Función para enviar notificaciones
export function sendNotification(notification: Notification) {
  const startTime = Date.now();
  const message = JSON.stringify(notification);
  
  // Verificar tamaño del mensaje
  if (message.length > SECURITY_CONFIG.messageSizeLimit) {
    logger.error('Error al enviar notificación: mensaje demasiado grande');
    throw new Error('Mensaje demasiado grande');
  }
  
  // Enviar a clientes WebSocket
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
      updateMessageMetrics('sent');
    }
  });

  // Enviar a clientes Socket.IO
  io.emit('notification', notification);
  updateMessageMetrics('sent');

  // Actualizar métricas de rendimiento
  const responseTime = Date.now() - startTime;
  updatePerformanceMetrics(responseTime);
}

export { httpServer, wss, io };