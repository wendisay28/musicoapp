import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/features/ui/components/button';
import { Input } from '@/features/ui/components/input';
import { Send } from 'lucide-react';
export function ChatInput (props: any){ onSendMessage }) {
    const [message, setMessage] = useState('');
    const handleSubmit: React.FC = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "border-t p-4 flex gap-2", children: [_jsx(Input, { value: message, onChange: (e) => setMessage(e.target.value), placeholder: "Escribe un mensaje...", className: "flex-1" }), _jsx(Button, { type: "submit", size: "icon", children: _jsx(Send, { className: "h-4 w-4" }) })] }));
}
