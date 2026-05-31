import type { MasteryLevel } from '../types';

const config: Record<MasteryLevel, { label: string; icon: string; tip: string; className: string }> = {
  mastered: { label: '已掌握', icon: '✓', tip: '你已经完全掌握了这个知识点', className: 'bg-neon-cyan-dim text-neon-cyan border-neon-cyan/25' },
  fuzzy: { label: '模糊', icon: '~', tip: '还有些模糊，建议再复习一遍', className: 'bg-neon-yellow-dim text-neon-yellow border-neon-yellow/25' },
  wrong: { label: '做错', icon: '!', tip: '做错过，已加入错题本', className: 'bg-cyber-elevated text-text-secondary border-cyber-border-light' },
  unlearned: { label: '未学', icon: '○', tip: '还没有开始学习', className: 'bg-cyber-border text-text-muted border-cyber-border' },
  'must-review': { label: '必复习', icon: '!!', tip: '考前必须再过一遍的重点', className: 'bg-neon-red-dim text-neon-red border-neon-red/25' },
};

export default function MasteryBadge({ level }: { level: MasteryLevel }) {
  const c = config[level];
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${c.className}`}
      title={c.tip}
    >
      <span className="font-bold">{c.icon}</span>
      {c.label}
    </span>
  );
}
