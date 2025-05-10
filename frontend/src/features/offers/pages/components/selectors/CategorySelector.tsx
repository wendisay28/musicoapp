import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/features/ui/components/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/features/ui/components/popover';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
export function CategorySelector (props: any){ categories, selectedCategories, onSelect, }) {
    const [open, setOpen] = useState(false);
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", role: "combobox", "aria-expanded": open, className: "w-full justify-between", children: ["Categor\u00EDas", _jsx(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })] }) }), _jsx(PopoverContent, { className: "w-full p-0", children: _jsx("div", { className: "max-h-[300px] overflow-y-auto", children: categories.map((category) => (_jsxs(Button, { variant: "ghost", className: "w-full justify-start", onClick: () => onSelect(category.id), children: [_jsx(Check, { className: cn("mr-2 h-4 w-4", selectedCategories.includes(category.id) ? "opacity-100" : "opacity-0") }), category.name] }, category.id))) }) })] }));
}
