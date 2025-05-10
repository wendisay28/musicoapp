import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { ChatMessage } from './ChatMessage';
export function ChatMessages (props: any){ messages, currentUserId, participants }) {
    return (_jsx("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: messages.map((message) => {
            const sender = participants.find(p => p.id === message.senderId);
            if (!sender)
                return null;
            return (_jsx(ChatMessage, { message: message.content, sender: sender, timestamp: message.timestamp, isOwnMessage: message.senderId === currentUserId }, message.id));
        }) }));
}
