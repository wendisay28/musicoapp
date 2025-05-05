import * as Sentry from "@sentry/react";
import { toast } from "../hooks/use-toast";

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public severity: "error" | "warning" | "info" = "error"
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    // Errores de la aplicación
    toast({
      title: "Error",
      description: error.message,
      variant: error.severity === "error" ? "destructive" : "default",
    });

    if (error.severity === "error") {
      Sentry.captureException(error);
    }
  } else if (error instanceof Error) {
    // Errores nativos
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    Sentry.captureException(error);
  } else {
    // Errores desconocidos
    toast({
      title: "Error",
      description: "Ha ocurrido un error inesperado",
      variant: "destructive",
    });
    Sentry.captureException(new Error("Error desconocido"));
  }
}

export function logError(error: unknown, context?: Record<string, unknown>) {
  if (error instanceof Error) {
    console.error(`[${error.name}] ${error.message}`, {
      error,
      context,
      stack: error.stack,
    });
  } else {
    console.error("Error desconocido:", { error, context });
  }
} 