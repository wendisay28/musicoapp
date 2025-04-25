import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useLocation } from '@/context/location-context';
import { useToast } from '@/hooks/use-toast';
import { useCreateRequest } from '@/hooks/useRealTimeOffers';
import { CategorySelector } from '@/components/real-time-offers/CategorySelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, MapPin, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

export default function NewRequestPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { locationData } = useLocation();
  const { toast } = useToast();
  const { mutate: createRequest, isPending } = useCreateRequest();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    tags: [] as string[],
    price: '',
    priceUnit: 'total',
    location: '',
    useCurrentLocation: true,
    date: undefined as Date | undefined,
    time: ''
  });

  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.category || !formData.price || !formData.date) {
      toast({
        variant: "destructive",
        title: "Campos incompletos",
        description: "Por favor completa todos los campos obligatorios",
      });
      return;
    }

    if (!user?.id) {
      toast({
        variant: "destructive",
        title: "Inicia sesión",
        description: "Debes iniciar sesión para crear una solicitud",
      });
      return;
    }

    createRequest({
      clientId: user.id,
      title: formData.title,
      description: formData.description,
      categoryId: formData.category,
      subcategoryId: formData.subcategory,
      price: Number(formData.price),
      date: formData.date.toISOString(),
      time: formData.time,
      location: formData.useCurrentLocation ? locationData?.address || '' : formData.location,
      latitude: locationData?.coordinates?.latitude || 0,
      longitude: locationData?.coordinates?.longitude || 0,
      tags: formData.tags,
      status: 'active'
    }, {
      onSuccess: () => {
        toast({
          title: "Solicitud creada",
          description: "Tu solicitud ha sido publicada con éxito",
        });
        router.push('/real-time-offers');
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Ocurrió un error al crear la solicitud",
        });
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Crear nueva solicitud</h1>
          <p className="text-muted-foreground">
            Completa los detalles de lo que necesitas y recibe ofertas de artistas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título y Descripción */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Título de la solicitud *</Label>
              <Input
                id="title"
                placeholder="Ej: Fotógrafo para evento corporativo"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Sé específico sobre el servicio que necesitas
              </p>
            </div>

            <div>
              <Label htmlFor="description">Descripción detallada *</Label>
              <Textarea
                id="description"
                rows={5}
                placeholder="Describe con detalle lo que necesitas, incluye información sobre el evento, duración, expectativas, etc."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          {/* Categoría y Subcategoría */}
          <div className="space-y-4">
            <Label>Categoría del servicio *</Label>
            <CategorySelector
              value={{ category: formData.category, subcategory: formData.subcategory }}
              onChange={({ category, subcategory }) => 
                setFormData({...formData, category, subcategory })
              }
            />
          </div>

          {/* Etiquetas */}
          <div className="space-y-2">
            <Label>Etiquetas profesionales (opcional)</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button 
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        tags: formData.tags.filter(t => t !== tag)
                      });
                    }}
                  >
                    <X className="h-3 w-3 hover:text-destructive" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Ej: Fotografía profesional, DJ, Chef vegano"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <Button 
                type="button"
                variant="outline"
                onClick={() => {
                  if (!newTag.trim()) return;
                  if (formData.tags.length >= 3) {
                    toast({
                      variant: "destructive",
                      description: "Máximo 3 etiquetas permitidas",
                    });
                    return;
                  }
                  setFormData({
                    ...formData,
                    tags: [...formData.tags, newTag.trim()]
                  });
                  setNewTag('');
                }}
              >
                Añadir
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Añade palabras clave que ayuden a los artistas a encontrar tu solicitud
            </p>
          </div>

          {/* Presupuesto */}
          <div className="space-y-2">
            <Label htmlFor="price">Presupuesto estimado (COP) *</Label>
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-3">
                <Input
                  id="price"
                  type="number"
                  placeholder="Ej: 300000"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.priceUnit}
                onChange={(e) => setFormData({...formData, priceUnit: e.target.value as 'total' | 'hora'})}
              >
                <option value="total">Total</option>
                <option value="hora">Por hora</option>
              </select>
            </div>
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fecha del evento *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : <span>Selecciona una fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => setFormData({...formData, date: date || undefined})}
                    initialFocus
                    fromDate={new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Hora aproximada</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              />
            </div>
          </div>

          {/* Ubicación */}
          <div className="space-y-2">
            <Label>Ubicación del evento</Label>
            <div className="flex items-center gap-2 mb-2">
              <Switch
                id="use-current-location"
                checked={formData.useCurrentLocation}
                onCheckedChange={(checked) => setFormData({...formData, useCurrentLocation: checked})}
              />
              <Label htmlFor="use-current-location">Usar mi ubicación actual</Label>
            </div>

            {formData.useCurrentLocation ? (
              <div className="flex items-center gap-2 bg-muted p-3 rounded-md">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{locationData?.address || "Obteniendo ubicación..."}</span>
              </div>
            ) : (
              <Input
                placeholder="Dirección exacta o punto de referencia"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => router.push('/real-time-offers')}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Publicando...' : 'Publicar Solicitud'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}