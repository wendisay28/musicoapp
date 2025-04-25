// Página que lista los chats del usuario actual

import { useEffect, useState } from "react";
import ChatPreviewItem from "./components/ChatPreviewItem";

import { ChatPreview } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatListPage() {
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar los chats del usuario
    fetch("/api/chats")
      .then(res => res.json())
      .then(data => setChats(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Cargando chats...</div>;

  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 border-b text-xl font-bold">Tus chats</header>
      <ScrollArea className="flex-1 p-2 space-y-2">
        {chats.map(chat => (
          <ChatPreviewItem key={chat.id} chat={chat} />
        ))}
      </ScrollArea>
    </div>
  );
}
