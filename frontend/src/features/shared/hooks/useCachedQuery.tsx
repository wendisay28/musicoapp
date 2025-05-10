import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { cache } from '@/lib/cache';
export function useCachedQuery (props: any)queryKey, queryFn, options = {}) {
    const { cacheKey = queryKey.join('-'), cacheTime, ...queryOptions } = options;
    return useQuery({
        queryKey,
        queryFn: async () => {
            // Intentar obtener del caché
            const cachedData = cache.get(cacheKey);
            if (cachedData) {
                return cachedData;
            }
            // Si no está en caché, hacer la petición
            const data = await queryFn();
            // Guardar en caché
            cache.set(cacheKey, data, cacheTime);
            return data;
        },
        ...queryOptions,
    });
}
