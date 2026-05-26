import { useState, useMemo } from 'react';
import { concepts } from '../data/concepts';
import { useMastery } from '../hooks/useMastery';
import MasteryBadge from '../components/MasteryBadge';
import type { ConceptCategory } from '../types';

const categories: ConceptCategory[] = ['基础概念', '线性结构', '树结构', '图结构', '查找', '排序'];

export default function Concepts() {
  const { getLevel, setLevel } = useMastery();
  const [filter, setFilter] = useState<ConceptCategory | '全部'>('全部');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (filter === '全部' ? concepts : concepts.filter((c) => c.category === filter)),
    [filter],
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text">概念地基</h1>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('全部')}
          className={`text-sm px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
            filter === '全部' ? 'bg-primary text-white border-primary' : 'bg-surface text-text border-border hover:border-primary/50'
          }`}
        >
          全部
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-sm px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
              filter === cat ? 'bg-primary text-white border-primary' : 'bg-surface text-text border-border hover:border-primary/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((c) => {
          const isExpanded = expandedId === c.id;
          return (
            <div key={c.id} className="bg-surface rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setExpandedId(isExpanded ? null : c.id)}
                className="w-full text-left p-5 cursor-pointer hover:bg-bg/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-muted bg-border px-2 py-0.5 rounded">{c.category}</span>
                    <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">{c.examFocus}</span>
                  </div>
                  <MasteryBadge level={getLevel(c.id)} />
                </div>
                <h3 className="text-lg font-semibold text-text">{c.title}</h3>
                <p className="text-sm text-text-muted mt-1">{c.definition}</p>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
                  {c.plainExplanation && (
                    <div className="p-3 bg-callout-info-bg border border-callout-info-border rounded-lg">
                      <p className="text-xs font-medium text-callout-info-label mb-1">大白话解释</p>
                      <p className="text-sm text-callout-info-text">{c.plainExplanation}</p>
                    </div>
                  )}

                  {c.analogy && (
                    <div className="p-3 bg-callout-warning-bg border border-callout-warning-border rounded-lg">
                      <p className="text-xs font-medium text-callout-warning-label mb-1">类比理解</p>
                      <p className="text-sm text-callout-warning-text">{c.analogy}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-medium text-text-muted mb-1">考试标准表达</p>
                    <p className="text-sm text-text">{c.standardAnswer}</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-text-muted mb-1">要点</p>
                    <ul className="space-y-1">
                      {c.keyPoints.map((p, i) => (
                        <li key={i} className="text-sm text-text flex gap-2">
                          <span className="text-primary shrink-0">•</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {c.mistakes.length > 0 && (
                    <div className="p-3 bg-callout-danger-bg border border-callout-danger-border rounded-lg">
                      <p className="text-xs font-medium text-callout-danger-label mb-1">易错点</p>
                      <ul className="space-y-1">
                        {c.mistakes.map((m, i) => (
                          <li key={i} className="text-sm text-callout-danger-text flex gap-2">
                            <span className="shrink-0">⚠️</span> {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="p-3 bg-callout-success-bg border border-callout-success-border rounded-lg">
                    <p className="text-xs font-medium text-callout-success-label mb-1">记忆口诀</p>
                    <p className="text-sm text-callout-success-text font-medium">{c.memoryTip}</p>
                  </div>

                  <div className="p-3 bg-callout-accent-bg border border-callout-accent-border rounded-lg">
                    <p className="text-xs font-medium text-callout-accent-label mb-1">自测</p>
                    <p className="text-sm text-callout-accent-text">{c.selfTest}</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button onClick={() => setLevel(c.id, 'mastered')} className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${getLevel(c.id) === 'mastered' ? 'bg-success text-white border-success' : 'bg-transparent text-success border-success/30 hover:bg-success/10'}`}>已掌握</button>
                    <button onClick={() => setLevel(c.id, 'fuzzy')} className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${getLevel(c.id) === 'fuzzy' ? 'bg-accent text-white border-accent' : 'bg-transparent text-accent border-accent/30 hover:bg-accent/10'}`}>有点模糊</button>
                    <button onClick={() => setLevel(c.id, 'must-review')} className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${getLevel(c.id) === 'must-review' ? 'bg-danger text-white border-danger' : 'bg-transparent text-danger border-danger/30 hover:bg-danger/10'}`}>必须复习</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
