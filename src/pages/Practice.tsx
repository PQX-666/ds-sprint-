import { useState, useMemo } from 'react';
import { practiceQuestions } from '../data/practiceQuestions';
import { useMastery } from '../hooks/useMastery';
import { useWrongBook } from '../hooks/useWrongBook';
import MasteryBadge from '../components/MasteryBadge';
import CodeBlock from '../components/CodeBlock';
import Card from '../components/Card';
import type { PracticeCategory } from '../types';

const categories: PracticeCategory[] = ['时间复杂度', '线性表', '栈和队列', '树与二叉树', '哈夫曼编码', '查找'];
const typeLabels: Record<string, string> = { choice: '选择题', truefalse: '判断题', short: '简答题' };

export default function Practice() {
  const { getLevel, markMastered, markFuzzy, markWrong } = useMastery();
  const { addItem } = useWrongBook();
  const [filter, setFilter] = useState<PracticeCategory | '全部'>('全部');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(
    () => (filter === '全部' ? practiceQuestions : practiceQuestions.filter((q) => q.category === filter)),
    [filter],
  );

  const mastered = practiceQuestions.filter((q) => getLevel(q.id) === 'mastered').length;
  const pct = Math.round((mastered / practiceQuestions.length) * 100);

  const handleReveal = (id: string) => {
    setRevealedIds((prev) => new Set(prev).add(id));
  };

  const handleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="heading-xl text-text font-terminal">学习通刷题</h1>
          <p className="text-text-muted mt-1">共 {practiceQuestions.length} 题 · 已掌握 {mastered} 题</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 bg-cyber-border rounded-full overflow-hidden">
            <div className="h-full gradient-cyber rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-sm font-medium text-text font-terminal">{pct}%</span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => { setFilter('全部'); setExpandedId(null); }}
          className={`text-sm px-3 py-1.5 rounded-lg border cursor-pointer transition-colors font-terminal ${
            filter === '全部' ? 'bg-neon-cyan text-black border-neon-cyan' : 'bg-cyber-surface text-text border-cyber-border hover:border-neon-cyan/50'
          }`}
        >
          全部 ({practiceQuestions.length})
        </button>
        {categories.map((cat) => {
          const count = practiceQuestions.filter((q) => q.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setExpandedId(null); }}
              className={`text-sm px-3 py-1.5 rounded-lg border cursor-pointer transition-colors font-terminal ${
                filter === cat ? 'bg-neon-cyan text-black border-neon-cyan' : 'bg-cyber-surface text-text border-cyber-border hover:border-neon-cyan/50'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {filtered.map((q) => {
          const isExpanded = expandedId === q.id;
          const inputVal = inputs[q.id] ?? '';
          const isRevealed = revealedIds.has(q.id);

          return (
            <Card key={q.id} variant={isExpanded ? 'highlight' : 'default'}>
              {/* 题目头部 */}
              <button
                onClick={() => handleExpand(q.id)}
                className="w-full text-left cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-text-muted bg-cyber-border px-2 py-0.5 rounded font-terminal">{q.category}</span>
                      <span className="text-xs text-neon-cyan bg-neon-cyan-dim px-2 py-0.5 rounded font-terminal">{typeLabels[q.type]}</span>
                    </div>
                    <p className="text-sm font-medium text-text line-clamp-2">{q.question}</p>
                  </div>
                  <MasteryBadge level={getLevel(q.id)} />
                </div>
              </button>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-cyber-border space-y-4 animate-scale-in">
                  {q.code && <CodeBlock code={q.code} />}

                  {q.type === 'choice' && q.options && (
                    <div className="space-y-1.5">
                      <p className="text-xs font-medium text-text-muted mb-1">选择你的答案：</p>
                      {q.options.map((opt) => (
                        <label key={opt} className="flex items-center gap-2 text-sm text-text cursor-pointer">
                          <input
                            type="radio"
                            name={`pq-${q.id}`}
                            value={opt.slice(0, 1)}
                            checked={inputVal === opt.slice(0, 1)}
                            onChange={(e) => setInputs((prev) => ({ ...prev, [q.id]: e.target.value }))}
                            className="accent-neon-cyan"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  )}

                  {q.type === 'truefalse' && (
                    <div className="flex gap-4">
                      <p className="text-xs font-medium text-text-muted self-center">你的判断：</p>
                      {['对', '错'].map((v) => (
                        <label key={v} className="flex items-center gap-2 text-sm text-text cursor-pointer">
                          <input
                            type="radio"
                            name={`pq-${q.id}`}
                            value={v}
                            checked={inputVal === v}
                            onChange={(e) => setInputs((prev) => ({ ...prev, [q.id]: e.target.value }))}
                            className="accent-neon-cyan"
                          />
                          {v}
                        </label>
                      ))}
                    </div>
                  )}

                  {q.type === 'short' && (
                    <textarea
                      value={inputVal}
                      onChange={(e) => setInputs((prev) => ({ ...prev, [q.id]: e.target.value }))}
                      className="w-full p-3 rounded-lg border border-cyber-border bg-cyber-bg text-text outline-none focus:border-neon-cyan resize-y text-sm min-h-[80px]"
                      placeholder="输入你的答案..."
                      spellCheck={false}
                    />
                  )}

                  {!isRevealed ? (
                    <button
                      onClick={() => handleReveal(q.id)}
                      className="w-full py-2.5 rounded-xl border-2 border-dashed border-neon-cyan/40 text-neon-cyan text-sm font-medium cursor-pointer hover:bg-neon-cyan-dim/50 transition-colors font-terminal"
                    >
                      显示答案与解析
                    </button>
                  ) : (
                    <>
                      <div className="p-4 bg-callout-success-bg border border-callout-success-border rounded-xl">
                        <p className="text-xs font-medium text-callout-success-label mb-1">正确答案</p>
                        <p className="text-sm text-callout-success-text whitespace-pre-wrap">{q.answer}</p>
                      </div>

                      <div className="p-4 bg-callout-info-bg border border-callout-info-border rounded-xl">
                        <p className="text-xs font-medium text-callout-info-label mb-1">深度解析</p>
                        <p className="text-sm text-callout-info-text whitespace-pre-wrap leading-relaxed">{q.explanation}</p>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => markMastered(q.id)}
                          className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-colors font-terminal ${
                            getLevel(q.id) === 'mastered'
                              ? 'bg-neon-green text-black border-neon-green'
                              : 'bg-transparent text-neon-green border-neon-green/30 hover:bg-neon-green-dim/50'
                          }`}
                        >
                          已掌握
                        </button>
                        <button
                          onClick={() => markFuzzy(q.id)}
                          className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-colors font-terminal ${
                            getLevel(q.id) === 'fuzzy'
                              ? 'bg-neon-yellow text-black border-neon-yellow'
                              : 'bg-transparent text-neon-yellow border-neon-yellow/30 hover:bg-neon-yellow-dim/50'
                          }`}
                        >
                          有点模糊
                        </button>
                        <button
                          onClick={() => {
                            markWrong(q.id);
                            addItem({ questionId: q.id, type: 'concept', title: q.question.slice(0, 40), correctAnswer: q.answer, explanation: q.explanation });
                          }}
                          className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-colors font-terminal ${
                            getLevel(q.id) === 'wrong'
                              ? 'bg-neon-red text-white border-neon-red'
                              : 'bg-transparent text-neon-red border-neon-red/30 hover:bg-neon-red-dim/50'
                          }`}
                        >
                          做错了
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
