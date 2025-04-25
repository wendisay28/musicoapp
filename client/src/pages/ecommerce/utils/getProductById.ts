// Busca un producto dentro del array dummyProducts

import { Product } from "../types";
import { dummyProducts } from "../dummyProducts";

export function getProductById(id: string): Product | undefined {
  return dummyProducts.find((product) => product.id === id);
}
