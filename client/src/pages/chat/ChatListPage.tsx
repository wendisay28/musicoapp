// Página que muestra una lista de chats disponibles con vista previa

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "wouter";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface ChatPreview {
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
}

export default function ChatListPage() {
  const [chats, setChats] = useState<ChatPreview[]>([]);

  useEffect(() => {
    // Obtener lista de chats desde el backend
    fetch("/api/chats")
      .then(res => res.json())
      .then(setChats)
      .catch(console.error);
  }, []);

  return (
    <div className="h-screen p-4 bg-background">
      <h1 className="text-xl font-bold mb-4">Tus chats</h1>

      {chats.length === 0 && (
        <p className="text-muted-foreground">No tienes chats activos aún.</p>
      )}

      <div className="space-y-4">
        {chats.map((chat) => (
          <Link href={`/chats/${chat.id}`} key={chat.id}>
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
        ))}
      </div>

      <div className="fixed bottom-4 right-4">
        <Button variant="outline" size="icon">
          <MessageSquare className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
