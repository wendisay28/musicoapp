import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from "@sentry/react";
import App from './App';
import './sentry';
import { logger } from '@/lib/logger';

const mount = () => {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("No se encontró el elemento root");
    return;
  }

  const root = createRoot(rootElement); // Usamos la variable ya definida
  root.render(
    <Sentry.ErrorBoundary fallback={<p>Something went wrong!</p>}>
      <App />
    </Sentry.ErrorBoundary>
  );
};

const retryMount = () => {
  logger.info("Reintentando montar la aplicación...");
  // ... rest of the code ...
};

// Intentar montar inmediatamente
mount();

// Recargar si hay errores de conexión
window.addEventListener('load', () => {
  if (!document.getElementById("root")?.children.length) {
    console.log("Reintentando montar la aplicación...");
    mount();
  }
});