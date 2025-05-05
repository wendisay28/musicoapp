import { useParams } from "wouter";
import ChatHeader from "./components/ChatHeader.tsx";
import ChatMessages from "./components/ChatMessages.tsx";
import ChatInput from "./components/ChatInput.tsx";
import { useCurrentChat } from "./hooks/useCurrentChat.ts";

export default function ChatPage() {
  const params = useParams();
  const chatId = parseInt(params?.id || "0");
  const { chat, loading, error, isTyping, sendMessage } = useCurrentChat(chatId);

  if (loading) return <div className="p-4">Cargando chat...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;
  if (!chat) return <div className="p-4">Chat no encontrado</div>;

  const otherUser = chat.participants.find(p => p.id !== chat.currentUserId);
  if (!otherUser) return <div className="p-4">Usuario no encontrado</div>;

  return (
    <div className="h-screen flex flex-col">
      <ChatHeader 
        user={otherUser}
        isTyping={isTyping}
      />
      <ChatMessages 
        messages={chat.messages} 
        currentUserId={chat.currentUserId} 
      />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
} 