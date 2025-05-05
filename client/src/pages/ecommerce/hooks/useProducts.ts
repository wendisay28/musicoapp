import { useState, useEffect } from "react";
import { Product, ProductFilter } from "../types.ts";

export function useProducts(initialFilter?: ProductFilter) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<ProductFilter>(initialFilter || {});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Aquí iría la llamada real a la API
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Error al cargar productos");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error desconocido"));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filter]);

  const filteredProducts = products.filter(product => {
    if (filter.category && product.category !== filter.category) return false;
    if (filter.minPrice && product.price < filter.minPrice) return false;
    if (filter.maxPrice && product.price > filter.maxPrice) return false;
    if (filter.rating && product.rating < filter.rating) return false;
    if (filter.inStock && product.stock === 0) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!filter.sortBy) return 0;
    
    const order = filter.sortOrder === 'asc' ? 1 : -1;
    
    switch (filter.sortBy) {
      case 'price':
        return (a.price - b.price) * order;
      case 'rating':
        return (a.rating - b.rating) * order;
      case 'newest':
        return (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) * order;
      default:
        return 0;
    }
  });

  return {
    products: sortedProducts,
    loading,
    error,
    filter,
    setFilter
  };
} 