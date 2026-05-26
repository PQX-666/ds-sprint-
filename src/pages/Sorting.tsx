import { useState } from 'react';
import { sortingAlgorithms, sortingScenarios, answerTemplate, stabilityRhyme, timeRhyme, spaceRhyme, sceneRhyme, sortingOrderItems } from '../data/sorting';
import { useMastery } from '../hooks/useMastery';
import MasteryBadge from '../components/MasteryBadge';

export default function Sorting() {
  const { getLevel } = useMastery();
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [showScenarioAnswer, setShowScenarioAnswer] = useState(false);

  const scenario = sortingScenarios[scenarioIdx];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text">排序分析</h1>

      {/* 口诀卡片 */}
      <div className="grid md:grid-cols-2 gap-3">
        <div className="bg-callout-success-bg border border-callout-success-border rounded-lg p-3">
          <p className="text-xs font-medium text-callout-success-label mb-1">稳定性口诀</p>
          <p className="text-sm text-callout-success-text font-medium">{stabilityRhyme}</p>
        </div>
        <div className="bg-callout-info-bg border border-callout-info-border rounded-lg p-3">
          <p className="text-xs font-medium text-callout-info-label mb-1">时间复杂度口诀</p>
          <p className="text-sm text-callout-info-text font-medium">{timeRhyme}</p>
        </div>
        <div className="bg-callout-accent-bg border border-callout-accent-border rounded-lg p-3">
          <p className="text-xs font-medium text-callout-accent-label mb-1">空间复杂度口诀</p>
          <p className="text-sm text-callout-accent-text font-medium">{spaceRhyme}</p>
        </div>
        <div className="bg-callout-warning-bg border border-callout-warning-border rounded-lg p-3">
          <p className="text-xs font-medium text-callout-warning-label mb-1">场景选择口诀</p>
          <p className="text-sm text-callout-warning-text font-medium">{sceneRhyme}</p>
        </div>
      </div>

      {/* 性能表 */}
      <div className="bg-surface rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-bg">
              <th className="text-left p-3 font-medium text-text-muted">排序算法</th>
              <th className="text-left p-3 font-medium text-text-muted">平均</th>
              <th className="text-left p-3 font-medium text-text-muted">最坏</th>
              <th className="text-left p-3 font-medium text-text-muted">空间</th>
              <th className="text-left p-3 font-medium text-text-muted">稳定</th>
              <th className="text-left p-3 font-medium text-text-muted">适用场景</th>
              <th className="text-left p-3 font-medium text-text-muted">状态</th>
            </tr>
          </thead>
          <tbody>
            {sortingAlgorithms.map((alg) => (
              <tr key={alg.id} className="border-b border-border last:border-b-0 hover:bg-bg/50">
                <td className="p-3 font-medium text-text">{alg.name}</td>
                <td className="p-3 text-text-muted">{alg.timeAverage}</td>
                <td className="p-3 text-text-muted">{alg.timeWorst}</td>
                <td className="p-3 text-text-muted">{alg.space}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${alg.stable ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                    {alg.stable ? '稳定' : '不稳定'}
                  </span>
                </td>
                <td className="p-3 text-text-muted text-xs">{alg.bestUseCase}</td>
                <td className="p-3"><MasteryBadge level={getLevel(alg.id)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 场景选择题 */}
      <div className="bg-surface rounded-xl border border-border p-5 space-y-4">
        <h2 className="text-lg font-semibold text-text">场景选择题</h2>
        <div className="flex justify-between items-center">
          <p className="text-sm text-text-muted">第 {scenarioIdx + 1} / {sortingScenarios.length} 题</p>
          <div className="flex gap-2">
            <button onClick={() => { setScenarioIdx(Math.max(0, scenarioIdx - 1)); setShowScenarioAnswer(false); }} disabled={scenarioIdx === 0} className="text-xs text-text-muted hover:text-text disabled:opacity-30 cursor-pointer">上一题</button>
            <button onClick={() => { setScenarioIdx(Math.min(sortingScenarios.length - 1, scenarioIdx + 1)); setShowScenarioAnswer(false); }} disabled={scenarioIdx === sortingScenarios.length - 1} className="text-xs text-text-muted hover:text-text disabled:opacity-30 cursor-pointer">下一题</button>
          </div>
        </div>

        <div className="p-4 bg-callout-neutral-bg border border-callout-neutral-border rounded-lg">
          <p className="text-sm font-medium text-callout-neutral-text">{scenario?.question}</p>
        </div>

        {!showScenarioAnswer ? (
          <button onClick={() => setShowScenarioAnswer(true)} className="text-sm text-primary hover:text-primary-dark cursor-pointer">
            查看答案 ▼
          </button>
        ) : (
          <div className="p-4 bg-callout-success-bg border border-callout-success-border rounded-lg space-y-2">
            <p className="text-sm font-medium text-callout-success-text">答案：{scenario?.answer}</p>
            <p className="text-sm text-callout-success-text">{scenario?.analysis}</p>
          </div>
        )}
      </div>

      {/* 答题模板 */}
      <div className="bg-surface rounded-xl border border-border p-5">
        <h2 className="text-lg font-semibold text-text mb-2">排序分析作答模板</h2>
        <pre className="text-sm text-text-muted whitespace-pre-wrap bg-callout-neutral-bg p-4 rounded-lg">{answerTemplate}</pre>
      </div>

      {/* 排序练习 */}
      {sortingOrderItems.map((item) => (
        <div key={item.id} className="bg-surface rounded-xl border border-border p-5">
          <h3 className="text-sm font-medium text-text mb-2">{item.title}</h3>
          <ol className="space-y-1">
            {item.correctOrder.map((id, i) => {
              const entry = item.items.find((it) => it.id === id);
              return <li key={id} className="text-sm text-text-muted">{i + 1}. {entry?.label}</li>;
            })}
          </ol>
        </div>
      ))}
    </div>
  );
}
