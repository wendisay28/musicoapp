import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/features/shared/hooks/use-toast';
const AuthContext = createContext(undefined);
export function AuthProvider (props: any){ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    useEffect(() => {
        // Simular carga inicial del usuario
        const loadUser = async () => {
            try {
                // Aquí deberías implementar la lógica real de autenticación
                setUser(null);
            }
            catch (error) {
                console.error('Error loading user:', error);
            }
            finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);
    const signIn = async (email, password) => {
        try {
            // Aquí deberías implementar la lógica real de inicio de sesión
            setUser({
                uid: '1',
                email,
                displayName: 'Usuario de prueba',
                photoURL: null
            });
        }
        catch (error) {
            console.error('Error signing in:', error);
            throw error;
        }
    };
    const signOut = async () => {
        try {
            // Aquí deberías implementar la lógica real de cierre de sesión
            setUser(null);
        }
        catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };
    const logout = signOut;
    return (_jsx(AuthContext.Provider, { value: { user, loading, signIn, signOut, logout }, children: children }));
}
export function useAuth (props: any)) {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
