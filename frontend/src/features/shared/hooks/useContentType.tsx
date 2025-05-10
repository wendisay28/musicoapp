import React from 'react';
import { useState, useCallback } from 'react';
export function useContentType (props: any){ initialType = 'artists', onTypeChange }) {
    const [contentType, setContentType] = useState(initialType);
    const handleTypeChange = useCallback((type) => {
        setContentType(type);
        onTypeChange?.(type);
    }, [onTypeChange]);
    return {
        contentType,
        handleTypeChange
    };
}
