import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useStreak() {
  const [streak, setStreak] = useLocalStorage('streak', 0);
  const [lastActive, setLastActive] = useLocalStorage('lastActive', '');

  const checkIn = useCallback(() => {
    const today = new Date().toDateString();
    if (lastActive === today) return streak;

    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const newStreak = lastActive === yesterday ? streak + 1 : 1;
    setStreak(newStreak);
    setLastActive(today);
    return newStreak;
  }, [lastActive, streak, setStreak, setLastActive]);

  return { streak: lastActive === new Date().toDateString() ? streak : streak, checkIn };
}
