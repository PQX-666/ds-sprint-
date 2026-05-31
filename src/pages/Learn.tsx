import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMastery } from '../hooks/useMastery';
import { IconBook, IconCode, IconCards, IconPen, IconPuzzle, IconSort, IconClipboard, IconMindMap, IconSearch } from '../components/icons';
import { concepts } from '../data/concepts';
import { codeTrainingItems } from '../data/codeTraining';
import { recallCards } from '../data/recallCards';
import { memoryLists } from '../data/memoryList';

const modules = [
  {
    path: '/concepts',
    title: '概念理解',
    description: '系统学习数据结构核心概念，理解原理和适用场景',
    Icon: IconBook,
    data: concepts,
  },
  {
    path: '/code-training',
    title: '代码训练',
    description: '手写经典算法，从模板填空到完整实现',
    Icon: IconCode,
    data: codeTrainingItems,
  },
  {
    path: '/recall',
    title: '速记卡片',
    description: '翻转卡片快速回忆考试重点',
    Icon: IconCards,
    data: recallCards,
  },
  {
    path: '/practice',
    title: '刷题训练',
    description: '36道考研+期末真题，含深度解析',
    Icon: IconPen,
    data: [],
  },
  {
    path: '/drawing',
    title: '画图题',
    description: '练习链表、树、图的画图推演',
    Icon: IconPen,
    data: [],
  },
  {
    path: '/design',
    title: '设计题',
    description: '攻克 LRU 缓存、表达式求值等经典设计题',
    Icon: IconPuzzle,
    data: [],
  },
  {
    path: '/sorting',
    title: '排序专项',
    description: '排序算法对比、时间复杂度推导',
    Icon: IconSort,
    data: [],
  },
  {
    path: '/memory',
    title: '记背列表',
    description: '核心公式和结论速查速记',
    Icon: IconClipboard,
    data: memoryLists,
  },
  {
    path: '/mock',
    title: '模拟考试',
    description: '限时完成综合试卷，检验真实水平',
    Icon: IconMindMap,
    data: [],
  },
];

export default function Learn() {
  const { getLevel } = useMastery();
  const [search, setSearch] = useState('');

  const filtered = modules.filter(
    (m) => !search || m.title.includes(search) || m.description.includes(search),
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading-xl text-text font-terminal">学习中心</h1>
        <p className="text-text-muted mt-1">选择模块开始复习，建议按顺序学习。</p>
      </div>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
          <IconSearch />
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索模块..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-cyber-border bg-cyber-surface text-text outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/10 transition-all"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map((m) => {
          const mastered = m.data.length > 0
            ? m.data.filter((item) => getLevel((item as any).id) === 'mastered').length
            : 0;
          const total = m.data.length;

          return (
            <Link
              key={m.path}
              to={m.path}
              className="group bg-cyber-surface rounded-2xl border border-cyber-border shadow-card p-5 no-underline hover:shadow-card-hover hover:border-neon-cyan/30 hover:scale-[1.01] transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neon-cyan-dim flex items-center justify-center text-neon-cyan shrink-0 group-hover:bg-neon-cyan-dim/80 transition-colors">
                  <m.Icon />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-text group-hover:text-neon-cyan transition-colors">
                      {m.title}
                    </h3>
                  </div>
                  <p className="text-sm text-text-muted">{m.description}</p>
                  {total > 0 && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-1 bg-cyber-border rounded-full overflow-hidden">
                        <div
                          className="h-full gradient-cyber rounded-full transition-all duration-500"
                          style={{ width: `${total > 0 ? Math.round((mastered / total) * 100) : 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-muted shrink-0 font-terminal">
                        {mastered}/{total}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
