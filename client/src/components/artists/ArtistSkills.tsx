import React from 'react';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { ArtistSkillsProps } from '@/types/artist';

export const ArtistSkills: React.FC<ArtistSkillsProps> = ({
  skills,
  variant = "default",
  showLevel = false,
  className = ""
}) => {
  if (!skills || skills.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No hay habilidades registradas</p>
      </div>
    );
  }

  const renderSkill = (skill: string | { id: string; name: string; level?: string }, index: number) => {
    const isObject = typeof skill === 'object';
    const name = isObject ? skill.name : skill;
    const level = isObject ? skill.level : undefined;

    return (
      <Badge
        key={isObject ? skill.id : index}
        variant={variant}
        className={`${variant === "default" ? "bg-primary/10 text-primary" : ""} ${className}`}
      >
        {name}
        {showLevel && level && ` - ${level}`}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Habilidades</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map(renderSkill)}
        </div>
      </CardContent>
    </Card>
  );
}; 