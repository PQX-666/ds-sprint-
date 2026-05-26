import { useState } from 'react';

interface Props {
  answer: string;
  explanation?: string;
}

export default function AnswerToggle({ answer, explanation }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-3">
      <button
        onClick={() => setShow(!show)}
        className="text-sm font-medium text-primary hover:text-primary-dark transition-colors cursor-pointer"
      >
        {show ? '隐藏答案 ▲' : '查看答案 ▼'}
      </button>
      {show && (
        <div className="mt-2 p-4 bg-callout-success-bg border border-callout-success-border rounded-lg animate-fade-slide-in">
          <p className="text-sm font-medium text-callout-success-text">{answer}</p>
          {explanation && (
            <p className="text-sm text-callout-success-text/70 mt-1">{explanation}</p>
          )}
        </div>
      )}
    </div>
  );
}
