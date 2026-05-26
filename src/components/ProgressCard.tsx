interface Props {
  title: string;
  current: number;
  total: number;
}

export default function ProgressCard({ title, current, total }: Props) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="bg-surface rounded-xl border border-border p-4">
      <p className="text-sm text-text-muted mb-1">{title}</p>
      <p className="text-2xl font-bold text-text">{pct}%</p>
      <div className="mt-2 h-2 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-text-muted mt-1">
        {current} / {total}
      </p>
    </div>
  );
}
