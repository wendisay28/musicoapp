import { useState, useEffect } from 'react';
import { Chat, Message } from '../types';

export function useCurrentChat(chatId: number) {
  const [chat, setChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // TODO: Implementar la lógica real de obtención del chat
    const fetchChat = async () => {
      try {
        // Simulación de una llamada a la API
        const response = await new Promise<Chat>((resolve) => {
          setTimeout(() => {
            resolve({
              id: chatId,
              participants: [
                { id: '1', name: 'Usuario Actual' },
                { id: '2', name: 'Otro Usuario' }
              ],
              messages: [],
              currentUserId: '1'
            });
          }, 1000);
        });

        setChat(response);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error desconocido'));
      } finally {
        setLoading(false);
      }
    };

    fetchChat();
  }, [chatId]);

  const sendMessage = async (content: string) => {
    if (!chat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      senderId: chat.currentUserId,
      timestamp: new Date().toISOString()
    };

    setChat({
      ...chat,
      messages: [...chat.messages, newMessage]
    });

    // TODO: Implementar la lógica real de envío de mensaje
  };

  return {
    chat,
    loading,
    error,
    isTyping,
    sendMessage
  };
} 