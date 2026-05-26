import { Link } from 'react-router-dom';

const modules = [
  {
    path: '/concepts',
    title: '概念理解',
    description: '系统学习数据结构核心概念，理解原理和适用场景',
    icon: '📖',
    color: 'border-l-primary',
  },
  {
    path: '/code-training',
    title: '代码训练',
    description: '手写经典算法，从模板填空到完整实现',
    icon: '💻',
    color: 'border-l-accent',
  },
  {
    path: '/recall',
    title: '速记卡片',
    description: '翻转卡片快速回忆考试重点',
    icon: '🃏',
    color: 'border-l-success',
  },
  {
    path: '/drawing',
    title: '画图题',
    description: '练习链表、树、图的画图推演',
    icon: '✏️',
    color: 'border-l-primary-light',
  },
  {
    path: '/design',
    title: '设计题',
    description: '攻克 LRU 缓存、表达式求值等经典设计题',
    icon: '🧩',
    color: 'border-l-accent-light',
  },
  {
    path: '/sorting',
    title: '排序专项',
    description: '排序算法对比、时间复杂度推导',
    icon: '🔢',
    color: 'border-l-danger',
  },
  {
    path: '/memory',
    title: '记背列表',
    description: '核心公式和结论速查速记',
    icon: '📋',
    color: 'border-l-primary-dark',
  },
  {
    path: '/mock',
    title: '模拟考试',
    description: '限时完成综合试卷，检验真实水平',
    icon: '📝',
    color: 'border-l-accent',
  },
];

export default function Learn() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text">学习中心</h1>
      <p className="text-text-muted">选择模块开始复习，建议按顺序学习。</p>

      <div className="grid md:grid-cols-2 gap-4">
        {modules.map((m) => (
          <Link
            key={m.path}
            to={m.path}
            className={`block bg-surface rounded-xl border border-border border-l-4 ${m.color} p-5 no-underline hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{m.icon}</span>
              <h3 className="text-lg font-semibold text-text">{m.title}</h3>
            </div>
            <p className="text-sm text-text-muted">{m.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
