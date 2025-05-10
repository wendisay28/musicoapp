import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useFormContext } from 'react-hook-form';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/features/ui/components/badge';
import { Button } from '@/features/ui/components/button';
import { Input } from '@/features/ui/components/input';
import { FormLabel, FormControl, FormMessage, FormDescription, FormField } from '@/features/ui/components/form';
/**
 * Sección para manejar las habilidades del usuario
 */
export function SkillsSection (props: any){ control }) {
    const { watch, setValue } = useFormContext();
    const skills = watch('skills') || [];
    const [newSkill, setNewSkill] = useState('');
    const handleAddSkill: React.FC = () => {
        if (!newSkill.trim())
            return;
        if (skills.length >= 10)
            return;
        if (skills.includes(newSkill.trim()))
            return;
        setValue('skills', [...skills, newSkill.trim()]);
        setNewSkill('');
    };
    const handleRemoveSkill: React.FC = (skillToRemove) => {
        setValue('skills', skills.filter((skill) => skill !== skillToRemove));
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h3", { className: "text-lg font-medium", children: "Habilidades" }), _jsx(FormField, { control: control, name: "skills", render: () => (_jsxs("div", { children: [_jsx(FormLabel, { children: "Tus habilidades destacadas" }), _jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: skills.map((skill) => (_jsxs(Badge, { variant: "secondary", className: "flex items-center gap-1", children: [skill, _jsx("button", { type: "button", onClick: () => handleRemoveSkill(skill), className: "hover:text-destructive", children: _jsx(X, { className: "h-3 w-3" }) })] }, skill))) }), _jsx(FormControl, { children: _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { placeholder: "A\u00F1adir habilidad", value: newSkill, onChange: (e) => setNewSkill(e.target.value), onKeyDown: (e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddSkill();
                                            }
                                        } }), _jsx(Button, { type: "button", onClick: handleAddSkill, disabled: !newSkill.trim() || skills.length >= 10, children: "A\u00F1adir" })] }) }), _jsxs(FormDescription, { children: [skills.length, "/10 habilidades a\u00F1adidas"] }), _jsx(FormMessage, {})] })) })] }));
}
