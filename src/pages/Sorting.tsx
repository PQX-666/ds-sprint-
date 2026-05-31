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
      <h1 className="heading-xl text-text font-terminal">排序分析</h1>

      {/* 口诀卡片 */}
      <div className="grid md:grid-cols-2 gap-3">
        {[
          { label: '稳定性口诀', text: stabilityRhyme },
          { label: '时间复杂度口诀', text: timeRhyme },
          { label: '空间复杂度口诀', text: spaceRhyme },
          { label: '场景选择口诀', text: sceneRhyme },
        ].map((item) => (
          <div key={item.label} className="bg-neon-cyan-dim border border-neon-cyan/30 rounded-xl p-3">
            <p className="text-xs font-medium text-neon-cyan mb-1">{item.label}</p>
            <p className="text-sm text-neon-cyan/80 font-medium">{item.text}</p>
          </div>
        ))}
      </div>

      {/* 性能表 */}
      <div className="bg-cyber-surface rounded-2xl border border-cyber-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cyber-border bg-cyber-bg">
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
              <tr key={alg.id} className="border-b border-cyber-border last:border-b-0 hover:bg-cyber-bg/50">
                <td className="p-3 font-medium text-text">{alg.name}</td>
                <td className="p-3 text-text-muted">{alg.timeAverage}</td>
                <td className="p-3 text-text-muted">{alg.timeWorst}</td>
                <td className="p-3 text-text-muted">{alg.space}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${alg.stable ? 'bg-neon-green-dim text-neon-green' : 'bg-neon-red-dim text-neon-red'}`}>
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
      <div className="bg-cyber-surface rounded-2xl border border-cyber-border p-5 space-y-4">
        <h2 className="text-lg font-semibold text-text font-terminal">场景选择题</h2>
        <div className="flex justify-between items-center">
          <p className="text-sm text-text-muted">第 {scenarioIdx + 1} / {sortingScenarios.length} 题</p>
          <div className="flex gap-2">
            <button onClick={() => { setScenarioIdx(Math.max(0, scenarioIdx - 1)); setShowScenarioAnswer(false); }} disabled={scenarioIdx === 0} className="text-xs text-text-muted hover:text-text disabled:opacity-30 cursor-pointer font-terminal">上一题</button>
            <button onClick={() => { setScenarioIdx(Math.min(sortingScenarios.length - 1, scenarioIdx + 1)); setShowScenarioAnswer(false); }} disabled={scenarioIdx === sortingScenarios.length - 1} className="text-xs text-text-muted hover:text-text disabled:opacity-30 cursor-pointer font-terminal">下一题</button>
          </div>
        </div>

        <div className="p-4 bg-callout-neutral-bg border border-callout-neutral-border rounded-lg">
          <p className="text-sm font-medium text-callout-neutral-text">{scenario?.question}</p>
        </div>

        {!showScenarioAnswer ? (
          <button onClick={() => setShowScenarioAnswer(true)} className="text-sm text-neon-cyan hover:text-neon-magenta cursor-pointer transition-colors font-terminal">
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
      <div className="bg-cyber-surface rounded-xl border border-cyber-border p-5">
        <h2 className="text-lg font-semibold text-text mb-2 font-terminal">排序分析作答模板</h2>
        <pre className="text-sm text-text-muted whitespace-pre-wrap bg-callout-neutral-bg p-4 rounded-lg">{answerTemplate}</pre>
      </div>

      {/* 排序练习 */}
      {sortingOrderItems.map((item) => (
        <div key={item.id} className="bg-cyber-surface rounded-xl border border-cyber-border p-5">
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
