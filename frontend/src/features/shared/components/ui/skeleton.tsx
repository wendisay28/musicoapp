import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
function Skeleton (props: any){ className, ...props }) {
    return (_jsx("div", { className: cn("animate-pulse rounded-md bg-muted", className), ...props }));
}
export { Skeleton };
