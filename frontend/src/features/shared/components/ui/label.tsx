"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { LabelProps } from "@/types/ui.ts";

const sizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base"
} as const;

type SizeType = keyof typeof sizeClasses;

const Label = React.forwardRef<HTMLLabelElement, LabelProps>((
  { 
    className,
    required = false,
    disabled = false,
    size = "md",
    children,
    ...props 
  }, 
  ref
) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none text-slate-700 dark:text-slate-300",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        required && "after:text-red-500 after:content-['*'] after:ml-0.5",
        disabled && "cursor-not-allowed opacity-70",
        sizeClasses[size as SizeType],
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = "Label";

export { Label };
export type { LabelProps };

