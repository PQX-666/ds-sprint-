import { Link, useLocation } from 'react-router-dom';
import { useMastery } from '../hooks/useMastery';
import { IconHome, IconBook, IconCode, IconCards, IconPen, IconPuzzle, IconSort, IconClipboard, IconMindMap, IconSprint, IconX, IconArrowRight } from './icons';

// 按推荐学习路径排列
const primaryNav = [
  { path: '/', label: '首页', Icon: IconHome },
  { path: '/learn', label: '学习中心', Icon: IconBook },
  { path: '/practice', label: '刷题训练', Icon: IconPen },
  { path: '/mind-maps', label: '思维导图', Icon: IconMindMap },
  { path: '/concepts', label: '概念理解', Icon: IconBook },
  { path: '/code-training', label: '代码训练', Icon: IconCode },
  { path: '/drawing', label: '画图题', Icon: IconPen },
  { path: '/design', label: '设计题', Icon: IconPuzzle },
  { path: '/sorting', label: '排序专项', Icon: IconSort },
  { path: '/recall', label: '速记卡片', Icon: IconCards },
  { path: '/memory', label: '记背列表', Icon: IconClipboard },
  { path: '/sprint', label: '限时冲刺', Icon: IconSprint },
];

const starItems = ['/practice', '/mind-maps'];

interface Props {
  mobile?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ mobile, onClose }: Props) {
  const location = useLocation();
  const { getLevel, stats } = useMastery();

  const content = (
    <div className={`${mobile ? 'h-full' : 'fixed top-14 left-0 bottom-0 w-52'} bg-cyber-surface border-r border-cyber-border p-4 flex flex-col`}>
      {mobile && (
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-neon-cyan">导航</span>
          <button onClick={onClose} className="p-1 text-text-muted hover:text-neon-cyan cursor-pointer">
            <IconX />
          </button>
        </div>
      )}

      <p className="text-[10px] text-text-muted uppercase tracking-widest mb-2 px-2 font-terminal">
        ▸ 学习模块
      </p>
      <nav className="flex-1 overflow-y-auto space-y-0.5">
        {primaryNav.map((m) => {
          const level = getLevel(m.path.slice(1));
          const isActive = location.pathname === m.path;
          const isStar = starItems.includes(m.path);
          return (
            <Link
              key={m.path}
              to={m.path}
              onClick={mobile ? onClose : undefined}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm no-underline transition-all duration-200 group ${
                isActive
                  ? 'bg-neon-cyan-dim text-neon-cyan border border-neon-cyan/30 neon-border-cyan'
                  : 'text-text-secondary hover:bg-cyber-border/50 hover:text-text'
              }`}
            >
              <m.Icon />
              <span className="flex-1">{m.label}</span>
              {isStar && !isActive && (
                <span className="text-[9px] text-neon-yellow/60 font-terminal">★</span>
              )}
              {level === 'mastered' && (
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green shadow-[0_0_6px_rgba(0,230,118,0.5)] shrink-0" title="已掌握" />
              )}
              {level === 'fuzzy' && (
                <span className="w-1.5 h-1.5 rounded-full bg-neon-yellow shadow-[0_0_6px_rgba(255,234,0,0.5)] shrink-0" title="模糊" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* 底部进度 */}
      <div className="pt-3 border-t border-cyber-border mt-3">
        <Link
          to="/review"
          className="flex items-center justify-between px-2.5 py-2 rounded-lg text-sm text-text-secondary hover:bg-cyber-border/50 hover:text-neon-cyan transition-colors no-underline"
        >
          <span>复习计划</span>
          <IconArrowRight />
        </Link>
        <div className="px-2.5 mt-1">
          <div className="flex items-center justify-between text-xs text-text-muted mb-1">
            <span>掌握度</span>
            <span className="font-terminal">{stats.mastered}</span>
          </div>
          <div className="h-1 bg-cyber-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, (stats.mastered / Math.max(1, stats.mastered + stats.fuzzy)) * 100)}%`,
                background: 'linear-gradient(90deg, var(--color-neon-cyan), var(--color-neon-magenta))',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (mobile) return content;
  return <aside className="w-52 shrink-0 hidden md:block">{content}</aside>;
}
