// Input para escribir un mensaje y botón para enviarlo

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface Props {
  onSend: (msg: string) => void;
}

export default function ChatInput({ onSend }: Props) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
      className="p-4 border-t flex items-center gap-2"
    >
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
        className="flex-1"
      />
      <Button type="submit" size="icon">
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
}
