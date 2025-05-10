import { useState, useCallback } from 'react';
import { Availability, TimeSlot } from '../types/availability';
import * as availabilityService from '../services/availabilityService';

interface UseAvailabilityReturn {
  availability: Availability | null;
  loading: boolean;
  error: string | null;
  fetchAvailability: (userId: string) => Promise<void>;
  updateAvailability: (userId: string, data: Partial<Availability>) => Promise<void>;
  addTimeSlot: (userId: string, day: keyof Availability['days'], timeSlot: TimeSlot) => Promise<void>;
  removeTimeSlot: (userId: string, day: keyof Availability['days'], timeSlot: TimeSlot) => Promise<void>;
  addBlockedDate: (userId: string, date: string) => Promise<void>;
  removeBlockedDate: (userId: string, date: string) => Promise<void>;
  addAvailableDate: (userId: string, date: string) => Promise<void>;
  removeAvailableDate: (userId: string, date: string) => Promise<void>;
}

export const useAvailability = (): UseAvailabilityReturn => {
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await availabilityService.getAvailability(userId);
      setAvailability(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener la disponibilidad');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAvailability = useCallback(async (userId: string, data: Partial<Availability>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedAvailability = await availabilityService.updateAvailability(userId, data);
      setAvailability(updatedAvailability);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la disponibilidad');
    } finally {
      setLoading(false);
    }
  }, []);

  const addTimeSlot = useCallback(async (userId: string, day: keyof Availability['days'], timeSlot: TimeSlot) => {
    try {
      setLoading(true);
      setError(null);
      const updatedAvailability = await availabilityService.addTimeSlot(userId, day, timeSlot);
      setAvailability(updatedAvailability);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al agregar el horario');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeTimeSlot = useCallback(async (userId: string, day: keyof Availability['days'], timeSlot: TimeSlot) => {
    try {
      setLoading(true);
      setError(null);
      const updatedAvailability = await availabilityService.removeTimeSlot(userId, day, timeSlot);
      setAvailability(updatedAvailability);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el horario');
    } finally {
      setLoading(false);
    }
  }, []);

  const addBlockedDate = useCallback(async (userId: string, date: string) => {
    try {
      setLoading(true);
      setError(null);
      const updatedAvailability = await availabilityService.addBlockedDate(userId, date);
      setAvailability(updatedAvailability);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al agregar la fecha bloqueada');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeBlockedDate = useCallback(async (userId: string, date: string) => {
    try {
      setLoading(true);
      setError(null);
      const updatedAvailability = await availabilityService.removeBlockedDate(userId, date);
      setAvailability(updatedAvailability);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la fecha bloqueada');
    } finally {
      setLoading(false);
    }
  }, []);

  const addAvailableDate = useCallback(async (userId: string, date: string) => {
    try {
      setLoading(true);
      setError(null);
      const updatedAvailability = await availabilityService.addAvailableDate(userId, date);
      setAvailability(updatedAvailability);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al agregar la fecha disponible');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeAvailableDate = useCallback(async (userId: string, date: string) => {
    try {
      setLoading(true);
      setError(null);
      const updatedAvailability = await availabilityService.removeAvailableDate(userId, date);
      setAvailability(updatedAvailability);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la fecha disponible');
    } finally {
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