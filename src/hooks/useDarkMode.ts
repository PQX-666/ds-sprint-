import { useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useDarkMode() {
  const [isDark, setIsDark] = useLocalStorage('darkMode', false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggle = useCallback(() => {
    setIsDark((prev) => !prev);
  }, [setIsDark]);

  return { isDark, toggle };
}
