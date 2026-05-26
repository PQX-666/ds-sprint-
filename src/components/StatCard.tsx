interface StatCardProps {
  variant: 'progress' | 'number' | 'streak';
  title: string;
  value: number;
  total?: number;
  color?: string;
}

export default function StatCard({ variant, title, value, total = 100, color = 'primary' }: StatCardProps) {
  const pct = variant === 'progress' && total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div className="bg-surface rounded-xl border border-border shadow-card p-4">
      <p className="text-sm text-text-muted mb-1">{title}</p>
      {variant === 'number' && (
        <p className={`text-2xl font-bold text-${color}`}>{value}</p>
      )}
      {variant === 'streak' && (
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-accent">{value}</span>
          <span className="text-sm text-text-muted">天</span>
        </div>
      )}
      {variant === 'progress' && (
        <>
          <p className="text-2xl font-bold text-text">{pct}%</p>
          <div className="mt-2 h-2 bg-border rounded-full overflow-hidden shadow-[inset_0_1px_2px_rgb(0_0_0_/_0.06)]">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-text-muted mt-1">{value} / {total}</p>
        </>
      )}
    </div>
  );
}
