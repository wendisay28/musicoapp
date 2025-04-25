// Componente para mostrar un único mensaje de chat

import { cn } from "@/lib/utils";

interface ChatMessageProps {
  id: number;
  senderId: number;
  senderName: string;
  content: string;
  timestamp: Date;
  isCurrentUser: boolean;
  status?: "sent" | "delivered" | "read";
}

export default function ChatMessage({
  senderName,
  content,
  timestamp,
  isCurrentUser,
  status,
}: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex flex-col max-w-md space-y-1",
        isCurrentUser ? "items-end ml-auto" : "items-start mr-auto"
      )}
    >
      {!isCurrentUser && (
        <span className="text-xs text-muted-foreground">{senderName}</span>
      )}
      <div
        className={cn(
          "rounded-2xl px-4 py-2 text-sm shadow",
          isCurrentUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {content}
      </div>
      <div className="text-[10px] text-muted-foreground">
        {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        {isCurrentUser && status ? ` • ${status}` : ""}
      </div>
    </div>
  );
}
