import { useState } from 'react';
import { designQuestions } from '../data/designQuestions';
import { useMastery } from '../hooks/useMastery';
import MasteryBadge from '../components/MasteryBadge';
import CodeBlock from '../components/CodeBlock';

export default function Design() {
  const { getLevel, markMastered, markFuzzy } = useMastery();
  const [activeId, setActiveId] = useState(designQuestions[0]?.id ?? '');
  const [showAnswer, setShowAnswer] = useState(false);

  const active = designQuestions.find((q) => q.id === activeId);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text">算法设计题</h1>
      <p className="text-text-muted">三段式训练：算法思想 + 伪代码 + 复杂度分析，共 {designQuestions.length} 题。</p>

      <div className="flex gap-2 flex-wrap">
        {designQuestions.map((q) => (
          <button
            key={q.id}
            onClick={() => { setActiveId(q.id); setShowAnswer(false); }}
            className={`text-sm px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
              activeId === q.id ? 'bg-primary text-white border-primary' : 'bg-surface text-text border-border hover:border-primary/50'
            }`}
          >
            {q.title}
            {getLevel(q.id) !== 'unlearned' && <span className="ml-1"><MasteryBadge level={getLevel(q.id)} /></span>}
          </button>
        ))}
      </div>

      {active && (
        <div className="bg-surface rounded-xl border border-border p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text">{active.title}</h2>
              <span className="text-xs text-text-muted bg-border px-2 py-0.5 rounded">{active.category}</span>
            </div>
            <MasteryBadge level={getLevel(active.id)} />
          </div>

          <div className="p-3 bg-callout-neutral-bg border border-callout-neutral-border rounded-lg">
            <p className="text-xs font-medium text-callout-neutral-label mb-1">题目</p>
            <p className="text-sm text-callout-neutral-text">{active.problem}</p>
          </div>

          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="text-sm font-medium text-primary hover:text-primary-dark cursor-pointer"
          >
            {showAnswer ? '隐藏答案 ▲' : '查看答案 ▼'}
          </button>

          {showAnswer && (
            <div className="space-y-4">
              <div className="p-4 bg-callout-info-bg border border-callout-info-border rounded-lg">
                <p className="text-sm font-medium text-callout-info-text mb-2">（1）算法思想</p>
                <p className="text-sm text-callout-info-text">{active.idea}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-text mb-2">（2）伪代码</p>
                <CodeBlock code={active.pseudoCode} />
              </div>

              <div className="p-3 bg-callout-neutral-bg border border-callout-neutral-border rounded-lg">
                <p className="text-sm font-medium text-callout-neutral-label mb-1">（3）复杂度分析</p>
                <p className="text-sm text-callout-neutral-text font-mono">{active.complexity}</p>
              </div>

              {active.scoringPoints.length > 0 && (
                <div className="p-3 bg-callout-warning-bg border border-callout-warning-border rounded-lg">
                  <p className="text-xs font-medium text-callout-warning-label mb-1">得分点</p>
                  <ul className="space-y-1">
                    {active.scoringPoints.map((p, i) => (
                      <li key={i} className="text-sm text-callout-warning-text flex gap-2">
                        <span className="text-callout-warning-label">{i + 1}.</span> {p}
                      </li>
                    ))}
                  </ul>
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
                <p className="text-xs font-medium text-callout-accent-label mb-1">答题模板</p>
                <p className="text-sm text-callout-accent-text">{active.template}</p>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button onClick={() => markMastered(active.id)} className="bg-success text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer">已掌握</button>
            <button onClick={() => markFuzzy(active.id)} className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer">还需复习</button>
          </div>
        </div>
      )}
    </div>
  );
}
