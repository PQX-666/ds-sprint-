import { useState } from 'react';
import { codeTrainingItems } from '../data/codeTraining';
import { useMastery } from '../hooks/useMastery';
import { useWrongBook } from '../hooks/useWrongBook';
import CodeBlock from '../components/CodeBlock';
import MasteryBadge from '../components/MasteryBadge';

export default function CodeTraining() {
  const { getLevel, markMastered, markWrong, markFuzzy } = useMastery();
  const { addItem } = useWrongBook();
  const [activeId, setActiveId] = useState(codeTrainingItems[0]?.id ?? '');
  const [showAnswer, setShowAnswer] = useState(false);
  const [fillInputs, setFillInputs] = useState<Record<string, string>>({});
  const [fillChecked, setFillChecked] = useState(false);
  const [showFullCode, setShowFullCode] = useState(false);

  const active = codeTrainingItems.find((i) => i.id === activeId);

  const handleActivate = (id: string) => {
    setActiveId(id);
    setShowAnswer(false);
    setFillInputs({});
    setFillChecked(false);
    setShowFullCode(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="heading-xl text-text">核心代码训练</h1>
      <p className="text-text-muted">填空训练 + 默写训练，共 {codeTrainingItems.length} 题。</p>

      <div className="flex gap-2 flex-wrap">
        {codeTrainingItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleActivate(item.id)}
            className={`text-sm px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
              activeId === item.id ? 'bg-neon-cyan text-black border-neon-cyan' : 'bg-cyber-surface text-text border-cyber-border hover:border-neon-cyan/50'
            }`}
          >
            {item.title}
            {getLevel(item.id) !== 'unlearned' && <span className="ml-1"><MasteryBadge level={getLevel(item.id)} /></span>}
          </button>
        ))}
      </div>

      {active && (
        <div className="bg-cyber-surface rounded-2xl border border-cyber-border p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text">{active.title}</h2>
              <div className="flex gap-2 mt-1">
                <span className="text-xs text-text-muted bg-cyber-border px-2 py-0.5 rounded">{active.category}</span>
                <span className="text-xs text-neon-cyan bg-neon-cyan-dim px-2 py-0.5 rounded">{active.examFocus}</span>
              </div>
            </div>
            <MasteryBadge level={getLevel(active.id)} />
          </div>

          <div className="p-3 bg-callout-info-bg border border-callout-info-border rounded-lg">
            <p className="text-xs font-medium text-callout-info-label mb-1">核心思想</p>
            <p className="text-sm text-callout-info-text">{active.idea}</p>
          </div>

          <div>
            <button
              onClick={() => setShowFullCode(!showFullCode)}
              className="text-sm font-medium text-neon-cyan hover:text-neon-magenta cursor-pointer transition-colors font-terminal"
            >
              {showFullCode ? '收起完整代码 ▲' : '展开完整代码 ▼'}
            </button>
            {showFullCode && (
              <div className="mt-2">
                <CodeBlock code={active.code} />
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-text mb-2">逐行批注：</p>
            <ol className="space-y-1">
              {active.lineByLineExplanation.map((line, i) => (
                <li key={i} className="text-sm text-text-muted flex gap-2">
                  <span className="text-neon-cyan shrink-0">{i + 1}.</span> {line}
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="text-sm font-medium text-text mb-2">填空训练：</p>
            <pre className="bg-code-bg text-code-text rounded-lg p-4 overflow-x-auto text-sm leading-relaxed font-mono whitespace-pre-wrap">
              {active.fillBlank.template.split('________').map((part, i) => (
                <span key={i}>
                  {part}
                  {i < active.fillBlank.template.split('________').length - 1 && (
                    <input
                      type="text"
                      value={fillInputs[i] ?? ''}
                      onChange={(e) => setFillInputs((prev) => ({ ...prev, [i]: e.target.value }))}
                      className="inline-block bg-cyber-elevated text-neon-yellow border-b border-neon-yellow outline-none px-1 mx-0.5 font-mono text-sm"
                      style={{ width: `${Math.max(60, ((fillInputs[i] ?? '').length || 4) * 10)}px` }}
                      spellCheck={false}
                      disabled={fillChecked}
                    />
                  )}
                </span>
              ))}
            </pre>
            {!fillChecked && (
              <button
                onClick={() => setFillChecked(true)}
                className="mt-2 text-sm text-neon-cyan hover:text-neon-magenta cursor-pointer transition-colors font-terminal"
              >
                核对填空答案
              </button>
            )}
            {fillChecked && (
              <div className="mt-2 p-3 bg-callout-success-bg border border-callout-success-border rounded-lg">
                <p className="text-xs font-medium text-callout-success-label mb-1">正确答案：</p>
                <pre className="text-sm text-callout-success-text font-mono whitespace-pre-wrap">{active.fillBlank.answer}</pre>
                <button onClick={() => { setFillChecked(false); setFillInputs({}); }} className="mt-2 text-xs text-neon-cyan hover:text-neon-magenta cursor-pointer transition-colors font-terminal">重填</button>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="text-sm font-medium text-neon-cyan hover:text-neon-magenta cursor-pointer transition-colors font-terminal"
          >
            {showAnswer ? '隐藏完整答案 ▲' : '查看完整答案 ▼'}
          </button>
          {showAnswer && (
            <div className="p-4 bg-callout-success-bg border border-callout-success-border rounded-lg">
              <p className="text-sm text-callout-success-text font-mono whitespace-pre-wrap">{active.answer}</p>
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

          <div className="p-3 bg-callout-success-bg border border-callout-success-border rounded-lg">
            <p className="text-xs font-medium text-callout-success-label mb-1">记忆口诀</p>
            <p className="text-sm text-callout-success-text font-medium">{active.memoryTip}</p>
          </div>

          <div className="p-3 bg-callout-neutral-bg border border-callout-neutral-border rounded-lg">
            <p className="text-xs font-medium text-callout-neutral-label mb-1">复杂度</p>
            <p className="text-sm text-callout-neutral-text font-mono">{active.complexity}</p>
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={() => { markMastered(active.id); handleActivate(active.id); }} className="bg-neon-green text-black px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-neon-green/80 transition-colors font-terminal">我做对了</button>
            <button onClick={() => markFuzzy(active.id)} className="bg-neon-yellow text-black px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-neon-yellow/80 transition-colors font-terminal">有点模糊</button>
            <button onClick={() => {
              markWrong(active.id);
              addItem({ questionId: active.id, type: 'code', title: active.title, correctAnswer: active.answer, explanation: active.idea });
            }} className="bg-neon-red text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-neon-red/80 transition-colors font-terminal">做错了</button>
          </div>
        </div>
      )}
    </div>
  );
}
