/// Tipos compartidos para la vista de chats

export interface ChatPreview {
    id: number;
    otherUser: {
      id: number;
      displayName: string;
      photoURL?: string;
    };
    lastMessage: {
      content: string;
      timestamp: string;
      senderId: number;
      read: boolean;
    } | null;
    unreadCount: number;
  }
 // Tipo para un mensaje individual
export interface ChatMessage {
    id: number;
    content: string;
    timestamp: string;
    senderId: number;
    read: boolean;
    attachments?: {
      type: "image" | "file";
      url: string;
      name?: string;
    }[];
  }

export interface Chat {
  id: number;
  currentUserId: number;
  participants: {
    id: number;
    displayName: string;
    photoURL?: string;
  }[];
  messages: ChatMessage[];
  isTyping?: boolean;
} 