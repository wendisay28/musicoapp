import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { errorMonitoring } from './lib/error-monitoring';
import './index.css';
// Inicializar el monitoreo de errores
errorMonitoring.initialize();
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
