import { JSX } from 'react';

export function Settings(): JSX.Element {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Configuración</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">General</h3>
            <p className="text-muted-foreground">Configuración general del sistema</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Notificaciones</h3>
            <p className="text-muted-foreground">Configuración de notificaciones</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Seguridad</h3>
            <p className="text-muted-foreground">Configuración de seguridad</p>
          </div>
        </div>
      </div>
    </div>
  );
} 