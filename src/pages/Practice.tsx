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

  const filtered = useMemo(
    () => (filter === '全部' ? practiceQuestions : practiceQuestions.filter((q) => q.category === filter)),
    [filter],
  );

  const mastered = practiceQuestions.filter((q) => getLevel(q.id) === 'mastered').length;
  const pct = Math.round((mastered / practiceQuestions.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-3xl font-bold text-text">学习通刷题</h1>
          <p className="text-text-muted mt-1">共 {practiceQuestions.length} 题 · 已掌握 {mastered} 题</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-sm font-medium text-text">{pct}%</span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('全部')}
          className={`text-sm px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
            filter === '全部' ? 'bg-primary text-white border-primary' : 'bg-surface text-text border-border hover:border-primary/50'
          }`}
        >
          全部 ({practiceQuestions.length})
        </button>
        {categories.map((cat) => {
          const count = practiceQuestions.filter((q) => q.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-sm px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                filter === cat ? 'bg-primary text-white border-primary' : 'bg-surface text-text border-border hover:border-primary/50'
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

          return (
            <Card key={q.id} variant={isExpanded ? 'highlight' : 'default'}>
              <button
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="w-full text-left cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-text-muted bg-border px-2 py-0.5 rounded">{q.category}</span>
                      <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">{typeLabels[q.type]}</span>
                    </div>
                    <p className="text-sm font-medium text-text line-clamp-2">{q.question}</p>
                  </div>
                  <MasteryBadge level={getLevel(q.id)} />
                </div>
              </button>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-border space-y-4">
                  {q.code && <CodeBlock code={q.code} />}

                  {q.type === 'choice' && q.options && (
                    <div className="space-y-1.5">
                      <p className="text-xs font-medium text-text-muted mb-1">选项：</p>
                      {q.options.map((opt) => (
                        <label key={opt} className="flex items-center gap-2 text-sm text-text cursor-pointer">
                          <input
                            type="radio"
                            name={`pq-${q.id}`}
                            value={opt.slice(0, 1)}
                            checked={inputVal === opt.slice(0, 1)}
                            onChange={(e) => setInputs((prev) => ({ ...prev, [q.id]: e.target.value }))}
                            className="accent-primary"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  )}

                  {q.type === 'truefalse' && (
                    <div className="flex gap-4">
                      {['对', '错'].map((v) => (
                        <label key={v} className="flex items-center gap-2 text-sm text-text cursor-pointer">
                          <input
                            type="radio"
                            name={`pq-${q.id}`}
                            value={v}
                            checked={inputVal === v}
                            onChange={(e) => setInputs((prev) => ({ ...prev, [q.id]: e.target.value }))}
                            className="accent-primary"
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
                      className="w-full p-3 rounded-lg border border-border bg-bg text-text outline-none focus:border-primary resize-y text-sm min-h-[80px]"
                      placeholder="输入你的答案..."
                      spellCheck={false}
                    />
                  )}

                  <div className="p-4 bg-callout-success-bg border border-callout-success-border rounded-lg space-y-2">
                    <p className="text-xs font-medium text-callout-success-label">正确答案：</p>
                    <p className="text-sm text-callout-success-text whitespace-pre-wrap">{q.answer}</p>
                  </div>

                  <div className="p-4 bg-callout-info-bg border border-callout-info-border rounded-lg space-y-1">
                    <p className="text-xs font-medium text-callout-info-label">深度解析：</p>
                    <p className="text-sm text-callout-info-text whitespace-pre-wrap leading-relaxed">{q.explanation}</p>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => markMastered(q.id)}
                      className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                        getLevel(q.id) === 'mastered' ? 'bg-success text-white border-success' : 'bg-transparent text-success border-success/30 hover:bg-success/10'
                      }`}
                    >
                      已掌握
                    </button>
                    <button
                      onClick={() => markFuzzy(q.id)}
                      className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                        getLevel(q.id) === 'fuzzy' ? 'bg-accent text-white border-accent' : 'bg-transparent text-accent border-accent/30 hover:bg-accent/10'
                      }`}
                    >
                      有点模糊
                    </button>
                    <button
                      onClick={() => {
                        markWrong(q.id);
                        addItem({ questionId: q.id, type: 'concept', title: q.question.slice(0, 40), correctAnswer: q.answer, explanation: q.explanation });
                      }}
                      className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                        getLevel(q.id) === 'wrong' ? 'bg-danger text-white border-danger' : 'bg-transparent text-danger border-danger/30 hover:bg-danger/10'
                      }`}
                    >
                      做错了
                    </button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
