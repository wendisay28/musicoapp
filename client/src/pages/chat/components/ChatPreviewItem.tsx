// Item individual en la lista de chats: muestra avatar, nombre y último mensaje

import { Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatPreview } from "../types";
import { cn } from "@/lib/utils";

interface Props {
  chat: ChatPreview;
}

export default function ChatPreviewItem({ chat }: Props) {
  const { id, otherUser, lastMessage, unread } = chat;

  return (
    <Link href={`/chats/${id}`} className="block">
      <div
        className={cn(
          "flex items-center gap-3 p-3 rounded-lg transition hover:bg-muted",
          unread && "bg-muted"
        )}
      >
        <Avatar>
          {/* Validamos que photoURL sea un string antes de usarlo */}
          <AvatarImage src={otherUser.photoURL ?? undefined} />
          <AvatarFallback>
            {otherUser.displayName?.[0] ?? "?"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{otherUser.displayName}</p>
          <p className="text-sm text-muted-foreground truncate">
            {lastMessage?.content || "Sin mensajes aún"}
          </p>
        </div>
        {unread && (
          <div className="h-3 w-3 bg-primary rounded-full" />
        )}
      </div>
    </Link>
  );
}
