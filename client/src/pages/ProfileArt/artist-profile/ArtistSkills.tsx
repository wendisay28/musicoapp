/**
 * Sección de habilidades del artista
 * Muestra las habilidades/etiquetas del artista en forma de badges
 */

import { Badge } from "@/components/ui/badge";

interface ArtistSkillsProps {
  skills?: string[];
}

export const ArtistSkills = ({ skills }: ArtistSkillsProps) => {
  return (
    <div className="mb-6">
      <h2 className="font-semibold text-lg mb-2">Habilidades</h2>
      <div className="flex flex-wrap gap-2">
        {skills?.length ? (
          skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-primary/10 text-primary">
              {skill}
            </Badge>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">No se han especificado habilidades.</p>
        )}
      </div>
    </div>
  );
};