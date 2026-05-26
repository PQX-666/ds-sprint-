import { useCallback } from 'react';
import type { WrongBookItem, QuestionType } from '../types';
import { useLocalStorage } from './useLocalStorage';

let nextId = Date.now();

export function useWrongBook() {
  const [items, setItems] = useLocalStorage<WrongBookItem[]>('wrongBook', []);

  const addItem = useCallback(
    (item: {
      questionId: string;
      type: QuestionType;
      title: string;
      userAnswer?: string;
      correctAnswer: string;
      explanation: string;
      mistakeReason?: string;
    }) => {
      const newItem: WrongBookItem = {
        ...item,
        id: `wb-${nextId++}`,
        addedAt: new Date().toISOString(),
      };
      setItems((prev) => [newItem, ...prev]);
    },
    [setItems],
  );

  const removeItem = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((i) => i.id !== id));
    },
    [setItems],
  );

  const clearAll = useCallback(() => {
    setItems([]);
  }, [setItems]);

  return { items, addItem, removeItem, clearAll };
}
