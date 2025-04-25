// src/pages/ecommerce/dummyProducts.ts
// Lista de productos de ejemplo

import { Product } from "./types";

export const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Pintura abstracta #1",
    price: 120,
    imageUrl: "https://source.unsplash.com/random/400x300?art1",
    category: "Arte",
  },
  {
    id: "2",
    name: "Estatua de cerámica",
    price: 90,
    imageUrl: "https://source.unsplash.com/random/400x300?sculpture",
    category: "Decoración",
  },
  {
    id: "3",
    name: "Collar artesanal",
    price: 45,
    imageUrl: "https://source.unsplash.com/random/400x300?jewelry",
    category: "Accesorios",
  },
  {
    id: "4",
    name: "Lienzo moderno",
    price: 150,
    imageUrl: "https://source.unsplash.com/random/400x300?canvas",
    category: "Arte",
  },
  {
    id: "5",
    name: "Maceta pintada a mano",
    price: 35,
    imageUrl: "https://source.unsplash.com/random/400x300?pottery",
    category: "Decoración",
  },
];
