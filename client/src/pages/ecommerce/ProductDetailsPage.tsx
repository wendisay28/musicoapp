// Página de detalle para un producto del marketplace

import { useSearchParams } from "react-router-dom";
import { getProductById, formatPrice } from "./utils";

const ProductDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return <div className="p-4 text-red-500">Producto no encontrado.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="rounded-xl w-full h-auto object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-700 mb-2">{formatPrice(product.price)}</p>
          <p className="text-sm text-gray-500 mb-6">
            Categoría: {product.category}
          </p>
          <button className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
