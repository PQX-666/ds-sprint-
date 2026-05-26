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

  const card = recallCards[index];

  if (!card) {
    return <div className="text-center py-20"><p className="text-xl text-text-muted">全部完成！</p></div>;
  }

  const handleNext = () => {
    setIsFlipped(false);
    setIndex((i) => Math.min(i + 1, recallCards.length - 1));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text">速记卡片</h1>
      <div className="flex items-center justify-between">
        <p className="text-text-muted">卡片 {index + 1} / {recallCards.length}</p>
        <MasteryBadge level={getLevel(card.id)} />
      </div>

      <div className="card-3d-container" style={{ height: '360px' }}>
        <div className={`card-3d-inner ${isFlipped ? 'flipped' : ''}`}>
          {/* Front */}
          <div className="card-3d-front bg-surface rounded-xl border border-border shadow-card p-8 flex flex-col justify-center" style={{ height: '360px' }}>
            <div className="flex gap-2 mb-3">
              {card.tags.map((t) => (
                <span key={t} className="text-xs bg-border text-text-muted px-2 py-0.5 rounded">{t}</span>
              ))}
            </div>
            <p className="text-xl font-medium text-text mb-4">{card.question}</p>
            {card.hint && (
              <p className="text-sm text-primary">提示：{card.hint}</p>
            )}
            <button
              onClick={() => setIsFlipped(true)}
              className="mt-4 text-sm font-medium text-white bg-primary px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-dark transition-colors self-start"
            >
              翻转查看答案
            </button>
          </div>

          {/* Back */}
          <div className="card-3d-back bg-surface rounded-xl border border-border shadow-card p-8 flex flex-col justify-center" style={{ height: '360px' }}>
            <div className="p-4 bg-callout-success-bg border border-callout-success-border rounded-lg mb-4">
              <p className="text-sm text-callout-success-text">{card.answer}</p>
            </div>
            {card.memoryTip && (
              <p className="text-xs text-accent mb-4">💡 {card.memoryTip}</p>
            )}
          </div>
        </div>
      </div>

      {isFlipped && (
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => {
              markWrong(card.id);
              addItem({ questionId: card.id, type: 'recall', title: card.question.slice(0, 30), correctAnswer: card.answer, explanation: card.answer });
              handleNext();
            }}
            className="bg-danger text-white px-5 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-danger/80 active:scale-[0.97] transition-transform"
          >
            没记住
          </button>
          <button
            onClick={() => { markFuzzy(card.id); handleNext(); }}
            className="bg-accent text-white px-5 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-accent/80 active:scale-[0.97] transition-transform"
          >
            有点模糊
          </button>
          <button
            onClick={() => { markMastered(card.id); handleNext(); }}
            className="bg-success text-white px-5 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-success/80 active:scale-[0.97] transition-transform"
          >
            完全掌握
          </button>
          <button
            onClick={handleNext}
            className="bg-border text-text-muted px-5 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-border/80 active:scale-[0.97] transition-transform"
          >
            跳过
          </button>
        </div>
      )}
    </div>
  );
}
