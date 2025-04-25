/// Tipos compartidos para la vista de chats

export interface ChatPreview {
    id: number;
    otherUser: {
      id: number;
      displayName: string;
      photoURL: string | null;
    };
    lastMessage: {
      content: string;
      timestamp: string;
    } | null;
    unread: boolean;
  }
 // Tipo para un mensaje individual
export interface ChatMessage {
    id: number;
    senderId: number;
    senderName: string;
    content: string;
    timestamp: string; // o Date si ya viene como objeto
    status?: "sent" | "delivered" | "read";
  } 