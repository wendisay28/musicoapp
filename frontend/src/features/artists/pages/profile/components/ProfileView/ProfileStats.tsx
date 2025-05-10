import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';
import { Users, Star, Calendar, Award } from 'lucide-react';
export function ProfileStats (props: any){ stats }) {
    const statItems = [
        {
            title: 'Seguidores',
            value: stats.followers,
            icon: Users,
        },
        {
            title: 'Calificación',
            value: stats.rating.toFixed(1),
            icon: Star,
        },
        {
            title: 'Proyectos Completados',
            value: stats.completedProjects,
            icon: Calendar,
        },
        {
            title: 'Premios',
            value: stats.awards,
            icon: Award,
        },
    ];
    return (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: statItems.map((item) => (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: item.title }), _jsx(item.icon, { className: "h-4 w-4 text-muted-foreground" })] }), _jsx(CardContent, { children: _jsx("div", { className: "text-2xl font-bold", children: item.value }) })] }, item.title))) }));
}
