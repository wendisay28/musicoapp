// Input para escribir un mensaje y botón para enviarlo

import { useState } from "react";
import { Input } from "../../../components/ui/input.tsx";
import { Button } from "../../../components/ui/button.tsx";
import { Send } from "lucide-react";

interface Props {
  onSendMessage: (content: string) => Promise<void>;
}

export default function ChatInput({ onSendMessage }: Props) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    await onSendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
        className="flex-1"
      />
      <Button type="submit" size="icon">
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}
