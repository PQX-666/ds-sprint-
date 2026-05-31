import { Link, useLocation } from 'react-router-dom';
import { IconHome, IconPen, IconMindMap, IconBook, IconSprint } from './icons';

const items = [
  { path: '/', label: '首页', Icon: IconHome },
  { path: '/practice', label: '刷题', Icon: IconPen },
  { path: '/mind-maps', label: '导图', Icon: IconMindMap },
  { path: '/concepts', label: '概念', Icon: IconBook },
  { path: '/sprint', label: '冲刺', Icon: IconSprint },
];

export default function MobileBottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-cyber-bg/90 backdrop-blur-md border-t border-cyber-border/50 safe-bottom">
      <div className="flex justify-around items-center h-14 px-1">
        {items.map(({ path, label, Icon }) => {
          const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-0.5 no-underline text-[10px] min-w-0 py-1 px-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-neon-cyan font-medium translate-y-[-2px]'
                  : 'text-text-muted'
              }`}
            >
              <Icon />
              <span className="truncate max-w-full">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
