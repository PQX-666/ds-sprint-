import type { WrongBookItem as WBItem } from '../types';

interface Props {
  item: WBItem;
  onRemove: (id: string) => void;
}

const typeLabels: Record<string, string> = {
  concept: '概念',
  code: '代码',
  drawing: '画图',
  design: '设计',
  sorting: '排序',
  recall: '速记',
  memory: '记背',
};

export default function WrongBookItemCard({ item, onRemove }: Props) {
  return (
    <div className="bg-surface rounded-xl border border-border p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <span className="text-xs text-text-muted bg-border px-2 py-0.5 rounded">
            {typeLabels[item.type] ?? item.type}
          </span>
          <h4 className="text-base font-medium text-text mt-1">{item.title}</h4>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="text-sm text-text-muted hover:text-danger cursor-pointer transition-colors"
        >
          移除
        </button>
      </div>
      {item.userAnswer && (
        <p className="text-sm text-danger mb-1">
          你的答案：{item.userAnswer}
        </p>
      )}
      <p className="text-sm text-success mb-1">
        正确答案：{item.correctAnswer}
      </p>
      <p className="text-sm text-text-muted">{item.explanation}</p>
    </div>
  );
}
