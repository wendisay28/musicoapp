import React from 'react';
import { useState, useCallback } from 'react';
import * as reviewService from '../services/reviewService';
export const useReviews: React.FC = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchReviews = useCallback(async (params) => {
        try {
            setLoading(true);
            setError(null);
            const response = await reviewService.getReviews(params);
            setReviews(response.data);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al obtener las reseñas');
        }
        finally {
            setLoading(false);
        }
    }, []);
    const getReview = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const review = await reviewService.getReview(id);
            return review;
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al obtener la reseña');
            throw err;
        }
        finally {
            setLoading(false);
        }
    }, []);
    const createReview = useCallback(async (data) => {
        try {
            setLoading(true);
            setError(null);
            await reviewService.createReview(data);
            await fetchReviews();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear la reseña');
        }
        finally {
            setLoading(false);
        }
    }, [fetchReviews]);
    const updateReview = useCallback(async (id, data) => {
        try {
            setLoading(true);
            setError(null);
            await reviewService.updateReview(id, data);
            await fetchReviews();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al actualizar la reseña');
        }
        finally {
            setLoading(false);
        }
    }, [fetchReviews]);
    const deleteReview = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            await reviewService.deleteReview(id);
            await fetchReviews();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar la reseña');
        }
        finally {
            setLoading(false);
        }
    }, [fetchReviews]);
    return {
        reviews,
        loading,
        error,
        fetchReviews,
        getReview,
        createReview,
        updateReview,
        deleteReview,
    };
};
