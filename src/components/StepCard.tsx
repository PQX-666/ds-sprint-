interface Props {
  step: number;
  title: string;
  description: string;
  completed?: boolean;
}

export default function StepCard({ step, title, description, completed }: Props) {
  return (
    <div className={`flex gap-3 p-4 rounded-lg border ${completed ? 'bg-success/5 border-success/30' : 'bg-surface border-border'}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
          completed ? 'bg-success text-white' : 'bg-border text-text-muted'
        }`}
      >
        {completed ? '✓' : step}
      </div>
      <div>
        <p className="font-medium text-text">{title}</p>
        <p className="text-sm text-text-muted">{description}</p>
      </div>
    </div>
  );
}
