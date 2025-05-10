import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from '@/features/shared/components/ui/dialog';
const Command = React.forwardRef(({ className, ...props }, ref) => (_jsx(CommandPrimitive, { ref: ref, className: cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className), ...props })));
Command.displayName = CommandPrimitive.displayName;
const CommandDialog: React.FC = ({ children, ...props }) => {
    return (_jsx(Dialog, { ...props, children: _jsxs(DialogContent, { className: "overflow-hidden p-0 shadow-lg", "aria-labelledby": "command-dialog-title", "aria-describedby": "command-dialog-description", children: [_jsx("span", { id: "command-dialog-description", className: "sr-only", children: "Search commands dialog" }), _jsx(Command, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children: children })] }) }));
};
const CommandInput = React.forwardRef(({ className, ...props }, ref) => (_jsxs("div", { className: "flex items-center border-b px-3", "data-cmdk-input-wrapper": "", children: [_jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }), _jsx(CommandPrimitive.Input, { ref: ref, className: cn("flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className), ...props })] })));
CommandInput.displayName = CommandPrimitive.Input.displayName;
const CommandList = React.forwardRef(({ className, ...props }, ref) => (_jsx(CommandPrimitive.List, { ref: ref, className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className), ...props })));
CommandList.displayName = CommandPrimitive.List.displayName;
const CommandEmpty = React.forwardRef((props, ref) => (_jsx(CommandPrimitive.Empty, { ref: ref, className: "py-6 text-center text-sm", ...props })));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;
const CommandGroup = React.forwardRef(({ className, ...props }, ref) => (_jsx(CommandPrimitive.Group, { ref: ref, className: cn("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", className), ...props })));
CommandGroup.displayName = CommandPrimitive.Group.displayName;
const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => (_jsx(CommandPrimitive.Separator, { ref: ref, className: cn("-mx-1 h-px bg-border", className), ...props })));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;
const CommandItem = React.forwardRef(({ className, ...props }, ref) => (_jsx(CommandPrimitive.Item, { ref: ref, className: cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50", className), ...props })));
CommandItem.displayName = CommandPrimitive.Item.displayName;
const CommandShortcut: React.FC = ({ className, ...props }) => {
    return (_jsx("span", { className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className), ...props }));
};
CommandShortcut.displayName = "CommandShortcut";
export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator, };
