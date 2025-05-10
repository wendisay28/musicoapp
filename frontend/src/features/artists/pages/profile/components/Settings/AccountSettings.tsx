import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LogOut, Trash2 } from 'lucide-react';
import { Button } from '@/features/ui/components/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from '@/features/ui/components/alert-dialog';
import { Card, CardHeader, CardTitle, CardContent, } from '@/features/ui/components/card';
import { Separator } from '@/features/ui/components/separator';
/**
 * Componente para la configuración de cuenta
 * Maneja logout y eliminación de cuenta con confirmaciones
 *
 * @param {Function} onLogout - Callback para cerrar sesión
 * @param {Function} onDeleteAccount - Callback para eliminar cuenta
 * @param {string} [className] - Clases adicionales para el contenedor
 */
export function AccountSettings (props: any){ onLogout, onDeleteAccount, className = '' }) {
    return (_jsx("div", { className: `space-y-6 ${className}`, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Configuraci\u00F3n de cuenta" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(AccountActionItem, { icon: _jsx(LogOut, { className: "h-5 w-5 text-muted-foreground" }), title: "Cerrar sesi\u00F3n", description: "Salir de tu cuenta actual", button: _jsx(Button, { variant: "outline", onClick: onLogout, children: "Cerrar sesi\u00F3n" }) }), _jsx(Separator, {}), _jsx(AccountActionItem, { icon: _jsx(Trash2, { className: "h-5 w-5 text-destructive" }), title: "Eliminar cuenta", description: "Elimina permanentemente tu cuenta y todos tus datos", button: _jsx(DeleteAccountDialog, { onDeleteAccount: onDeleteAccount }) })] })] }) }));
}
// Componente secundario para items de acción
const AccountActionItem: React.FC = ({ icon, title, description, button }) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [icon, _jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: title }), _jsx("p", { className: "text-sm text-muted-foreground", children: description })] })] }), button] }));
// Componente secundario para el diálogo de eliminación
const DeleteAccountDialog: React.FC = ({ onDeleteAccount }) => (_jsxs(AlertDialog, { children: [_jsx(AlertDialogTrigger, { asChild: true, children: _jsx(Button, { variant: "destructive", children: "Eliminar cuenta" }) }), _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "\u00BFEst\u00E1s absolutamente seguro?" }), _jsx(AlertDialogDescription, { children: "Esta acci\u00F3n no se puede deshacer. Eliminar\u00E1 permanentemente tu cuenta y todos los datos asociados." })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Cancelar" }), _jsx(AlertDialogAction, { className: "bg-destructive hover:bg-destructive/90 text-destructive-foreground", onClick: onDeleteAccount, children: "Eliminar cuenta" })] })] })] }));
