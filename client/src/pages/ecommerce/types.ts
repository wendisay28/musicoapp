// src/pages/ecommerce/types.ts
// Tipos compartidos para los productos del ecommerce

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    stock: number;
    rating: number;
    reviews: number;
    variants?: {
      id: string;
      name: string;
      price: number;
      stock: number;
    }[];
    tags: string[];
    createdAt: string;
    updatedAt: string;
  }
  
export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  sortBy?: 'price' | 'rating' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

export interface CartItem {
  product: Product;
  quantity: number;
  variantId?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}
  