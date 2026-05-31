interface StatCardProps {
  variant: 'progress' | 'number' | 'streak' | 'compact';
  title: string;
  value: number;
  total?: number;
  color?: string;
}

export default function StatCard({ variant, title, value, total = 100, color = 'cyan' }: StatCardProps) {
  const pct = variant === 'progress' && total > 0 ? Math.round((value / total) * 100) : 0;

  const colorMap: Record<string, string> = {
    cyan: 'text-neon-cyan',
    green: 'text-neon-green',
    yellow: 'text-neon-yellow',
    red: 'text-neon-red',
    brand: 'text-neon-cyan',
    success: 'text-neon-green',
    warning: 'text-neon-yellow',
    danger: 'text-neon-red',
  };

  const accentMap: Record<string, string> = {
    cyan: 'bg-neon-cyan shadow-[0_0_8px_rgba(0,229,255,0.4)]',
    green: 'bg-neon-green shadow-[0_0_8px_rgba(0,230,118,0.4)]',
    yellow: 'bg-neon-yellow shadow-[0_0_8px_rgba(255,234,0,0.4)]',
    red: 'bg-neon-red shadow-[0_0_8px_rgba(255,23,68,0.4)]',
    brand: 'bg-neon-cyan shadow-[0_0_8px_rgba(0,229,255,0.4)]',
    success: 'bg-neon-green shadow-[0_0_8px_rgba(0,230,118,0.4)]',
    warning: 'bg-neon-yellow shadow-[0_0_8px_rgba(255,234,0,0.4)]',
    danger: 'bg-neon-red shadow-[0_0_8px_rgba(255,23,68,0.4)]',
  };

  const textColor = colorMap[color] ?? 'text-neon-cyan';
  const accentColor = accentMap[color] ?? 'bg-neon-cyan shadow-[0_0_8px_rgba(0,229,255,0.4)]';

  return (
    <div className="bg-cyber-surface rounded-2xl border border-cyber-border shadow-card p-4 relative overflow-hidden">
      <div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full ${accentColor}`} />
      <p className="text-xs uppercase tracking-wider text-text-muted mb-2 font-terminal">{title}</p>
      {variant === 'number' && (
        <p className={`text-2xl font-extrabold font-terminal ${textColor}`}>{value}</p>
      )}
      {variant === 'compact' && (
        <p className={`text-2xl font-extrabold font-terminal ${textColor}`}>{value}</p>
      )}
      {variant === 'streak' && (
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-extrabold font-terminal text-neon-yellow">{value}</span>
          <span className="text-sm text-text-muted">天</span>
        </div>
      )}
      {variant === 'progress' && (
        <>
          <p className="text-2xl font-extrabold text-text font-terminal">{pct}%</p>
          <div className="mt-2 h-2 bg-cyber-border rounded-full overflow-hidden">
            <div
              className="h-full gradient-cyber rounded-full transition-all duration-700 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-text-muted mt-1">{value} / {total}</p>
        </>
      )}
    </div>
  );
}
