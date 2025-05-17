"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { CheckboxProps } from "@/types/ui.ts";

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>((
  { className, checked, onCheckedChange, type = "button", ...props }, 
  ref
) => {
  return (
    <button
      ref={ref}
      type={type}
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-slate-300 bg-white ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-slate-900 data-[state=checked]:text-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800 dark:data-[state=checked]:bg-slate-50 dark:data-[state=checked]:text-slate-900",
        className
      )}
      {...props}
    >
      {checked && (
        <span className="flex items-center justify-center text-current">
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      )}
    </button>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };

