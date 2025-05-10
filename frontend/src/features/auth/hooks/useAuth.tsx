import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, createContext, useContext } from 'react';
import { api } from '@/lib/api';
const AuthContext = createContext(undefined);
export function AuthProvider (props: any){ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.get('/auth/me')
                .then(response => {
                setUser(response.data);
            })
                .catch(() => {
                localStorage.removeItem('token');
            })
                .finally(() => {
                setLoading(false);
            });
        }
        else {
            setLoading(false);
        }
    }, []);
    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setUser(user);
    };
    const logout: React.FC = () => {
        localStorage.removeItem('token');
        setUser(null);
    };
    const register = async (name, email, password, role) => {
        const response = await api.post('/auth/register', { name, email, password, role });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setUser(user);
    };
    const value: any = {
        user,
        loading,
        login,
        logout,
        register
    };
    return (_jsx(AuthContext.Provider, { value: value, children: children }));
}
export function useAuth (props: any)) {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
