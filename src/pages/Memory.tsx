import { useState, useMemo } from 'react';
import { memoryLists } from '../data/memoryList';
import { useMastery } from '../hooks/useMastery';
import MasteryBadge from '../components/MasteryBadge';

const categories = [...new Set(memoryLists.map((m) => m.category))];

export default function Memory() {
  const { getLevel, markMastered, markFuzzy } = useMastery();
  const [filter, setFilter] = useState('全部');
  const [search, setSearch] = useState('');
  const [showTips, setShowTips] = useState(true);

  const filtered = useMemo(() => {
    return memoryLists.filter((m) => {
      const catMatch = filter === '全部' || m.category === filter;
      const searchMatch = !search || m.term.includes(search) || m.definition.includes(search);
      return catMatch && searchMatch;
    });
  }, [filter, search]);

  return (
    <div className="space-y-6">
      <h1 className="heading-xl text-text font-terminal">考前背诵清单</h1>

      <div className="flex gap-3 flex-wrap items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] p-2.5 rounded-lg border border-cyber-border bg-cyber-surface text-text outline-none focus:border-neon-cyan"
          placeholder="搜索术语..."
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2.5 rounded-lg border border-cyber-border bg-cyber-surface text-text cursor-pointer">
          <option value="全部">全部分类</option>
          {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
        </select>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setShowTips(true)} className={`text-xs px-3 py-1 rounded-lg cursor-pointer transition-colors font-terminal ${showTips ? 'bg-neon-cyan text-black' : 'bg-cyber-border text-text-muted'}`}>显示口诀</button>
        <button onClick={() => setShowTips(false)} className={`text-xs px-3 py-1 rounded-lg cursor-pointer transition-colors font-terminal ${!showTips ? 'bg-neon-cyan text-black' : 'bg-cyber-border text-text-muted'}`}>只显示条目</button>
      </div>

      <div className="bg-cyber-surface rounded-2xl border border-cyber-border overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyber-border bg-cyber-bg">
              <th className="text-left p-3 text-sm font-medium text-text-muted w-12">#</th>
              <th className="text-left p-3 text-sm font-medium text-text-muted">术语</th>
              <th className="text-left p-3 text-sm font-medium text-text-muted">公式 / 口诀</th>
              <th className="text-left p-3 text-sm font-medium text-text-muted w-24">分类</th>
              <th className="text-left p-3 text-sm font-medium text-text-muted w-24">状态</th>
              <th className="text-left p-3 text-sm font-medium text-text-muted w-28">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr key={item.id} className="border-b border-cyber-border last:border-b-0 hover:bg-cyber-bg/50">
                <td className="p-3 text-sm text-text-muted font-terminal">{i + 1}</td>
                <td className="p-3 text-sm text-text font-medium">{item.term}</td>
                <td className="p-3 text-sm text-text">
                  {item.definition}
                  {showTips && item.memoryTip && (
                    <span className="block text-xs text-neon-green mt-0.5">💡 {item.memoryTip}</span>
                  )}
                </td>
                <td className="p-3 text-xs text-text-muted">{item.category}</td>
                <td className="p-3"><MasteryBadge level={getLevel(item.id)} /></td>
                <td className="p-3">
                  <div className="flex gap-1">
                    <button onClick={() => markMastered(item.id)} className="text-xs px-2 py-1 rounded bg-neon-green-dim text-neon-green hover:bg-neon-green-dim/70 cursor-pointer transition-colors font-terminal">记住</button>
                    <button onClick={() => markFuzzy(item.id)} className="text-xs px-2 py-1 rounded bg-neon-yellow-dim text-neon-yellow hover:bg-neon-yellow-dim/70 cursor-pointer transition-colors font-terminal">模糊</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-text-muted">共 {memoryLists.length} 条</p>
    </div>
  );
}
