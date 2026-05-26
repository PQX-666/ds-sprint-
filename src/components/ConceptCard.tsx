import type { MasteryLevel } from '../types';
import MasteryBadge from './MasteryBadge';

interface Props {
  title: string;
  description: string;
  keyPoints: string[];
  mastery: MasteryLevel;
  onMasteryChange: (level: MasteryLevel) => void;
}

const levels: { value: MasteryLevel; label: string }[] = [
  { value: 'mastered', label: '已掌握' },
  { value: 'fuzzy', label: '有点模糊' },
  { value: 'must-review', label: '必须复习' },
];

export default function ConceptCard({ title, description, keyPoints, mastery, onMasteryChange }: Props) {
  return (
    <div className="bg-surface rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-text">{title}</h3>
        <MasteryBadge level={mastery} />
      </div>
      <p className="text-sm text-text-muted mb-3">{description}</p>
      <ul className="space-y-1 mb-4">
        {keyPoints.map((p, i) => (
          <li key={i} className="text-sm text-text flex gap-2">
            <span className="text-primary">•</span> {p}
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        {levels.map((l) => (
          <button
            key={l.value}
            onClick={() => onMasteryChange(l.value)}
            className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
              mastery === l.value
                ? 'bg-primary text-white border-primary'
                : 'bg-transparent text-text-muted border-border hover:border-primary/50'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
