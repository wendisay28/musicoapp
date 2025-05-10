import React from 'react';
// Hook para obtener la información del chat y del otro usuario
import { useEffect, useState } from "react";
export function useChatDetails (props: any)chatId) {
    const [chatDetails, setChatDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch(`/api/chats/${chatId}`)
            .then((res) => res.json())
            .then((data) => {
            setChatDetails(data);
            setIsLoading(false);
        })
            .catch(console.error);
    }, [chatId]);
    return { chatDetails, isLoading };
}
