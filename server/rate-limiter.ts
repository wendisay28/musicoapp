import { WebSocket } from 'ws';
import { Socket } from 'socket.io';

// Configuración de rate limiting
const RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000, // 1 minuto
  maxConnections: 100, // Máximo de conexiones por IP
  maxMessages: 1000, // Máximo de mensajes por conexión
  blockDuration: 5 * 60 * 1000 // 5 minutos de bloqueo
};

// Almacenar información de rate limiting
interface RateLimitInfo {
  connections: number;
  messages: number;
  blockedUntil?: number;
}

const rateLimits = new Map<string, RateLimitInfo>();

// Función para verificar rate limit
export function checkRateLimit(ip: string): { allowed: boolean; message?: string } {
  const now = Date.now();
  let info = rateLimits.get(ip);

  if (!info) {
    info = { connections: 0, messages: 0 };
    rateLimits.set(ip, info);
  }

  // Verificar si está bloqueado
  if (info.blockedUntil && now < info.blockedUntil) {
    return {
      allowed: false,
      message: `IP bloqueada hasta ${new Date(info.blockedUntil).toISOString()}`
    };
  }

  // Verificar límite de conexiones
  if (info.connections >= RATE_LIMIT_CONFIG.maxConnections) {
    info.blockedUntil = now + RATE_LIMIT_CONFIG.blockDuration;
    return {
      allowed: false,
      message: 'Límite de conexiones excedido'
    };
  }

  // Verificar límite de mensajes
  if (info.messages >= RATE_LIMIT_CONFIG.maxMessages) {
    info.blockedUntil = now + RATE_LIMIT_CONFIG.blockDuration;
    return {
      allowed: false,
      message: 'Límite de mensajes excedido'
    };
  }

  return { allowed: true };
}

// Función para incrementar contador de conexiones
export function incrementConnections(ip: string) {
  const info = rateLimits.get(ip) || { connections: 0, messages: 0 };
  info.connections++;
  rateLimits.set(ip, info);
}

// Función para incrementar contador de mensajes
export function incrementMessages(ip: string) {
  const info = rateLimits.get(ip) || { connections: 0, messages: 0 };
  info.messages++;
  rateLimits.set(ip, info);
}

// Función para decrementar contador de conexiones
export function decrementConnections(ip: string) {
  const info = rateLimits.get(ip);
  if (info) {
    info.connections = Math.max(0, info.connections - 1);
    rateLimits.set(ip, info);
  }
}

// Limpiar rate limits antiguos
setInterval(() => {
  const now = Date.now();
  for (const [ip, info] of rateLimits.entries()) {
    if (info.connections === 0 && (!info.blockedUntil || now > info.blockedUntil)) {
      rateLimits.delete(ip);
    }
  }
}, RATE_LIMIT_CONFIG.windowMs); 