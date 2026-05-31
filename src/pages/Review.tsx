import { useMastery } from '../hooks/useMastery';
import { concepts } from '../data/concepts';
import { codeTrainingItems } from '../data/codeTraining';
import { recallCards } from '../data/recallCards';
import { memoryLists } from '../data/memoryList';
import { Link } from 'react-router-dom';

const typeRoutes: Record<string, string> = {
  concept: '/concepts',
  code: '/code-training',
  recall: '/recall',
  memory: '/memory',
};

export default function Review() {
  const { getLevel } = useMastery();

  const allItems = [
    ...concepts.map((c) => ({ id: c.id, title: c.title, type: 'concept' as const })),
    ...codeTrainingItems.map((c) => ({ id: c.id, title: c.title, type: 'code' as const })),
    ...recallCards.map((c) => ({ id: c.id, title: c.question.slice(0, 30), type: 'recall' as const })),
    ...memoryLists.map((c) => ({ id: c.id, title: c.term, type: 'memory' as const })),
  ];

  const mustReview = allItems.filter(
    (item) => ['fuzzy', 'wrong', 'must-review'].includes(getLevel(item.id))
  );
  const unlearned = allItems.filter((item) => getLevel(item.id) === 'unlearned');

  return (
    <div className="space-y-6">
      <h1 className="heading-xl text-text font-terminal">复习计划</h1>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-cyber-surface rounded-2xl border border-neon-red/30 p-5">
          <h2 className="text-lg font-semibold text-neon-red mb-2 font-terminal">
            需要复习 ({mustReview.length})
          </h2>
          {mustReview.length === 0 ? (
            <p className="text-sm text-text-muted">没有需要复习的内容</p>
          ) : (
            <ul className="space-y-2">
              {mustReview.slice(0, 10).map((item) => (
                <li key={item.id} className="text-sm text-text">
                  <Link
                    to={typeRoutes[item.type]}
                    className="flex gap-2 no-underline text-text hover:text-neon-cyan transition-colors"
                  >
                    <span className="text-neon-red shrink-0">!</span>
                    {item.title}
                  </Link>
                </li>
              ))}
              {mustReview.length > 10 && (
                <li className="text-sm text-text-muted">...还有 {mustReview.length - 10} 项</li>
              )}
            </ul>
          )}
        </div>

        <div className="bg-cyber-surface rounded-2xl border border-cyber-border p-5">
          <h2 className="text-lg font-semibold text-text-muted mb-2 font-terminal">
            尚未学习 ({unlearned.length})
          </h2>
          {unlearned.length === 0 ? (
            <p className="text-sm text-text-muted">所有内容都已开始学习</p>
          ) : (
            <ul className="space-y-2">
              {unlearned.slice(0, 10).map((item) => (
                <li key={item.id} className="text-sm text-text">
                  <Link
                    to={typeRoutes[item.type]}
                    className="flex gap-2 no-underline text-text hover:text-neon-cyan transition-colors"
                  >
                    <span className="text-text-muted shrink-0">-</span>
                    {item.title}
                  </Link>
                </li>
              ))}
              {unlearned.length > 10 && (
                <li className="text-sm text-text-muted">...还有 {unlearned.length - 10} 项</li>
              )}
            </ul>
          )}
        </div>
      </div>

      <Link
        to="/learn"
        className="inline-block gradient-cyber text-white px-6 py-2.5 rounded-xl font-medium no-underline hover:brightness-110 transition-all font-terminal"
      >
        去学习
      </Link>
    </div>
  );
}
