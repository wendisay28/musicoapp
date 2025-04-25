/**
 * Sección "Sobre mí" del perfil del artista
 * Muestra la biografía con estilo similar a Instagram:
 * - Saltos de línea preservados
 * - Emojis soportados
 * - Posibilidad de hashtags y menciones
 * - Texto con formato responsive
 */

interface ArtistAboutProps {
  bio?: string;
}

export const ArtistAbout = ({ bio }: ArtistAboutProps) => {
  // Función para formatear el texto como en Instagram
  const formatBio = (text?: string) => {
    if (!text) return "Este artista no ha proporcionado una biografía.";
    
    return text.split('\n').map((paragraph, i) => (
      <span key={i}>
        {paragraph.split(' ').map((word, j) => {
          // Detectar hashtags y menciones
          if (word.startsWith('#')) {
            return (
              <span key={j} className="text-primary font-medium hover:underline cursor-pointer">
                {word}{' '}
              </span>
            );
          }
          if (word.startsWith('@')) {
            return (
              <span key={j} className="text-blue-500 font-medium hover:underline cursor-pointer">
                {word}{' '}
              </span>
            );
          }
          return <span key={j}>{word} </span>;
        })}
        <br />
      </span>
    ));
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold text-lg mb-2">Sobre mí</h2>
      <div className="text-muted-foreground whitespace-pre-line font-light leading-relaxed">
        {formatBio(bio)}
      </div>
    </div>
  );
};