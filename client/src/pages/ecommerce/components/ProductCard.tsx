// Muestra la vista individual de un producto en la grilla del ecommerce

import { Product } from "../types.js";
import { formatPrice } from "../../../lib/format.js";
import { Button } from "../../../components/ui/button.jsx";
import { Heart, ShoppingCart } from "lucide-react";
import { Card } from "../../../components/ui/card.jsx";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  isFavorite?: boolean;
}

export default function ProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
}: ProductCardProps) {
  const footer = (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="flex-1"
        onClick={() => onAddToCart?.(product)}
        disabled={product.stock === 0}
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        Agregar
      </Button>
      <Button variant="ghost" asChild>
        <a href={`/ecommerce/product/${product.id}`}>Ver más</a>
      </Button>
    </div>
  );

  return (
    <Card
      title={product.name}
      description={product.category}
      imageUrl={product.imageUrl}
      href={`/ecommerce/product/${product.id}`}
      footer={footer}
    >
      <div className="flex items-center gap-2">
        <p className="text-md font-bold text-primary">
          {formatPrice(product.price)}
        </p>
        {product.stock === 0 && (
          <span className="text-xs text-destructive">Agotado</span>
        )}
      </div>
      {onToggleFavorite && (
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity ${
            isFavorite ? "text-red-500" : ""
          }`}
          onClick={() => onToggleFavorite(product)}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
        </Button>
      )}
    </Card>
  );
}
