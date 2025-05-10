import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import { logger } from './logger';

interface WebSocketMessage {
  type: string;
  payload: any;
}

class WebSocketManager {
  private io: SocketServer;
  private connectedClients: Map<string, any>;

  constructor(server: Server) {
    this.io = new SocketServer(server, {
      cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
    });

    this.connectedClients = new Map();

    this.io.on('connection', (socket) => {
      logger.info(`Cliente conectado: ${socket.id}`);
      this.connectedClients.set(socket.id, socket);

      socket.on('disconnect', () => {
        logger.info(`Cliente desconectado: ${socket.id}`);
        this.connectedClients.delete(socket.id);
      });

      socket.on('error', (error) => {
        logger.error(`Error en socket ${socket.id}:`, error);
      });
    });
  }

  // Enviar mensaje a todos los clientes
  broadcast(message: WebSocketMessage) {
    this.io.emit(message.type, message.payload);
  }

  // Enviar mensaje a un cliente específico
  sendToClient(clientId: string, message: WebSocketMessage) {
    const client = this.connectedClients.get(clientId);
    if (client) {
      client.emit(message.type, message.payload);
    } else {
      logger.warn(`Cliente no encontrado: ${clientId}`);
    }
  }

  // Enviar mensaje a todos los clientes excepto al remitente
  broadcastToOthers(senderId: string, message: WebSocketMessage) {
    this.io.except(senderId).emit(message.type, message.payload);
  }

  // Enviar mensaje a una sala específica
  sendToRoom(room: string, message: WebSocketMessage) {
    this.io.to(room).emit(message.type, message.payload);
  }

  // Unir un cliente a una sala
  joinRoom(clientId: string, room: string) {
    const client = this.connectedClients.get(clientId);
    if (client) {
      client.join(room);
      logger.info(`Cliente ${clientId} unido a la sala ${room}`);
    }
  }

  // Sacar un cliente de una sala
  leaveRoom(clientId: string, room: string) {
    const client = this.connectedClients.get(clientId);
    if (client) {
      client.leave(room);
      logger.info(`Cliente ${clientId} salió de la sala ${room}`);
    }
  }

  // Obtener el número de clientes conectados
  getConnectedClientsCount(): number {
    return this.connectedClients.size;
  }

  // Obtener el número de clientes en una sala
  getRoomClientsCount(room: string): number {
    return this.io.sockets.adapter.rooms.get(room)?.size || 0;
  }
}

export default WebSocketManager; 