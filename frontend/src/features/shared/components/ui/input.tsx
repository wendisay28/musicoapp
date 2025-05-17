"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { InputProps } from "@/types/ui.ts";

const sizeClasses = {
  sm: "h-8 px-2 text-xs",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base"
} as const;

type SizeType = keyof typeof sizeClasses;

const Input = React.forwardRef<HTMLInputElement, InputProps>((
  { 
    className,
    type = "text",
    error = false,
    fullWidth = true,
    size = "md",
    ...props
  },
  ref
) => {
  return (
    <input
      type={type}
      className={cn(
        "flex rounded-md border border-slate-200 bg-white text-slate-950 ring-offset-white transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800",
        error && "border-red-500 focus-visible:ring-red-500 dark:border-red-900 dark:focus-visible:ring-red-900",
        fullWidth ? "w-full" : "w-auto",
        sizeClasses[size as SizeType],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
