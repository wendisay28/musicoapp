import { JSX } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/features/shared/components/ui/avatar';
import { Button } from '@/features/shared/components/ui/button';
import { Edit } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { cn } from '@/lib/utils';

interface BusinessProfileHeaderProps {
    title?: string;
    showEditButton?: boolean;
    onEditClick?: () => void;
    className?: string;
    avatarSize?: 'sm' | 'md' | 'lg';
}

const AvatarComponent = Avatar as any;
const AvatarImageComponent = AvatarImage as any;
const AvatarFallbackComponent = AvatarFallback as any;
const ButtonComponent = Button as any;
const EditComponent = Edit as any;

export function BusinessProfileHeader({
    title = "Perfil de Empresa",
    showEditButton = true,
    onEditClick,
    className = '',
    avatarSize = 'md'
}: BusinessProfileHeaderProps): JSX.Element {
    const { user } = useAuth({});
    const avatarClasses = {
        sm: 'h-10 w-10',
        md: 'h-12 w-12',
        lg: 'h-16 w-16'
    } as const;

    const getInitials = (): string => {
        if (!user?.displayName) return 'EM';
        return user.displayName
            .split(' ')
            .slice(0, 2)
            .map((name: string) => name[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className={cn("flex justify-between items-center mb-6", className)}>
            <div className="flex items-center space-x-4">
                <AvatarComponent className={cn(avatarClasses[avatarSize], "border-2 border-muted")}>
                    <AvatarImageComponent
                        src={user?.photoURL || undefined}
                        alt={`Avatar de ${user?.displayName || 'empresa'}`}
                        className="object-cover"
                    />
                    <AvatarFallbackComponent className="bg-muted font-medium">
                        {getInitials()}
                    </AvatarFallbackComponent>
                </AvatarComponent>
                <h1 className="font-bold text-2xl tracking-tight">{title}</h1>
            </div>
            {showEditButton && onEditClick && (
                <ButtonComponent
                    variant="outline"
                    size="sm"
                    onClick={onEditClick}
                    aria-label="Editar perfil"
                >
                    <EditComponent className="h-4 w-4 mr-2" />
                    Editar perfil
                </ButtonComponent>
            )}
        </div>
    );
}
