import { useState } from 'react';
import type { WrongBookItem as WBItem } from '../types';

interface Props {
  item: WBItem;
  onRemove: (id: string) => void;
  redoMode?: boolean;
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

const typeLinks: Record<string, string> = {
  concept: '/concepts',
  code: '/code-training',
  recall: '/recall',
  memory: '/memory',
  drawing: '/drawing',
  design: '/design',
  sorting: '/sorting',
};

export default function WrongBookItemCard({ item, onRemove, redoMode }: Props) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="bg-cyber-surface rounded-2xl border border-cyber-border p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <span className="text-xs text-text-muted bg-cyber-border px-2 py-0.5 rounded font-terminal">
            {typeLabels[item.type] ?? item.type}
          </span>
          <h4 className="text-base font-medium text-text mt-1">{item.title}</h4>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="text-sm text-text-muted hover:text-neon-red cursor-pointer transition-colors font-terminal"
        >
          移除
        </button>
      </div>

      {redoMode ? (
        <div className="space-y-2">
          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="text-sm text-neon-cyan hover:text-neon-magenta cursor-pointer transition-colors font-terminal border border-dashed border-neon-cyan/40 rounded-lg px-3 py-2 w-full text-left"
            >
              点击显示答案
            </button>
          ) : (
            <>
              <div className="p-3 bg-neon-green-dim border border-neon-green/30 rounded-lg">
                <p className="text-sm text-neon-green">{item.correctAnswer}</p>
              </div>
              {item.explanation && (
                <p className="text-sm text-text-muted">{item.explanation}</p>
              )}
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => setShowAnswer(false)}
                  className="text-xs text-neon-yellow hover:text-neon-yellow/80 cursor-pointer transition-colors font-terminal"
                >
                  再做一次
                </button>
                <span className="text-text-muted">·</span>
                <a
                  href={typeLinks[item.type] ?? '/learn'}
                  className="text-xs text-neon-cyan hover:text-neon-magenta no-underline transition-colors font-terminal"
                >
                  去练习 →
                </a>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          {item.userAnswer && (
            <p className="text-sm text-neon-red mb-1">
              你的答案：{item.userAnswer}
            </p>
          )}
          <p className="text-sm text-neon-green mb-1">
            正确答案：{item.correctAnswer}
          </p>
          {item.explanation && (
            <p className="text-sm text-text-muted">{item.explanation}</p>
          )}
        </>
      )}
    </div>
  );
}
