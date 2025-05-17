import { useFormContext } from 'react-hook-form';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/features/shared/components/ui/card';
import { Input } from '@/features/shared/components/ui/input';
import { Label } from '@/features/shared/components/ui/label';
import { Textarea } from '@/features/shared/components/ui/textarea';
import { Checkbox } from '@/features/shared/components/ui/checkbox';

const SPECIALTIES = [
  'Pintura',
  'Escultura',
  'Fotografía',
  'Arte Digital',
  'Artesanía',
  'Otro'
];

const ArtistInfoSection = () => {
  const { register, setValue, watch } = useFormContext();
  const specialties = watch('specialties', []);

  const toggleSpecialty = (specialty: string) => {
    const updated = specialties.includes(specialty)
      ? specialties.filter((s: string) => s !== specialty)
      : [...specialties, specialty];
    setValue('specialties', updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del Artista</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre Artístico</Label>
          <Input id="name" {...register('name')} placeholder="Tu nombre artístico" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Biografía</Label>
          <Textarea
            id="bio"
            {...register('bio')}
            placeholder="Cuéntanos sobre ti y tu arte"
            rows={4}
          />
        </div>

        <div className="space-y-4">
          <Label>Especialidades</Label>
          <div className="grid grid-cols-2 gap-4">
            {SPECIALTIES.map((specialty) => (
              <div key={specialty} className="flex items-center space-x-2">
                <Checkbox
                  id={`specialty-${specialty}`}
                  checked={specialties.includes(specialty)}
                  onCheckedChange={() => toggleSpecialty(specialty)}
                />
                <Label htmlFor={`specialty-${specialty}`} className="text-sm">{specialty}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Años de Experiencia</Label>
          <Input
            id="experience"
            type="number"
            {...register('experience', { valueAsNumber: true })}
            placeholder="Años de experiencia"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistInfoSection;
