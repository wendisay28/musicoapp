import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/features/shared/components/ui/button';
import { Card, CardContent, CardHeader } from '@/features/shared/components/ui/card';
import { Input } from '@/features/shared/components/ui/input';
import { Textarea } from '@/features/shared/components/ui/textarea';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
/**
 * Componente para contactar al artista
 *
 * @example
 * ```tsx
 * // Contacto simple
 * <ArtistContact
 *   email="artista@ejemplo.com"
 *   phone="+1234567890"
 * />
 *
 * // Con formulario de mensaje
 * <ArtistContact
 *   email="artista@ejemplo.com"
 *   onSendMessage={handleSendMessage}
 * />
 * ```
 */
export function ArtistContact (props: any){ email, phone, onSendMessage, onEmail, onCall, className }) {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const handleSubmit: React.FC = (e) => {
        e.preventDefault();
        onSendMessage?.({ subject, content });
        setSubject('');
        setContent('');
    };
    return (_jsxs(Card, { className: cn('w-full', className), children: [_jsx(CardHeader, { children: _jsx("h3", { className: "text-lg font-semibold", children: "Contactar al Artista" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [email && (_jsxs(Button, { variant: "outline", className: "w-full justify-start", onClick: () => onEmail?.(email), children: [_jsx(Mail, { className: "mr-2 h-4 w-4" }), email] })), phone && (_jsxs(Button, { variant: "outline", className: "w-full justify-start", onClick: () => onCall?.(phone), children: [_jsx(Phone, { className: "mr-2 h-4 w-4" }), phone] })), onSendMessage && (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx(Input, { placeholder: "Asunto", value: subject, onChange: (e) => setSubject(e.target.value), required: true }), _jsx(Textarea, { placeholder: "Mensaje", value: content, onChange: (e) => setContent(e.target.value), required: true }), _jsxs(Button, { type: "submit", className: "w-full", children: [_jsx(MessageSquare, { className: "mr-2 h-4 w-4" }), "Enviar Mensaje"] })] }))] }) })] }));
}
