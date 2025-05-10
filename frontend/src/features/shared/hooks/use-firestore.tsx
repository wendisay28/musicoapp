import React from 'react';
import { useState } from "react";
import { collection, addDoc, updateDoc, doc, deleteDoc, getDocs, getDoc, query, where, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from '@/features/shared/hooks/use-toast';
export const useFirestore: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { toast } = useToast();
    const handleError: React.FC = (error, operation) => {
        setError(error);
        toast({
            variant: "destructive",
            title: `Error in ${operation}`,
            description: error.message,
        });
        console.error(`Error in ${operation}:`, error);
    };
    const add = async (collectionName, data) => {
        setIsLoading(true);
        setError(null);
        try {
            const docRef = await addDoc(collection(db, collectionName), {
                ...data,
                createdAt: Timestamp.now(),
            });
            return docRef.id;
        }
        catch (err) {
            handleError(err, 'add operation');
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    };
    const update = async (collectionName, id, data) => {
        setIsLoading(true);
        setError(null);
        try {
            const docRef = doc(db, collectionName, id);
            await updateDoc(docRef, {
                ...data,
                updatedAt: Timestamp.now(),
            });
        }
        catch (err) {
            handleError(err, 'update operation');
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    };
    const remove = async (collectionName, id) => {
        setIsLoading(true);
        setError(null);
        try {
            const docRef = doc(db, collectionName, id);
            await deleteDoc(docRef);
        }
        catch (err) {
            handleError(err, 'remove operation');
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    };
    const getById = async (collectionName, id) => {
        setIsLoading(true);
        setError(null);
        try {
            const docRef = doc(db, collectionName, id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            }
            else {
                return null;
            }
        }
        catch (err) {
            handleError(err, 'getById operation');
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    };
    const getAll = async (collectionName) => {
        setIsLoading(true);
        setError(null);
        try {
            const querySnapshot = await getDocs(collection(db, collectionName));
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            return data;
        }
        catch (err) {
            handleError(err, 'getAll operation');
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    };
    const getWhere = async (collectionName, field, operator, value) => {
        setIsLoading(true);
        setError(null);
        try {
            const q = query(collection(db, collectionName), where(field, operator, value));
            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            return data;
        }
        catch (err) {
            handleError(err, 'getWhere operation');
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    };
    return {
        isLoading,
        error,
        add,
        update,
        remove,
        getById,
        getAll,
        getWhere,
    };
};
