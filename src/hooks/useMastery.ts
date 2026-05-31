import { useCallback } from 'react';
import type { MasteryLevel, MasteryRecord } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { showToast } from '../components/Toast';
import { masteredCheers, fuzzyCheers, wrongCheers, pick } from '../data/encouragements';

/** 模块级计数器，控制激励弹窗频率 */
let masteredCount = 0;
let fuzzyCount = 0;
let wrongCount = 0;
const MASTERED_INTERVAL = 3;
const FUZZY_INTERVAL = 5;
const WRONG_INTERVAL = 3;

export function useMastery() {
  const [records, setRecords] = useLocalStorage<Record<string, MasteryRecord>>('mastery', {});

  const setLevel = useCallback(
    (itemId: string, level: MasteryLevel) => {
      setRecords((prev) => ({
        ...prev,
        [itemId]: {
          itemId,
          level,
          lastReviewed: new Date().toISOString(),
          reviewCount: (prev[itemId]?.reviewCount ?? 0) + 1,
        },
      }));
    },
    [setRecords],
  );

  const getLevel = useCallback(
    (itemId: string): MasteryLevel => {
      return records[itemId]?.level ?? 'unlearned';
    },
    [records],
  );

  const markMastered = useCallback((itemId: string) => {
    setLevel(itemId, 'mastered');
    masteredCount++;
    if (masteredCount % MASTERED_INTERVAL === 0) {
      showToast(pick(masteredCheers));
    }
  }, [setLevel]);

  const markFuzzy = useCallback((itemId: string) => {
    setLevel(itemId, 'fuzzy');
    fuzzyCount++;
    if (fuzzyCount % FUZZY_INTERVAL === 0) {
      showToast(pick(fuzzyCheers));
    }
  }, [setLevel]);

  const markWrong = useCallback((itemId: string) => {
    setLevel(itemId, 'wrong');
    wrongCount++;
    if (wrongCount % WRONG_INTERVAL === 0) {
      showToast(pick(wrongCheers));
    }
  }, [setLevel]);

  const markMustReview = useCallback((itemId: string) => setLevel(itemId, 'must-review'), [setLevel]);

  const stats = {
    total: Object.keys(records).length,
    mastered: Object.values(records).filter((r) => r.level === 'mastered').length,
    fuzzy: Object.values(records).filter((r) => r.level === 'fuzzy').length,
    wrong: Object.values(records).filter((r) => r.level === 'wrong').length,
    unlearned: Object.values(records).filter((r) => r.level === 'unlearned').length,
    mustReview: Object.values(records).filter((r) => r.level === 'must-review').length,
  };

  return { records, getLevel, setLevel, markMastered, markFuzzy, markWrong, markMustReview, stats };
}
