import { useFormContext } from 'react-hook-form';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
  FormField
} from '@/components/ui/form';
import { Control } from 'react-hook-form';

interface SkillsSectionProps {
  control: Control<any>;
  onAddSkill?: (skill: string) => void;
  onRemoveSkill?: (skill: string) => void;
}

/**
 * Sección para manejar las habilidades del usuario
 */
export function SkillsSection({ control }: SkillsSectionProps) {
  const { watch, setValue } = useFormContext();
  const skills = watch('skills') || [];
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    if (skills.length >= 10) return;
    if (skills.includes(newSkill.trim())) return;
    
    setValue('skills', [...skills, newSkill.trim()]);
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setValue(
      'skills',
      skills.filter((skill: string) => skill !== skillToRemove)
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Habilidades</h3>
      
      <FormField
        control={control}
        name="skills"
        render={() => (
          <div>
            <FormLabel>Tus habilidades destacadas</FormLabel>
            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map((skill: string) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <FormControl>
              <div className="flex gap-2">
                <Input
                  placeholder="Añadir habilidad"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddSkill}
                  disabled={!newSkill.trim() || skills.length >= 10}
                >
                  Añadir
                </Button>
              </div>
            </FormControl>
            <FormDescription>
              {skills.length}/10 habilidades añadidas
            </FormDescription>
            <FormMessage />
          </div>
        )}
      />
    </div>
  );
}