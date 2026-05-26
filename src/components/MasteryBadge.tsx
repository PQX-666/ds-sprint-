import type { MasteryLevel } from '../types';

const config: Record<MasteryLevel, { label: string; icon: string; tip: string; className: string }> = {
  mastered: { label: '已掌握', icon: '✓', tip: '你已经完全掌握了这个知识点', className: 'bg-success/10 text-success border-success/30' },
  fuzzy: { label: '模糊', icon: '~', tip: '还有些模糊，建议再复习一遍', className: 'bg-accent/10 text-accent border-accent/30' },
  wrong: { label: '做错', icon: '!', tip: '做错过，已加入错题本', className: 'bg-danger/10 text-danger border-danger/30' },
  unlearned: { label: '未学', icon: '○', tip: '还没有开始学习', className: 'bg-border text-text-muted border-border' },
  'must-review': { label: '必复习', icon: '!!', tip: '考前必须再过一遍的重点', className: 'bg-danger/20 text-danger border-danger/50' },
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
