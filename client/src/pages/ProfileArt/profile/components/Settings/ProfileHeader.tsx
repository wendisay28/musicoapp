import { Edit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";

interface ProfileHeaderProps {
  title?: string;
  showEditButton?: boolean;
  onEditClick?: () => void;
  className?: string;
  avatarSize?: 'sm' | 'md' | 'lg';
}

/**
 * Componente de encabezado para perfiles de usuario
 * 
 * @param {string} [title="Mi Perfil"] - Título del encabezado
 * @param {boolean} [showEditButton=true] - Mostrar botón de edición
 * @param {Function} [onEditClick] - Callback para el botón de edición
 * @param {string} [className] - Clases adicionales para el contenedor
 * @param {'sm'|'md'|'lg'} [avatarSize='md'] - Tamaño del avatar
 */
export function ProfileHeader({ 
  title = "Mi Perfil", 
  showEditButton = true,
  onEditClick,
  className = '',
  avatarSize = 'md'
}: ProfileHeaderProps) {
  const { user } = useAuth();
  
  const avatarClasses = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const getInitials = () => {
    if (!user?.displayName) return 'US';
    return user.displayName
      .split(' ')
      .slice(0, 2)
      .map(name => name[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className={cn(
      "flex justify-between items-center mb-6",
      className
    )}>
      <div className="flex items-center space-x-4">
        <Avatar className={cn(
          avatarClasses[avatarSize],
          "border-2 border-muted"
        )}>
          <AvatarImage 
            src={user?.photoURL || undefined}
            alt={`Avatar de ${user?.displayName || 'usuario'}`}
            className="object-cover"
          />
          <AvatarFallback className="bg-muted font-medium">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
        <h1 className="font-bold text-2xl tracking-tight">{title}</h1>
      </div>
      {showEditButton && onEditClick && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onEditClick}
          aria-label="Editar perfil"
        >
          <Edit className="h-4 w-4 mr-2" />
          Editar perfil
        </Button>
      )}
    </div>
  );
}