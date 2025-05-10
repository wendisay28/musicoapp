import React from 'react';
import { useState, useEffect } from "react";
export function useCurrentChat (props: any)chatId) {
    const [chat, setChat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isTyping] = useState(false);
    useEffect(() => {
        const fetchChat = async () => {
            try {
                const response = await fetch(`/api/chats/${chatId}`);
                if (!response.ok)
                    throw new Error("Error al cargar el chat");
                const data = await response.json();
                setChat(data);
            }
            catch (err) {
                setError(err instanceof Error ? err : new Error("Error desconocido"));
            }
            finally {
                setLoading(false);
            }
        };
        fetchChat();
    }, [chatId]);
    const sendMessage = async (content) => {
        try {
            const response = await fetch(`/api/chats/${chatId}/messages`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });
            if (!response.ok)
                throw new Error("Error al enviar el mensaje");
            const newMessage = await response.json();
            setChat(prev => prev ? {
                ...prev,
                messages: [...prev.messages, newMessage]
            } : null);
        }
        catch (err) {
            setError(err instanceof Error ? err : new Error("Error al enviar mensaje"));
        }
    };
    return { chat, loading, error, isTyping, sendMessage };
}
