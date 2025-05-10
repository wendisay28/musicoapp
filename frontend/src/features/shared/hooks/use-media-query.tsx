import React from 'react';
import { useState, useEffect } from "react";
export function useMediaQuery (props: any)query) {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        // Verificar el estado inicial
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        // Escuchar cambios
        const listener: React.FC = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        // Limpiar
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);
    return matches;
}
