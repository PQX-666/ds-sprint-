import { useState, useEffect, useCallback } from 'react';
import { mockExamQuestions } from '../data/mockExam';
import { useMastery } from '../hooks/useMastery';
import { useWrongBook } from '../hooks/useWrongBook';

const typeLabels: Record<string, string> = {
  concept: '概念简答',
  fill: '代码填空',
  drawing: '画图题',
  design: '算法设计',
  sorting: '排序分析',
};

const EXAM_MINUTES = 120;

export default function Mock() {
  const { markMastered, markWrong } = useMastery();
  const { addItem } = useWrongBook();
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXAM_MINUTES * 60);

  const handleSubmit = useCallback(() => {
    let total = 0;
    mockExamQuestions.forEach((q) => {
      const userAns = (answers[q.id] ?? '').trim();
      const correctAns = q.answer.trim();
      if (userAns && (correctAns.includes(userAns) || userAns.includes(correctAns.slice(0, 20)) || userAns === correctAns)) {
        total += q.score;
      }
    });
    setScore(total);

    mockExamQuestions.forEach((q) => {
      const userAns = (answers[q.id] ?? '').trim();
      const correctAns = q.answer.trim();
      if (userAns && (correctAns.includes(userAns) || userAns.length > correctAns.length / 2)) {
        markMastered(q.id);
      } else if (userAns) {
        markWrong(q.id);
        addItem({
          questionId: q.id,
          type: 'concept',
          title: q.question.slice(0, 40),
          userAnswer: userAns,
          correctAnswer: q.answer,
          explanation: q.explanation,
        });
      }
    });
    setSubmitted(true);
  }, [answers, markMastered, markWrong, addItem]);

  useEffect(() => {
    if (!started || submitted) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, submitted, timeLeft, handleSubmit]);

  const handleStart = () => {
    setStarted(true);
    setTimeLeft(EXAM_MINUTES * 60);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  if (!started) {
    const totalScore = mockExamQuestions.reduce((s, q) => s + q.score, 0);
    return (
      <div className="space-y-6">
        <h1 className="heading-xl text-text font-terminal">模拟考试</h1>
        <div className="bg-cyber-surface rounded-2xl border border-cyber-border shadow-card p-8 text-center space-y-4">
          <p className="text-lg text-text">共 {mockExamQuestions.length} 题，满分 {totalScore} 分</p>
          <p className="text-text-muted">考试时间 {EXAM_MINUTES} 分钟，包含概念简答、代码填空、画图题、算法设计题和排序分析题。</p>
          <button onClick={handleStart} className="gradient-cyber text-white px-8 py-3 rounded-xl text-lg font-medium cursor-pointer hover:brightness-110 transition-all font-terminal animate-neon-pulse">
            开始考试
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    const totalScore = mockExamQuestions.reduce((s, q) => s + q.score, 0);
    return (
      <div className="space-y-6">
        <h1 className="heading-xl text-text font-terminal">考试结果</h1>
        <div className="bg-cyber-surface rounded-2xl border border-cyber-border shadow-card p-8 text-center space-y-4">
          <p className="text-4xl font-bold gradient-cyber-text font-terminal">{score} / {totalScore}</p>
          <p className="text-text-muted">
            {score / totalScore >= 0.8 ? '很棒！' : score / totalScore >= 0.6 ? '还不错，看看薄弱环节。' : '多花时间复习基础。'}
          </p>
        </div>
        <div className="space-y-4">
          {mockExamQuestions.map((q, i) => {
            const userAns = answers[q.id] ?? '';
            return (
              <div key={q.id} className="bg-cyber-surface rounded-2xl border border-cyber-border p-4">
                <p className="text-sm font-medium text-text">
                  {i + 1}. [{typeLabels[q.type] ?? q.type}] ({q.score}分) {q.question.slice(0, 100)}{q.question.length > 100 ? '...' : ''}
                </p>
                <p className="text-sm mt-2">你的答案：<span className="text-text-muted">{userAns || '（未作答）'}</span></p>
                <details className="mt-2">
                  <summary className="text-sm text-neon-cyan cursor-pointer font-terminal">查看参考答案</summary>
                  <p className="text-sm text-neon-green mt-1 whitespace-pre-wrap">{q.answer}</p>
                  <p className="text-sm text-text-muted mt-1">{q.explanation}</p>
                </details>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => { setStarted(false); setSubmitted(false); setAnswers({}); setScore(0); setTimeLeft(EXAM_MINUTES * 60); }}
          className="gradient-cyber text-white px-6 py-2.5 rounded-xl font-medium cursor-pointer hover:brightness-110 transition-all font-terminal"
        >
          重新考试
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="heading-xl text-text font-terminal">模拟考试</h1>
        <p className={`text-2xl font-mono font-bold font-terminal ${timeLeft < 300 ? 'text-neon-red animate-neon-pulse' : 'gradient-cyber-text'}`}>
          {formatTime(timeLeft)}
        </p>
      </div>
      <div className="text-sm text-text-muted font-terminal">共 {mockExamQuestions.length} 题，请在下方作答。</div>

      <div className="space-y-6">
        {mockExamQuestions.map((q, i) => (
          <div key={q.id} className="bg-cyber-surface rounded-xl border border-cyber-border p-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted bg-cyber-border px-2 py-0.5 rounded font-terminal">{typeLabels[q.type]}</span>
              <span className="text-xs text-text-muted">{q.score} 分</span>
            </div>
            <p className="text-base font-medium text-text">
              {i + 1}. {q.question}
            </p>
            {q.options && (
              <div className="space-y-1">
                {q.options.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-text cursor-pointer">
                    <input type="radio" name={`q-${q.id}`} value={opt} checked={(answers[q.id] ?? '') === opt} onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))} className="accent-neon-cyan" />
                    {opt}
                  </label>
                ))}
              </div>
            )}
            {!q.options && (
              <textarea
                value={answers[q.id] ?? ''}
                onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                className="w-full p-3 rounded-lg border border-cyber-border bg-cyber-bg text-text outline-none focus:border-neon-cyan resize-y text-sm"
                rows={q.type === 'design' ? 8 : 4}
                placeholder="输入你的答案..."
                spellCheck={false}
              />
            )}
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} className="gradient-cyber text-white px-8 py-3 rounded-xl text-lg font-medium cursor-pointer hover:brightness-110 transition-all font-terminal">
        提交答卷
      </button>
    </div>
  );
}
