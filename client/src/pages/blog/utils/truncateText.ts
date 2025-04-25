// truncateText.ts
// Acorta un texto largo a un número máximo de caracteres, agregando "..." si es necesario

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  }
  