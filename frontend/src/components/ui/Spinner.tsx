import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export const Spinner: React.FC = ({ size = 'md', className = '' }) => {
    const sizeClasses: any = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
    };
    return (_jsx("div", { className: `animate-spin rounded-full border-2 border-gray-300 border-t-primary ${sizeClasses[size]} ${className}`, role: "status", "aria-label": "Loading" }));
};
