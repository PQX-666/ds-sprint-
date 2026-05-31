interface Props {
  step: number;
  title: string;
  description: string;
  completed?: boolean;
}

export default function StepCard({ step, title, description, completed }: Props) {
  return (
    <div
      className={`flex gap-3 p-4 rounded-xl border transition-all duration-300 hover:scale-[1.01] ${
        completed
          ? 'bg-neon-cyan-dim/50 border-neon-cyan/30'
          : 'bg-cyber-surface border-cyber-border hover:border-neon-cyan/30 hover:shadow-card-hover'
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors font-terminal ${
          completed
            ? 'gradient-cyber text-white'
            : 'bg-cyber-border text-text-muted'
        }`}
      >
        {completed ? '✓' : step}
      </div>
      <div>
        <p className={`font-medium ${completed ? 'text-neon-cyan' : 'text-text'}`}>
          {title}
        </p>
        <p className="text-sm text-text-muted">{description}</p>
      </div>
    </div>
  );
}
