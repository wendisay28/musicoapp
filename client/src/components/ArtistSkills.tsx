import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

export interface ArtistSkillsProps {
  /** Lista de habilidades */
  skills: string[];
  /** Nivel de experiencia por habilidad */
  experienceLevels?: Record<string, 'beginner' | 'intermediate' | 'expert'>;
  /** Callback cuando se hace clic en una habilidad */
  onSkillClick?: (skill: string) => void;
  /** Clases CSS personalizadas */
  className?: string;
}

/**
 * Componente para mostrar las habilidades de un artista
 * @component
 * @example
 * ```tsx
 * <ArtistSkills
 *   skills={['Pintura', 'Dibujo', 'Escultura']}
 *   experienceLevels={{
 *     'Pintura': 'expert',
 *     'Dibujo': 'intermediate',
 *     'Escultura': 'beginner'
 *   }}
 *   onSkillClick={(skill) => console.log(skill)}
 * />
 * ```
 */
export function ArtistSkills({
  skills,
  experienceLevels = {},
  onSkillClick,
  className
}: ArtistSkillsProps) {
  const getExperienceColor = (level: string) => {
    switch (level) {
      case 'expert':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'beginner':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Habilidades</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => {
            const level = experienceLevels[skill];
            return (
              <Badge
                key={skill}
                variant="outline"
                className={cn(
                  "cursor-pointer hover:bg-gray-100",
                  level && getExperienceColor(level)
                )}
                onClick={() => onSkillClick?.(skill)}
              >
                {skill}
                {level && (
                  <span className="ml-1 text-xs">
                    {level === 'expert' && '★'}
                    {level === 'intermediate' && '★★'}
                    {level === 'beginner' && '★★★'}
                  </span>
                )}
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
} 