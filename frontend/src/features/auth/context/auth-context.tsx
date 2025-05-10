import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
export const AuthContext = createContext(null);
export function AuthProvider (props: any){ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const auth = getAuth();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUser({
                            id: firebaseUser.uid,
                            email: firebaseUser.email,
                            name: userData.name,
                            role: userData.role
                        });
                    }
                    else {
                        // Si no existe el documento del usuario, lo creamos
                        const newUser: any = {
                            id: firebaseUser.uid,
                            email: firebaseUser.email,
                            name: firebaseUser.displayName || '',
                            role: 'user'
                        };
                        await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
                        setUser(newUser);
                    }
                }
                catch (err) {
                    setError(err);
                }
            }
            else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [auth]);
    const login = async (email, password) => {
        try {
            setError(null);
            await signInWithEmailAndPassword(auth, email, password);
        }
        catch (err) {
            setError(err);
            throw err;
        }
    };
    const logout = async () => {
        try {
            setError(null);
            await firebaseSignOut(auth);
        }
        catch (err) {
            setError(err);
            throw err;
        }
    };
    const register = async (email, password, name) => {
        try {
            setError(null);
            const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
            // Crear el documento del usuario en Firestore
            const newUser: any = {
                id: firebaseUser.uid,
                email: firebaseUser.email,
                name,
                role: 'user'
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
            setUser(newUser);
        }
        catch (err) {
            setError(err);
            throw err;
        }
    };
    return (_jsx(AuthContext.Provider, { value: { user, loading, error, login, logout, register }, children: children }));
}
