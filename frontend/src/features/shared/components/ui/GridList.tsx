import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/utils.js";
export function GridList (props: any){ items, renderItem, className, gridClassName, emptyMessage = "No hay elementos para mostrar", loading = false, loadingComponent, }) {
    if (loading) {
        return loadingComponent || _jsx("div", { children: "Cargando..." });
    }
    if (items.length === 0) {
        return (_jsx("div", { className: cn("text-center text-muted-foreground py-8", className), children: emptyMessage }));
    }
    return (_jsx("div", { className: cn("grid gap-4", gridClassName, className), children: items.map((item, index) => (_jsx("div", { children: renderItem(item) }, index))) }));
}
