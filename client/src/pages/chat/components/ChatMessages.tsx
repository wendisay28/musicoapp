// Renderiza la lista de mensajes

import { cn } from "../../../lib/utils.ts";
import { ChatMessage as ChatMessageType } from "../types/index.ts";

interface ChatMessageProps {
  message: ChatMessageType;
  currentUserId: number;
}

function ChatMessage({ message, currentUserId }: ChatMessageProps) {
  const isCurrentUser = message.senderId === currentUserId;

  return (
    <div
      className={cn(
        "flex flex-col max-w-md space-y-1",
        isCurrentUser ? "items-end ml-auto" : "items-start mr-auto"
      )}
    >
      <div
        className={cn(
          "rounded-2xl px-4 py-2 text-sm shadow",
          isCurrentUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {message.content}
      </div>
      <div className="text-[10px] text-muted-foreground">
        {new Date(message.timestamp).toLocaleTimeString([], { 
          hour: "2-digit", 
          minute: "2-digit" 
        })}
        {isCurrentUser && message.read ? " • Leído" : ""}
      </div>
    </div>
  );
}

interface ChatMessagesProps {
  messages: ChatMessageType[];
  currentUserId: number;
}

export default function ChatMessages({ messages, currentUserId }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
}
