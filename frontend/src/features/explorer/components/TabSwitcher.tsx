import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/features/ui/components/button';
import { cn } from '@/lib/utils';
export function TabSwitcher (props: any){ tabs, activeTab, onTabChange, className }) {
    return (_jsx("div", { className: cn('flex gap-2', className), children: tabs.map((tab) => (_jsxs(Button, { variant: activeTab === tab.id ? 'default' : 'outline', onClick: () => onTabChange(tab.id), className: "flex items-center gap-2", children: [_jsx("span", { className: "material-icons text-lg", children: tab.icon }), tab.label] }, tab.id))) }));
}
