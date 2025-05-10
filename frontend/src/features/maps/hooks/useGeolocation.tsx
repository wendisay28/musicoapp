import React from 'react';
import { useState, useEffect } from 'react';
export function useGeolocation (props: any)) {
    const [state, setState] = useState({
        latitude: null,
        longitude: null,
        error: null,
        loading: true
    });
    useEffect(() => {
        if (!navigator.geolocation) {
            setState(prev => ({
                ...prev,
                error: 'Geolocation is not supported by your browser',
                loading: false
            }));
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
                loading: false
            });
        }, (error) => {
            setState({
                latitude: null,
                longitude: null,
                error: error.message,
                loading: false
            });
        });
    }, []);
    return state;
}
