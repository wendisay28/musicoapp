import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './sentry';
import { logger } from '@/lib/logger';
import './styles/globals.css';
const mount: React.FC = () => {
    const root = createRoot(document.getElementById('root'));
    root.render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
};
const retryMount: React.FC = () => {
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
