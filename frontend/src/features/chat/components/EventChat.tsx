import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
export function EventChat (props: any){ eventId, className }) {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);
    useEffect(() => {
        // Aquí se implementaría la lógica para cargar mensajes
        // y suscribirse a nuevos mensajes en tiempo real
        const loadMessages = async () => {
            try {
                // Simulación de carga de mensajes
                setMessages([
                    {
                        id: '1',
                        content: '¡Hola! ¿Cómo va la preparación del evento?',
                        sender: {
                            id: '1',
                            name: 'Juan Pérez',
                            avatar: 'https://github.com/shadcn.png'
                        },
                        timestamp: new Date().toISOString()
                    }
                ]);
            }
            catch (error) {
                console.error('Error loading messages:', error);
            }
        };
        loadMessages();
    }, [eventId]);
    useEffect(() => {
        // Scroll al último mensaje
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);
    const handleSendMessage = async () => {
        if (!newMessage.trim())
            return;
        setIsLoading(true);
        try {
            // Aquí se implementaría la lógica para enviar mensajes
            const message: any = {
                id: Date.now().toString(),
                content: newMessage,
                sender: {
                    id: user?.id || '',
                    name: user?.name || '',
                    avatar: user?.avatar
                },
                timestamp: new Date().toISOString()
            };
            setMessages((prev) => [...prev, message]);
            setNewMessage('');
        }
        catch (error) {
            console.error('Error sending message:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleKeyPress: React.FC = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    return (_jsxs("div", { className: cn('flex flex-col h-[600px]', className), children: [_jsx(ScrollArea, { ref: scrollRef, className: "flex-1 p-4", children: _jsx("div", { className: "space-y-4", children: messages.map((message) => (_jsxs("div", { className: cn('flex items-start space-x-2', message.sender.id === user?.id && 'flex-row-reverse space-x-reverse'), children: [_jsxs(Avatar, { className: "h-8 w-8", children: [_jsx(AvatarImage, { src: message.sender.avatar }), _jsx(AvatarFallback, { children: message.sender.name.slice(0, 2).toUpperCase() })] }), _jsxs("div", { className: cn('flex flex-col space-y-1', message.sender.id === user?.id
                                    ? 'items-end'
                                    : 'items-start'), children: [_jsx("div", { className: cn('rounded-lg px-4 py-2 max-w-[80%]', message.sender.id === user?.id
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted'), children: _jsx("p", { className: "text-sm", children: message.content }) }), _jsx("span", { className: "text-xs text-muted-foreground", children: format(new Date(message.timestamp), 'HH:mm', {
                                            locale: es
                                        }) })] })] }, message.id))) }) }), _jsx("div", { className: "p-4 border-t", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "text-muted-foreground", children: _jsx(ImageIcon, { className: "h-5 w-5" }) }), _jsx(Input, { placeholder: "Escribe un mensaje...", value: newMessage, onChange: (e) => setNewMessage(e.target.value), onKeyPress: handleKeyPress, className: "flex-1" }), _jsx(Button, { size: "icon", onClick: handleSendMessage, disabled: isLoading || !newMessage.trim(), children: _jsx(Send, { className: "h-5 w-5" }) })] }) })] }));
}
