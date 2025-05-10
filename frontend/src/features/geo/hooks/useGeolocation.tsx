import React from 'react';
import { useState, useCallback } from 'react';
export const useGeolocation: React.FC = () => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const requestLocation = useCallback(() => {
        setLoading(true);
        setError(null);
        if (!navigator.geolocation) {
            setError('La geolocalización no está soportada en tu navegador');
            setLoading(false);
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
            setLoading(false);
        }, (error) => {
            let errorMessage = 'Error al obtener la ubicación';
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Permiso denegado para acceder a la ubicación';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'La información de ubicación no está disponible';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'La solicitud de ubicación ha expirado';
                    break;
            }
            setError(errorMessage);
            setLoading(false);
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        });
    }, []);
    return {
        location,
        loading,
        error,
        requestLocation,
    };
};
