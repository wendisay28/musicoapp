import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { UserData } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PersonalInfoProps {
  userData: UserData;
  onEdit?: () => void;
  emptyBioMessage?: string;
}

/**
 * Componente para mostrar y editar la información personal del usuario.
 * 
 * @param {Object} props - Propiedades del componente
 * @param {UserData} props.userData - Datos del usuario
 * @param {Function} [props.onEdit] - Callback para editar la información
 * @param {string} [props.emptyBioMessage] - Mensaje cuando no hay biografía
 */
export function PersonalInfo({ 
  userData, 
  onEdit, 
  emptyBioMessage = "No has añadido una biografía" 
}: PersonalInfoProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Información personal</CardTitle>
        {onEdit && <EditButton onClick={onEdit} />}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <BioSection bio={userData.bio} emptyMessage={emptyBioMessage} />
        
        {userData.location && (
          <InfoSection title="Ubicación" content={userData.location} />
        )}
        
        <SkillsSection skills={userData.skills} />
      </CardContent>
    </Card>
  );
}

// Componentes auxiliares

interface EditButtonProps {
  onClick: () => void;
}

const EditButton = ({ onClick }: EditButtonProps) => (
  <Button 
    variant="ghost" 
    size="sm" 
    onClick={onClick}
    aria-label="Editar información personal"
    className="flex items-center"
  >
    <Edit className="h-4 w-4 mr-2" />
    Editar
  </Button>
);

interface BioSectionProps {
  bio?: string;
  emptyMessage: string;
}

const BioSection = ({ bio, emptyMessage }: BioSectionProps) => (
  <div>
    <h3 className="font-medium mb-1">Biografía</h3>
    {bio ? (
      <p className="text-muted-foreground whitespace-pre-line">{bio}</p>
    ) : (
      <div className="text-center py-4 bg-muted/30 rounded-md">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    )}
  </div>
);

interface InfoSectionProps {
  title: string;
  content: string;
}

const InfoSection = ({ title, content }: InfoSectionProps) => (
  <div>
    <h3 className="font-medium mb-1">{title}</h3>
    <p className="text-muted-foreground">{content}</p>
  </div>
);

interface SkillsSectionProps {
  skills?: string[];
}

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  if (!skills || skills.length === 0) return null;

  return (
    <div>
      <h3 className="font-medium mb-2">Habilidades</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillBadge key={skill} skill={skill} />
        ))}
      </div>
    </div>
  );
};

interface SkillBadgeProps {
  skill: string;
}

const SkillBadge = ({ skill }: SkillBadgeProps) => (
  <Badge 
    variant="outline" 
    className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
  >
    {skill}
  </Badge>
);