// Página que muestra una lista de chats disponibles con vista previa

import { Button } from "../../components/ui/button.tsx";
import { MessageSquare } from "lucide-react";
import ChatListItem from "./components/ChatListItem.tsx";
import { useChats } from "./hooks/useChats.ts";

export default function ChatListPage() {
  const { chats, loading, error } = useChats();

  if (loading) return <div className="p-4">Cargando chats...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="h-screen p-4 bg-background">
      <h1 className="text-xl font-bold mb-4">Tus chats</h1>

      {chats.length === 0 && (
        <p className="text-muted-foreground">No tienes chats activos aún.</p>
      )}

      <div className="space-y-4">
        {chats.map((chat) => (
          <ChatListItem key={chat.id} chat={chat} />
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
