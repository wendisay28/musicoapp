// client/src/pages/events/create/components/ImageUploadSection.tsx

import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { EventFormValues } from './schema';

interface Props {
  form: UseFormReturn<EventFormValues>;
}

const ImageUploadSection: React.FC<Props> = ({ form }) => {
  const { setValue, watch } = form;
  const [preview, setPreview] = useState<string | null>(null);
  const imageFile = watch('image');

  useEffect(() => {
    if (imageFile instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(imageFile);
    } else {
      setPreview(null);
    }
  }, [imageFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setValue('image', file);
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Imagen del evento</h2>
      <input type="file" accept="image/*" onChange={handleChange} />
      {preview && (
        <div className="mt-2">
          <img src={preview} alt="Vista previa" className="h-40 object-cover rounded" />
        </div>
      )}
    </section>
  );
};

export default ImageUploadSection;
