import React from 'react';
import { toast } from 'react-hot-toast';
class ErrorMonitoring {
    constructor() {
        this.isInitialized = false;
    }
    static getInstance() {
        if (!ErrorMonitoring.instance) {
            ErrorMonitoring.instance = new ErrorMonitoring();
        }
        return ErrorMonitoring.instance;
    }
    initialize() {
        if (this.isInitialized)
            return;
        // Capturar errores no manejados
        window.addEventListener('error', (event) => {
            this.logError({
                message: event.message,
                stack: event.error?.stack,
                context: {
                    filename: event.filename,
                    lineno: event.lineno,
                    colno: event.colno,
                },
            });
        });
        // Capturar promesas rechazadas no manejadas
        window.addEventListener('unhandledrejection', (event) => {
            this.logError({
                message: event.reason?.message || 'Promise rejected',
                stack: event.reason?.stack,
                context: {
                    reason: event.reason,
                },
            });
        });
        this.isInitialized = true;
    }
    logError(error) {
        // En desarrollo, mostrar el error en la consola
        if (process.env.NODE_ENV === 'development') {
            console.error('Error:', error);
        }
        // En producción, enviar el error al servidor
        if (process.env.NODE_ENV === 'production') {
            this.sendToServer(error);
        }
        // Mostrar notificación al usuario
        toast.error(this.getUserFriendlyMessage(error));
    }
    getUserFriendlyMessage(error) {
        // Mapear códigos de error a mensajes amigables
        const errorMessages: any = {
            'NETWORK_ERROR': 'Error de conexión. Por favor, verifica tu conexión a internet.',
            'AUTH_ERROR': 'Error de autenticación. Por favor, inicia sesión nuevamente.',
            'VALIDATION_ERROR': 'Por favor, verifica los datos ingresados.',
            'SERVER_ERROR': 'Error del servidor. Por favor, intenta más tarde.',
            'DEFAULT': 'Ha ocurrido un error. Por favor, intenta nuevamente.',
        };
        return errorMessages[error.code || ''] || errorMessages.DEFAULT;
    }
    async sendToServer(error) {
        try {
            await fetch('/api/error-logging', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...error,
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent,
                    url: window.location.href,
                }),
            });
        }
        catch (e) {
            console.error('Error al enviar el log al servidor:', e);
        }
    }
}
export const errorMonitoring = ErrorMonitoring.getInstance();
