import { useState } from 'react';
import { drawingQuestions } from '../data/drawingQuestions';
import { useMastery } from '../hooks/useMastery';
import MasteryBadge from '../components/MasteryBadge';

export default function Drawing() {
  const { getLevel, markMastered, markFuzzy } = useMastery();
  const [activeId, setActiveId] = useState(drawingQuestions[0]?.id ?? '');
  const [showAnswer, setShowAnswer] = useState(false);

  const active = drawingQuestions.find((q) => q.id === activeId);

  return (
    <div className="space-y-6">
      <h1 className="heading-xl text-text font-terminal">画图题专项</h1>
      <p className="text-text-muted">训练画图和手算能力，共 {drawingQuestions.length} 题。</p>

      <div className="flex gap-2 flex-wrap">
        {drawingQuestions.map((q) => (
          <button
            key={q.id}
            onClick={() => { setActiveId(q.id); setShowAnswer(false); }}
            className={`text-sm px-3 py-1.5 rounded-lg border cursor-pointer transition-colors font-terminal ${
              activeId === q.id ? 'bg-neon-cyan text-black border-neon-cyan' : 'bg-cyber-surface text-text border-cyber-border hover:border-neon-cyan/50'
            }`}
          >
            {q.title}
            {getLevel(q.id) !== 'unlearned' && <span className="ml-1"><MasteryBadge level={getLevel(q.id)} /></span>}
          </button>
        ))}
      </div>

      {active && (
        <div className="bg-cyber-surface rounded-2xl border border-cyber-border p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text">{active.title}</h2>
              <span className="text-xs text-text-muted bg-cyber-border px-2 py-0.5 rounded font-terminal">{active.category}</span>
            </div>
            <MasteryBadge level={getLevel(active.id)} />
          </div>

          <div className="p-3 bg-callout-info-bg border border-callout-info-border rounded-lg">
            <p className="text-xs font-medium text-callout-info-label mb-1">规则</p>
            <p className="text-sm text-callout-info-text">{active.rules}</p>
          </div>

          <div className="p-3 bg-callout-neutral-bg border border-callout-neutral-border rounded-lg">
            <p className="text-xs font-medium text-callout-neutral-label mb-1">例题</p>
            <pre className="text-sm text-callout-neutral-text whitespace-pre-wrap font-sans">{active.example}</pre>
          </div>

          <div>
            <p className="text-sm font-medium text-text mb-2">解题步骤：</p>
            <ol className="space-y-2">
              {active.steps.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-text">
                  <span className="text-neon-cyan font-bold shrink-0">{i + 1}.</span> {s}
                </li>
              ))}
            </ol>
          </div>

          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="text-sm font-medium text-neon-cyan hover:text-neon-magenta cursor-pointer transition-colors font-terminal"
          >
            {showAnswer ? '隐藏答案 ▲' : '查看答案 ▼'}
          </button>

          {showAnswer && (
            <div className="p-4 bg-callout-success-bg border border-callout-success-border rounded-lg">
              <p className="text-sm font-medium text-callout-success-text">答案：</p>
              <pre className="text-sm text-callout-success-text mt-1 whitespace-pre-wrap font-sans">{active.answer}</pre>
            </div>
          )}

          {active.mistakes.length > 0 && (
            <div className="p-3 bg-callout-danger-bg border border-callout-danger-border rounded-lg">
              <p className="text-xs font-medium text-callout-danger-label mb-1">易错点</p>
              <ul className="space-y-1">
                {active.mistakes.map((m, i) => (
                  <li key={i} className="text-sm text-callout-danger-text flex gap-2"><span>⚠️</span> {m}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-3 bg-callout-accent-bg border border-callout-accent-border rounded-lg">
            <p className="text-xs font-medium text-callout-accent-label mb-1">考试模板</p>
            <p className="text-sm text-callout-accent-text font-medium">{active.examTemplate}</p>
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={() => markMastered(active.id)} className="bg-neon-green text-black px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-neon-green/80 transition-colors font-terminal">画对了</button>
            <button onClick={() => markFuzzy(active.id)} className="bg-neon-yellow text-black px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-neon-yellow/80 transition-colors font-terminal">不太确定</button>
          </div>
        </div>
      )}
    </div>
  );
}
