import * as Sentry from "@sentry/react";

// Aquí debes colocar tu DSN de Sentry
Sentry.init({
  dsn: "tu_dsn_aqui",  // Reemplaza con el DSN de tu proyecto Sentry
  tracesSampleRate: 1.0, // Ajusta la tasa de muestreo de trazas (puedes reducirlo si es necesario)
});
