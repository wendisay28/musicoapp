// Vista previa del marketplace, muestra productos destacados en una cuadrícula

import { FC } from "react";
import { Button } from "@/components/ui/button";

// Productos de ejemplo (reemplaza con tu data real o hook de carga)
const sampleProducts = [
  { id: 1, name: "Pintura al óleo", image: "/images/product1.jpg", price: "$120" },
  { id: 2, name: "Escultura moderna", image: "/images/product2.jpg", price: "$200" },
  { id: 3, name: "Fotografía artística", image: "/images/product3.jpg", price: "$90" },
];

const MarketplacePreview: FC = () => {
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Marketplace</h2>
        <Button variant="outline" size="sm">
          Ver más productos
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sampleProducts.map((product) => (
          <div key={product.id} className="rounded-xl overflow-hidden shadow-md bg-white">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarketplacePreview;
