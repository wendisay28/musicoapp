import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { cache } from '@/lib/cache';

interface CachedQueryOptions<T> extends Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'> {
  cacheKey?: string;
  cacheTime?: number;
}

export function useCachedQuery<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options: CachedQueryOptions<T> = {}
) {
  const { cacheKey = queryKey.join('-'), cacheTime, ...queryOptions } = options;

  return useQuery({
    queryKey,
    queryFn: async () => {
      // Intentar obtener del caché
      const cachedData = cache.get<T>(cacheKey);
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