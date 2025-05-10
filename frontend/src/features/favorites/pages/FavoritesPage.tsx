import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '@/features/shop/components/ProductCard';
import { Button } from '@/components/ui/button';
import type { ReactNode, JSX } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { apiClient } from '@/lib/api';
import { BarChart2, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  material: string;
  dimensions: string;
  stock: number;
  artist: {
    id: string;
    name: string;
  };
}

interface CustomButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const DialogComponent = Dialog as unknown as (props: any) => JSX.Element;
const DialogTriggerComponent = DialogTrigger as unknown as (props: any) => JSX.Element;
const DialogContentComponent = DialogContent as unknown as (props: any) => JSX.Element;
const DialogHeaderComponent = DialogHeader as unknown as (props: any) => JSX.Element;
const DialogTitleComponent = DialogTitle as unknown as (props: any) => JSX.Element;

const BarChart2Component = BarChart2 as any;
const ProductCardComponent = ProductCard as any;

export function FavoritesPage(): JSX.Element {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const { data: favorites, isLoading, refetch } = useQuery<Product[]>({
    queryKey: ['favorites'],
    queryFn: async () => {
      const response = await apiClient.get<{ data: Product[] }>('/api/favorites');
      return response.data.data;
    }
  });

  const handleToggleFavorite = async (productId: string): Promise<void> => {
    try {
      await apiClient.post(`/api/products/${productId}/favorite`);
      refetch();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleViewArtist = (artistId: string): void => {
    navigate(`/artists/${artistId}`);
  };

  const handleAddToCart = async (productId: string): Promise<void> => {
    try {
      await apiClient.post('/api/cart', { productId });
      toast({
        title: 'Producto agregado',
        description: 'El producto ha sido agregado a tu carrito'
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo agregar el producto al carrito'
      });
    }
  };

  const handleToggleSelection = (productId: string): void => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleRemoveFromFavorites = async (productId: string): Promise<void> => {
    try {
      await apiClient.delete(`/api/favorites/${productId}`);
      toast({
        title: 'Eliminado de favoritos',
        description: 'El producto ha sido eliminado de tus favoritos'
      });
      refetch();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo eliminar el producto de favoritos'
      });
    }
  };

  const selectedProductsData = favorites?.filter((product) =>
    selectedProducts.includes(product.id)
  );

  const IconButton = ({ icon: Icon, className, onClick }: { icon: any; className?: string; onClick?: () => void }) => (
    <Button variant="ghost" size="icon" className={className} onClick={onClick}>
      <Icon className="h-4 w-4" />
    </Button>
  );

  const CustomButton = ({ children, className, onClick }: CustomButtonProps) => (
    <Button className={className} onClick={onClick}>
      {children}
    </Button>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Favoritos</h1>
            <p className="text-muted-foreground">
              Tus productos favoritos y comparaciones
            </p>
          </div>
          {selectedProducts.length > 0 && (
            <DialogComponent open={showComparison} onOpenChange={setShowComparison}>
              <DialogTriggerComponent asChild>
                <CustomButton>
                  <BarChart2Component className="h-4 w-4 mr-2" />
                  Comparar ({selectedProducts.length})
                </CustomButton>
              </DialogTriggerComponent>
              <DialogContentComponent className="max-w-4xl">
                <DialogHeaderComponent>
                  <DialogTitleComponent>Comparación de productos</DialogTitleComponent>
                </DialogHeaderComponent>
                <div className="grid grid-cols-2 gap-4">
                  {selectedProductsData?.map((product) => (
                    <div key={product.id} className="space-y-4">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-muted-foreground">
                          Por {product.artist.name}
                        </p>
                        <p className="text-lg font-bold mt-2">
                          ${product.price.toLocaleString('es-ES')}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Características</h4>
                        <ul className="text-sm space-y-1">
                          <li>Categoría: {product.category}</li>
                          <li>Material: {product.material}</li>
                          <li>Dimensiones: {product.dimensions}</li>
                          <li>Stock: {product.stock} unidades</li>
                        </ul>
                      </div>
                      <CustomButton 
                        className="w-full" 
                        onClick={() => handleAddToCart(product.id)}
                      >
                        Agregar al carrito
                      </CustomButton>
                    </div>
                  ))}
                </div>
              </DialogContentComponent>
            </DialogComponent>
          )}
        </div>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-muted animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites?.map((product) => (
            <div key={product.id} className="relative group">
              <ProductCardComponent
                product={product}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
                onViewArtist={handleViewArtist}
              />
              <div className="absolute top-2 left-2 z-10">
                <IconButton
                  icon={BarChart2}
                  className={cn(
                    'bg-background/80 backdrop-blur-sm p-2 rounded-md',
                    selectedProducts.includes(product.id) && 'text-primary'
                  )}
                  onClick={() => handleToggleSelection(product.id)}
                />
              </div>
              <div className="absolute top-2 right-2 z-10">
                <IconButton
                  icon={Trash2}
                  className="bg-background/80 backdrop-blur-sm p-2 rounded-md text-destructive"
                  onClick={() => handleRemoveFromFavorites(product.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
