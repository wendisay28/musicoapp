// Muestra la vista individual de un producto en la grilla del ecommerce

import { Product } from "../types";
import { formatPrice } from "../utils";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="rounded-xl border p-4 shadow hover:shadow-lg transition-all">
      <Link to={`/ecommerce/ProductDetailsPage?id=${product.id}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-md font-bold text-black mt-2">
          {formatPrice(product.price)}
        </p>
      </Link>

      <div className="mt-4">
        <Link
          to={`/ecommerce/ProductDetailsPage?id=${product.id}`}
          className="inline-block px-4 py-2 bg-black text-white text-sm rounded-xl hover:bg-gray-800"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
