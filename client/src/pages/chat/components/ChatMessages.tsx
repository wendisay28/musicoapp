// Renderiza la lista de mensajes

import ChatMessage from "@/pages/chat/components/ChatMessage"; // Asegúrate que la ruta sea correcta
import type { ChatMessage as ChatMessageType } from "@/pages/chat/types"; // Asegúrate que el tipo esté exportado correctamente

interface Props {
  messages: ChatMessageType[];
  currentUserId: number;
}

export default function ChatMessages({ messages, currentUserId }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, i) => (
        <ChatMessage
          key={i}
          id={msg.id}
          senderId={msg.senderId}
          senderName={msg.senderName}
          content={msg.content}
          timestamp={new Date(msg.timestamp)}
          isCurrentUser={msg.senderId === currentUserId}
          status={msg.status}
        />
      ))}
    </div>
  );
}
