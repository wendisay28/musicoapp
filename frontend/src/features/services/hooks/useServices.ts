import { useState, useCallback } from 'react';
import { Service } from '../types/service';
import * as serviceService from '../services/serviceService';

interface UseServicesReturn {
  services: Service[];
  loading: boolean;
  error: string | null;
  fetchServices: (params?: { search?: string; page?: number; pageSize?: number; sortBy?: string; sortOrder?: 'asc' | 'desc'; userId?: string }) => Promise<void>;
  getService: (serviceId: string) => Promise<Service>;
  createService: (data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Service>;
  updateService: (serviceId: string, data: Partial<Service>) => Promise<Service>;
  deleteService: (serviceId: string) => Promise<void>;
}

export const useServices = (): UseServicesReturn => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async (params?: { search?: string; page?: number; pageSize?: number; sortBy?: string; sortOrder?: 'asc' | 'desc'; userId?: string }) => {
    try {
      setLoading(true);
      setError(null);
      const data = await serviceService.getServices(params);
      setServices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener los servicios');
    } finally {
      setLoading(false);
    }
  }, []);

  const getService = useCallback(async (serviceId: string) => {
    try {
      setLoading(true);
      setError(null);
      const service = await serviceService.getService(serviceId);
      return service;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener el servicio');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createService = useCallback(async (data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const service = await serviceService.createService(data);
      setServices(prev => [...prev, service]);
      return service;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el servicio');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateService = useCallback(async (serviceId: string, data: Partial<Service>) => {
    try {
      setLoading(true);
      setError(null);
      const service = await serviceService.updateService(serviceId, data);
      setServices(prev => prev.map(s => s.id === serviceId ? service : s));
      return service;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el servicio');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteService = useCallback(async (serviceId: string) => {
    try {
      setLoading(true);
      setError(null);
      await serviceService.deleteService(serviceId);
      setServices(prev => prev.filter(s => s.id !== serviceId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el servicio');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    services,
    loading,
    error,
    fetchServices,
    getService,
    createService,
    updateService,
    deleteService,
  };
}; 