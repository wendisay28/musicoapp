import { useEffect, useCallback } from 'react';

type KeyHandler = (event: KeyboardEvent) => void;

interface KeyboardShortcut {
  key: string;
  handler: KeyHandler;
  description: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
}

export function useKeyboardNavigation(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const matchingShortcut = shortcuts.find(
        (shortcut) =>
          shortcut.key.toLowerCase() === event.key.toLowerCase() &&
          !!shortcut.ctrlKey === event.ctrlKey &&
          !!shortcut.shiftKey === event.shiftKey &&
          !!shortcut.altKey === event.altKey
      );

      if (matchingShortcut) {
        event.preventDefault();
        matchingShortcut.handler(event);
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Función para registrar atajos de teclado en el sistema
  const registerShortcuts = useCallback(() => {
    const shortcutList = shortcuts.map(
      (shortcut) =>
        `${[
          shortcut.ctrlKey && 'Ctrl',
          shortcut.altKey && 'Alt',
          shortcut.shiftKey && 'Shift',
        ]
          .filter(Boolean)
          .join(' + ')} + ${shortcut.key.toUpperCase()}: ${shortcut.description}`
    );

    return shortcutList;
  }, [shortcuts]);

  return {
    registerShortcuts,
  };
} 