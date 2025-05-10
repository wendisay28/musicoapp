import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from '@tanstack/react-query';
import { getChats } from '../api/chats';
export default function ChatPage (props: any)) {
    const { data: chats, isLoading } = useQuery({
        queryKey: ['chats'],
        queryFn: getChats
    });
    if (isLoading) {
        return _jsx("div", { children: "Loading..." });
    }
    return (_jsxs("div", { className: "container mx-auto p-4", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Chats" }), chats?.length === 0 ? (_jsx("p", { className: "text-muted-foreground", children: "No tienes chats activos" })) : (_jsx("div", { className: "grid gap-4" }))] }));
}
