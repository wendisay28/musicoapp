import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
const LocationContext = createContext(undefined);
export function LocationProvider (props: any){ children }) {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setLoading(false);
            }, (error) => {
                setError(error.message);
                setLoading(false);
            });
        }
        else {
            setError("Geolocation is not supported by your browser");
            setLoading(false);
        }
    }, []);
    const updateLocation: React.FC = (newLocation) => {
        setLocation(newLocation);
    };
    const value: any = {
        location,
        loading,
        error,
        updateLocation,
    };
    return (_jsx(LocationContext.Provider, { value: value, children: children }));
}
export function useLocation (props: any)) {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error("useLocation must be used within a LocationProvider");
    }
    return context;
}
