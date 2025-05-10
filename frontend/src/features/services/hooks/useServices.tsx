import React from 'react';
import { useState, useCallback } from 'react';
import * as serviceService from '../services/serviceService';
export const useServices: React.FC = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchServices = useCallback(async (params) => {
        try {
            setLoading(true);
            setError(null);
            const data = await serviceService.getServices(params);
            setServices(data);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al obtener los servicios');
        }
        finally {
            setLoading(false);
        }
    }, []);
    const getService = useCallback(async (serviceId) => {
        try {
            setLoading(true);
            setError(null);
            const service = await serviceService.getService(serviceId);
            return service;
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al obtener el servicio');
            throw err;
        }
        finally {
            setLoading(false);
        }
    }, []);
    const createService = useCallback(async (data) => {
        try {
            setLoading(true);
            setError(null);
            const service = await serviceService.createService(data);
            setServices(prev => [...prev, service]);
            return service;
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear el servicio');
            throw err;
        }
        finally {
            setLoading(false);
        }
    }, []);
    const updateService = useCallback(async (serviceId, data) => {
        try {
            setLoading(true);
            setError(null);
            const service = await serviceService.updateService(serviceId, data);
            setServices(prev => prev.map(s => s.id === serviceId ? service : s));
            return service;
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al actualizar el servicio');
            throw err;
        }
        finally {
            setLoading(false);
        }
    }, []);
    const deleteService = useCallback(async (serviceId) => {
        try {
            setLoading(true);
            setError(null);
            await serviceService.deleteService(serviceId);
            setServices(prev => prev.filter(s => s.id !== serviceId));
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar el servicio');
            throw err;
        }
        finally {
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
