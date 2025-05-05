import { Link } from "wouter";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar.tsx";
import { ChatPreview } from "../types/index.ts";

interface ChatListItemProps {
  chat: ChatPreview;
}

export default function ChatListItem({ chat }: ChatListItemProps) {
  return (
    <Link href={`/chats/${chat.id}`}>
      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted cursor-pointer transition">
        <Avatar>
          <AvatarImage src={chat.otherUser.photoURL} />
          <AvatarFallback>{chat.otherUser.displayName[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="font-medium">{chat.otherUser.displayName}</h2>
          <p className="text-sm text-muted-foreground truncate">
            {chat.lastMessage?.content || "Sin mensajes aún"}
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          {chat.lastMessage?.timestamp &&
            format(new Date(chat.lastMessage.timestamp), "HH:mm")}
        </div>
      </div>
    </Link>
  );
} 