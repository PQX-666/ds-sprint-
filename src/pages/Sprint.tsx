import { useState, useEffect } from 'react';
import { recallCards } from '../data/recallCards';
import { useMastery } from '../hooks/useMastery';
import { useWrongBook } from '../hooks/useWrongBook';

type Mode = 'idle' | 'running' | 'finished';

function shuffle() {
  const arr = [...recallCards].sort(() => Math.random() - 0.5);
  return arr;
}

export default function Sprint() {
  const { markMastered, markWrong } = useMastery();
  const { addItem } = useWrongBook();
  const [mode, setMode] = useState<Mode>('idle');
  const [targetMinutes, setTargetMinutes] = useState(10);
  const [timeLeft, setTimeLeft] = useState(targetMinutes * 60);
  const [idx, setIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [count, setCount] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [cards, setCards] = useState(shuffle);

  useEffect(() => {
    if (mode !== 'running') return;
    if (timeLeft <= 0) {
      setMode('finished');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setMode('finished');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [mode, timeLeft]);

  const handleFlip = () => {
    if (!isFlipped) setIsFlipped(true);
  };

  const handleStart = () => {
    setCards(shuffle());
    setTimeLeft(targetMinutes * 60);
    setIdx(0);
    setCount(0);
    setCorrect(0);
    setIsFlipped(false);
    setMode('running');
  };

  const card = cards[idx % cards.length];

  const handleCorrect = () => {
    markMastered(card.id);
    setCorrect((c) => c + 1);
    setCount((c) => c + 1);
    setIsFlipped(false);
    setIdx((i) => i + 1);
  };

  const handleWrong = () => {
    markWrong(card.id);
    addItem({
      questionId: card.id,
      type: 'recall',
      title: card.question.slice(0, 30),
      correctAnswer: card.answer,
      explanation: '',
    });
    setCount((c) => c + 1);
    setIsFlipped(false);
    setIdx((i) => i + 1);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  if (mode === 'idle') {
    return (
      <div className="space-y-6">
        <h1 className="heading-xl text-text font-terminal">限时冲刺</h1>
        <div className="bg-cyber-surface rounded-2xl border border-cyber-border shadow-card p-8 text-center space-y-4">
          <p className="text-lg text-text">
            在规定时间内尽可能多地刷速记卡片，检验反应速度。
          </p>
          <div className="flex items-center justify-center gap-3">
            <label className="text-sm text-text-muted">目标时间：</label>
            <select
              value={targetMinutes}
              onChange={(e) => setTargetMinutes(Number(e.target.value))}
              className="p-2 rounded-lg border border-cyber-border bg-cyber-bg text-text cursor-pointer"
            >
              <option value={5}>5 分钟</option>
              <option value={10}>10 分钟</option>
              <option value={15}>15 分钟</option>
              <option value={20}>20 分钟</option>
              <option value={30}>30 分钟</option>
            </select>
          </div>
          <button
            onClick={handleStart}
            className="gradient-cyber text-white px-8 py-3 rounded-xl text-lg font-medium cursor-pointer hover:brightness-110 active:scale-[0.97] transition-all animate-neon-pulse font-terminal"
          >
            开始冲刺
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'finished') {
    const pct = count > 0 ? Math.round((correct / count) * 100) : 0;
    return (
      <div className="space-y-6">
        <h1 className="heading-xl text-text font-terminal">冲刺结束</h1>
        <div className="bg-cyber-surface rounded-2xl border border-cyber-border shadow-card p-8 text-center space-y-4">
          <p className="text-4xl font-bold gradient-cyber-text font-terminal">
            {correct} / {count}
          </p>
          <p className="text-text-muted">正确率 {pct}%</p>
          {pct >= 80 && <p className="text-neon-green font-medium font-terminal">太厉害了，继续保持！</p>}
          {pct >= 50 && pct < 80 && <p className="text-neon-yellow font-medium font-terminal">不错，再刷一轮会更熟练！</p>}
          {pct < 50 && <p className="text-text-muted font-terminal">别灰心，错的多进步空间才大！</p>}
          <button
            onClick={handleStart}
            className="gradient-cyber text-white px-6 py-2.5 rounded-xl font-medium cursor-pointer hover:brightness-110 active:scale-[0.97] transition-all font-terminal"
          >
            再来一次
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="heading-xl text-text font-terminal">限时冲刺</h1>
        <p className="text-2xl font-mono font-bold gradient-cyber-text">{formatTime(timeLeft)}</p>
      </div>

      <div className="flex gap-4 text-sm text-text-muted font-terminal">
        <span>已完成：{count}</span>
        <span>正确：{correct}</span>
        <span>正确率：{count > 0 ? Math.round((correct / count) * 100) : 0}%</span>
      </div>

      <div className="card-3d-container cursor-pointer" style={{ height: '320px' }} onClick={handleFlip}>
        <div className={`card-3d-inner ${isFlipped ? 'flipped' : ''}`}>
          {/* Front */}
          <div className="card-3d-front bg-cyber-surface rounded-2xl border border-cyber-border shadow-card p-8 flex flex-col justify-center" style={{ height: '320px' }}>
            <div className="flex gap-2 mb-3">
              {card?.tags.map((t) => (
                <span key={t} className="text-xs bg-cyber-border text-text-muted px-2 py-0.5 rounded font-terminal">{t}</span>
              ))}
            </div>
            <p className="text-xl font-medium text-text mb-4">{card?.question}</p>
            {!isFlipped && (
              <p className="text-xs text-text-muted font-terminal">点击卡片查看答案</p>
            )}
          </div>

          {/* Back */}
          <div className="card-3d-back bg-cyber-surface rounded-2xl border border-cyber-border shadow-card p-8 flex flex-col justify-center" style={{ height: '320px' }}>
            <div className="p-4 bg-neon-green-dim border border-neon-green/30 rounded-lg">
              <p className="text-sm text-neon-green">{card?.answer}</p>
            </div>
          </div>
        </div>
      </div>

      {isFlipped && (
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleWrong}
            className="bg-neon-red text-white px-6 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-neon-red/80 active:scale-[0.97] transition-all font-terminal"
          >
            没记住
          </button>
          <button
            onClick={handleCorrect}
            className="bg-neon-green text-black px-6 py-2.5 rounded-xl font-medium cursor-pointer hover:bg-neon-green/80 active:scale-[0.97] transition-all font-terminal"
          >
            记住了
          </button>
        </div>
      )}
    </div>
  );
}
