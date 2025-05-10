import React from 'react';
import { useState, useEffect } from "react";
export function useChats (props: any)) {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await fetch("/api/chats");
                if (!response.ok)
                    throw new Error("Error al cargar los chats");
                const data = await response.json();
                setChats(data);
            }
            catch (err) {
                setError(err instanceof Error ? err : new Error("Error desconocido"));
            }
            finally {
                setLoading(false);
            }
        };
        fetchChats();
    }, []);
    return { chats, loading, error };
}
