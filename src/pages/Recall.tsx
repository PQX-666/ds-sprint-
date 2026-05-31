import { useState } from 'react';
import { recallCards } from '../data/recallCards';
import { useMastery } from '../hooks/useMastery';
import { useWrongBook } from '../hooks/useWrongBook';
import MasteryBadge from '../components/MasteryBadge';

export default function Recall() {
  const { getLevel, markMastered, markFuzzy, markWrong } = useMastery();
  const { addItem } = useWrongBook();
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [history, setHistory] = useState<number[]>([]);

  const card = recallCards[index];

  if (!card) {
    return <div className="text-center py-20"><p className="text-xl text-text-muted font-terminal">全部完成！</p></div>;
  }

  const goTo = (next: number) => {
    setIsFlipped(false);
    setHistory((prev) => [...prev, index]);
    setIndex(next);
  };

  const handlePrev = () => {
    if (history.length === 0) return;
    setIsFlipped(false);
    const prevHistory = [...history];
    const prevIndex = prevHistory.pop()!;
    setHistory(prevHistory);
    setIndex(prevIndex);
  };

  const handleNext = () => goTo(Math.min(index + 1, recallCards.length - 1));

  const handleFlip = () => {
    if (!isFlipped) setIsFlipped(true);
  };

  return (
    <div className="space-y-8">
      <h1 className="heading-xl text-text font-terminal">速记卡片</h1>
      <div className="flex items-center justify-between">
        <p className="text-text-muted font-terminal">卡片 {index + 1} / {recallCards.length}</p>
        <MasteryBadge level={getLevel(card.id)} />
      </div>

      {/* 翻转卡片 */}
      <div className="card-3d-container" style={{ height: '360px' }}>
        <div
          className={`card-3d-inner ${isFlipped ? 'flipped' : ''}`}
          onClick={handleFlip}
          style={{ cursor: isFlipped ? 'default' : 'pointer' }}
        >
          {/* Front */}
          <div className="card-3d-front bg-cyber-surface rounded-2xl border border-cyber-border shadow-card p-8 flex flex-col justify-center select-none" style={{ height: '360px' }}>
            <div className="flex gap-2 mb-3">
              {card.tags.map((t) => (
                <span key={t} className="text-xs bg-cyber-border text-text-muted px-2 py-0.5 rounded font-terminal">{t}</span>
              ))}
            </div>
            <p className="text-xl font-medium text-text mb-4">{card.question}</p>
            {card.hint && (
              <p className="text-sm text-neon-cyan">提示：{card.hint}</p>
            )}
            {!isFlipped && (
              <p className="mt-4 text-xs text-text-muted font-terminal">点击卡片查看答案</p>
            )}
          </div>

          {/* Back */}
          <div className="card-3d-back bg-cyber-surface rounded-2xl border border-cyber-border shadow-card p-8 flex flex-col justify-center" style={{ height: '360px' }}>
            <div className="p-4 bg-neon-green-dim border border-neon-green/30 rounded-lg mb-4">
              <p className="text-sm text-neon-green">{card.answer}</p>
            </div>
            {card.memoryTip && (
              <p className="text-xs text-neon-yellow mb-4">💡 {card.memoryTip}</p>
            )}
          </div>
        </div>
      </div>

      {isFlipped && (
        <div className="flex gap-3 justify-center flex-wrap animate-scale-in">
          <button
            onClick={() => {
              markWrong(card.id);
              addItem({ questionId: card.id, type: 'recall', title: card.question.slice(0, 30), correctAnswer: card.answer, explanation: card.answer });
              handleNext();
            }}
            className="bg-neon-red text-white px-5 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-neon-red/80 active:scale-[0.97] transition-all font-terminal"
          >
            没记住
          </button>
          <button
            onClick={() => { markFuzzy(card.id); handleNext(); }}
            className="bg-neon-yellow text-black px-5 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-neon-yellow/80 active:scale-[0.97] transition-all font-terminal"
          >
            有点模糊
          </button>
          <button
            onClick={() => { markMastered(card.id); handleNext(); }}
            className="bg-neon-green text-black px-5 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-neon-green/80 active:scale-[0.97] transition-all font-terminal"
          >
            完全掌握
          </button>
          <button
            onClick={handleNext}
            className="bg-cyber-border text-text-muted px-5 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-cyber-border/80 active:scale-[0.97] transition-all font-terminal"
          >
            跳过
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={history.length === 0}
          className={`px-4 py-2 rounded-lg text-sm font-terminal transition-colors ${
            history.length === 0
              ? 'text-text-muted cursor-not-allowed'
              : 'text-neon-cyan hover:text-neon-magenta cursor-pointer'
          }`}
        >
          ← 上一张
        </button>
        <button
          onClick={handleNext}
          className="text-neon-cyan hover:text-neon-magenta px-4 py-2 rounded-lg text-sm cursor-pointer font-terminal transition-colors"
        >
          下一张 →
        </button>
      </div>
    </div>
  );
}
