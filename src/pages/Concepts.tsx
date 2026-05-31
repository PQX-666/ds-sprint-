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
    <div className="space-y-8">
      <h1 className="heading-xl text-text font-terminal">概念地基</h1>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('全部')}
          className={`text-sm px-3 py-1.5 rounded-lg border cursor-pointer transition-colors font-terminal ${
            filter === '全部' ? 'bg-neon-cyan text-black border-neon-cyan' : 'bg-cyber-surface text-text border-cyber-border hover:border-neon-cyan/50'
          }`}
        >
          全部
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-sm px-3 py-1.5 rounded-lg border cursor-pointer transition-colors font-terminal ${
              filter === cat ? 'bg-neon-cyan text-black border-neon-cyan' : 'bg-cyber-surface text-text border-cyber-border hover:border-neon-cyan/50'
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
            <div key={c.id} className="bg-cyber-surface rounded-2xl border border-cyber-border overflow-hidden">
              <button
                onClick={() => setExpandedId(isExpanded ? null : c.id)}
                className="w-full text-left p-5 cursor-pointer hover:bg-cyber-bg/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-muted bg-cyber-border px-2 py-0.5 rounded font-terminal">{c.category}</span>
                    <span className="text-xs text-neon-cyan bg-neon-cyan-dim px-2 py-0.5 rounded font-terminal">{c.examFocus}</span>
                  </div>
                  <MasteryBadge level={getLevel(c.id)} />
                </div>
                <h3 className="text-lg font-semibold text-text">{c.title}</h3>
                <p className="text-sm text-text-muted mt-1">{c.definition}</p>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 space-y-4 border-t border-cyber-border pt-4">
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
                          <span className="text-neon-cyan shrink-0">•</span> {p}
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
                    <button onClick={() => setLevel(c.id, 'mastered')} className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-colors font-terminal ${getLevel(c.id) === 'mastered' ? 'bg-neon-green text-black border-neon-green' : 'bg-transparent text-neon-green border-neon-green/30 hover:bg-neon-green-dim/50'}`}>已掌握</button>
                    <button onClick={() => setLevel(c.id, 'fuzzy')} className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-colors font-terminal ${getLevel(c.id) === 'fuzzy' ? 'bg-neon-yellow text-black border-neon-yellow' : 'bg-transparent text-neon-yellow border-neon-yellow/30 hover:bg-neon-yellow-dim/50'}`}>有点模糊</button>
                    <button onClick={() => setLevel(c.id, 'must-review')} className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-colors font-terminal ${getLevel(c.id) === 'must-review' ? 'bg-neon-red text-white border-neon-red' : 'bg-transparent text-neon-red border-neon-red/30 hover:bg-neon-red-dim/50'}`}>必须复习</button>
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
