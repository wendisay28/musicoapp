import { JSX } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';
import { Users, Building, Calendar, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

const CardComponent = Card as any;
const CardHeaderComponent = CardHeader as any;
const CardTitleComponent = CardTitle as any;
const CardContentComponent = CardContent as any;

function StatCard({ title, value, icon: Icon, trend }: StatCardProps): JSX.Element {
    return (
        <CardComponent>
            <CardHeaderComponent className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitleComponent className="text-sm font-medium">{title}</CardTitleComponent>
                {(Icon as any)({ className: "h-4 w-4 text-muted-foreground" })}
            </CardHeaderComponent>
            <CardContentComponent>
                <div className="text-2xl font-bold">{value}</div>
                {trend && (
                    <p className={cn("text-xs", trend.isPositive ? "text-green-600" : "text-red-600")}>
                        {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}% desde el mes pasado
                    </p>
                )}
            </CardContentComponent>
        </CardComponent>
    );
}

export function AdminStats(): JSX.Element {
    // Aquí se obtendrían los datos reales de la API
    const stats = [
        {
            title: "Usuarios Totales",
            value: "1,234",
            icon: Users,
            trend: {
                value: 12,
                isPositive: true
            }
        },
        {
            title: "Empresas",
            value: "89",
            icon: Building,
            trend: {
                value: 5,
                isPositive: true
            }
        },
        {
            title: "Eventos Activos",
            value: "45",
            icon: Calendar,
            trend: {
                value: 8,
                isPositive: false
            }
        },
        {
            title: "Ingresos Mensuales",
            value: "$12,345",
            icon: TrendingUp,
            trend: {
                value: 15,
                isPositive: true
            }
        }
    ];
    return (_jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: stats.map((stat) => (_jsx(StatCard, { ...stat }, stat.title))) }));
}
