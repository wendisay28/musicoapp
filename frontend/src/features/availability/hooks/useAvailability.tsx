import React from 'react';
import { useState, useCallback } from 'react';
import * as availabilityService from '../services/availabilityService';
export const useAvailability: React.FC = () => {
    const [availability, setAvailability] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchAvailability = useCallback(async (userId) => {
        try {
            setLoading(true);
            setError(null);
            const data = await availabilityService.getAvailability(userId);
            setAvailability(data);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al obtener la disponibilidad');
        }
        finally {
            setLoading(false);
        }
    }, []);
    const updateAvailability = useCallback(async (userId, data) => {
        try {
            setLoading(true);
            setError(null);
            const updatedAvailability = await availabilityService.updateAvailability(userId, data);
            setAvailability(updatedAvailability);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al actualizar la disponibilidad');
        }
        finally {
            setLoading(false);
        }
    }, []);
    const addTimeSlot = useCallback(async (userId, day, timeSlot) => {
        try {
            setLoading(true);
            setError(null);
            const updatedAvailability = await availabilityService.addTimeSlot(userId, day, timeSlot);
            setAvailability(updatedAvailability);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al agregar el horario');
        }
        finally {
            setLoading(false);
        }
    }, []);
    const removeTimeSlot = useCallback(async (userId, day, timeSlot) => {
        try {
            setLoading(true);
            setError(null);
            const updatedAvailability = await availabilityService.removeTimeSlot(userId, day, timeSlot);
            setAvailability(updatedAvailability);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar el horario');
        }
        finally {
            setLoading(false);
        }
    }, []);
    const addBlockedDate = useCallback(async (userId, date) => {
        try {
            setLoading(true);
            setError(null);
            const updatedAvailability = await availabilityService.addBlockedDate(userId, date);
            setAvailability(updatedAvailability);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al agregar la fecha bloqueada');
        }
        finally {
            setLoading(false);
        }
    }, []);
    const removeBlockedDate = useCallback(async (userId, date) => {
        try {
            setLoading(true);
            setError(null);
            const updatedAvailability = await availabilityService.removeBlockedDate(userId, date);
            setAvailability(updatedAvailability);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar la fecha bloqueada');
        }
        finally {
            setLoading(false);
        }
    }, []);
    const addAvailableDate = useCallback(async (userId, date) => {
        try {
            setLoading(true);
            setError(null);
            const updatedAvailability = await availabilityService.addAvailableDate(userId, date);
            setAvailability(updatedAvailability);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al agregar la fecha disponible');
        }
        finally {
            setLoading(false);
        }
    }, []);
    const removeAvailableDate = useCallback(async (userId, date) => {
        try {
            setLoading(true);
            setError(null);
            const updatedAvailability = await availabilityService.removeAvailableDate(userId, date);
            setAvailability(updatedAvailability);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar la fecha disponible');
        }
        finally {
            setLoading(false);
        }
    }, []);
    return {
        availability,
        loading,
        error,
        fetchAvailability,
        updateAvailability,
        addTimeSlot,
        removeTimeSlot,
        addBlockedDate,
        removeBlockedDate,
        addAvailableDate,
        removeAvailableDate,
    };
};
