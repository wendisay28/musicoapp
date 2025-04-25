import { LogOut, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface AccountSettingsProps {
  onLogout: () => void;
  onDeleteAccount: () => void;
  className?: string;
}

/**
 * Componente para la configuración de cuenta
 * Maneja logout y eliminación de cuenta con confirmaciones
 * 
 * @param {Function} onLogout - Callback para cerrar sesión
 * @param {Function} onDeleteAccount - Callback para eliminar cuenta
 * @param {string} [className] - Clases adicionales para el contenedor
 */
export function AccountSettings({ 
  onLogout, 
  onDeleteAccount,
  className = ''
}: AccountSettingsProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle>Configuración de cuenta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <AccountActionItem
            icon={<LogOut className="h-5 w-5 text-muted-foreground" />}
            title="Cerrar sesión"
            description="Salir de tu cuenta actual"
            button={
              <Button variant="outline" onClick={onLogout}>
                Cerrar sesión
              </Button>
            }
          />

          <Separator />

          <AccountActionItem
            icon={<Trash2 className="h-5 w-5 text-destructive" />}
            title="Eliminar cuenta"
            description="Elimina permanentemente tu cuenta y todos tus datos"
            button={
              <DeleteAccountDialog onDeleteAccount={onDeleteAccount} />
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}

// Componente secundario para items de acción
const AccountActionItem = ({
  icon,
  title,
  description,
  button
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  button: React.ReactNode;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-4">
      {icon}
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
    {button}
  </div>
);

// Componente secundario para el diálogo de eliminación
const DeleteAccountDialog = ({ 
  onDeleteAccount 
}: {
  onDeleteAccount: () => void;
}) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="destructive">Eliminar cuenta</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
        <AlertDialogDescription>
          Esta acción no se puede deshacer. Eliminará permanentemente tu cuenta
          y todos los datos asociados.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction 
          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          onClick={onDeleteAccount}
        >
          Eliminar cuenta
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);