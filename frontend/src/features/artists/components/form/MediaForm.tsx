import { useFormContext } from 'react-hook-form';
import { Label } from '@/features/shared/components/ui/label';
import { Input } from '@/features/shared/components/ui/input';

export function MediaForm() {
  const { register } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="images">Imágenes de tu trabajo</Label>
        <Input
          id="images"
          type="file"
          multiple
          accept="image/*"
          {...register('images')}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="videos">Videos de tu trabajo</Label>
        <Input
          id="videos"
          type="file"
          multiple
          accept="video/*"
          {...register('videos')}
        />
      </div>
    </div>
  );
}
