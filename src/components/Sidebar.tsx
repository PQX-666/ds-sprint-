import { Link, useLocation } from 'react-router-dom';
import { useMastery } from '../hooks/useMastery';
import { IconBook, IconCode, IconCards, IconPen, IconPuzzle, IconSort, IconClipboard, IconMindMap, IconX } from './icons';

const learnModules = [
  { path: '/concepts', label: '概念理解', Icon: IconBook },
  { path: '/code-training', label: '代码训练', Icon: IconCode },
  { path: '/recall', label: '速记卡片', Icon: IconCards },
  { path: '/drawing', label: '画图题', Icon: IconPen },
  { path: '/design', label: '设计题', Icon: IconPuzzle },
  { path: '/sorting', label: '排序专项', Icon: IconSort },
  { path: '/memory', label: '记背列表', Icon: IconClipboard },
  { path: '/practice', label: '刷题训练', Icon: IconPen },
];

interface Props {
  mobile?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ mobile, onClose }: Props) {
  const location = useLocation();
  const { getLevel } = useMastery();

  const content = (
    <div className={`${mobile ? 'h-full' : 'fixed top-14 left-0 bottom-0 w-48'} bg-surface border-r border-border p-3 overflow-y-auto`}>
      {mobile && (
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="text-sm font-semibold text-text">导航</span>
          <button onClick={onClose} className="p-1 text-text-muted hover:text-text cursor-pointer">
            <IconX />
          </button>
        </div>
      )}

      <p className="text-xs text-text-muted uppercase tracking-wider mb-2 px-2">
        学习模块
      </p>
      {learnModules.map((m) => {
        const level = getLevel(m.path.slice(1));
        const isActive = location.pathname === m.path;
        return (
          <Link
            key={m.path}
            to={m.path}
            onClick={mobile ? onClose : undefined}
            className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm no-underline transition-colors mb-0.5 relative ${
              isActive
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-text-muted hover:bg-border hover:text-text'
            }`}
          >
            {isActive && (
              <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-primary rounded-full" />
            )}
            <m.Icon />
            <span className="flex-1">{m.label}</span>
            {level === 'mastered' && (
              <span className="w-1.5 h-1.5 rounded-full bg-success shrink-0" title="已掌握" />
            )}
            {level === 'fuzzy' && (
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" title="模糊" />
            )}
          </Link>
        );
      })}

      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-xs text-text-muted uppercase tracking-wider mb-2 px-2">
          更多
        </p>
        <Link
          to="/mind-maps"
          onClick={mobile ? onClose : undefined}
          className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm no-underline transition-colors mb-0.5 ${
            location.pathname === '/mind-maps'
              ? 'bg-primary/10 text-primary font-medium'
              : 'text-text-muted hover:bg-border hover:text-text'
          }`}
        >
          <IconMindMap />
          思维导图
        </Link>
      </div>
    </div>
  );

  if (mobile) return content;
  return <aside className="w-48 shrink-0 hidden md:block">{content}</aside>;
}
