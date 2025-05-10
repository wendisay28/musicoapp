import React from 'react';
import { useState, useCallback } from 'react';
import * as artistService from '../services/artistService';
export const useArtists: React.FC = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchArtists = useCallback(async (params) => {
        try {
            setLoading(true);
            setError(null);
            const response = await artistService.getArtists(params);
            setArtists(response.data);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al obtener los artistas');
        }
        finally {
            setLoading(false);
        }
    }, []);
    const getArtist = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const artist = await artistService.getArtist(id);
            return artist;
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al obtener el artista');
            throw err;
        }
        finally {
            setLoading(false);
        }
    }, []);
    const createArtist = useCallback(async (data) => {
        try {
            setLoading(true);
            setError(null);
            await artistService.createArtist(data);
            await fetchArtists();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear el artista');
        }
        finally {
            setLoading(false);
        }
    }, [fetchArtists]);
    const updateArtist = useCallback(async (id, data) => {
        try {
            setLoading(true);
            setError(null);
            await artistService.updateArtist(id, data);
            await fetchArtists();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al actualizar el artista');
        }
        finally {
            setLoading(false);
        }
    }, [fetchArtists]);
    const deleteArtist = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            await artistService.deleteArtist(id);
            await fetchArtists();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar el artista');
        }
        finally {
            setLoading(false);
        }
    }, [fetchArtists]);
    return {
        artists,
        loading,
        error,
        fetchArtists,
        getArtist,
        createArtist,
        updateArtist,
        deleteArtist,
    };
};
