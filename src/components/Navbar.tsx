import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';
import { IconSun, IconMoon, IconMenu } from './icons';

interface Props {
  onMenuClick: () => void;
}

const navItems = [
  { path: '/', label: '仪表盘' },
  { path: '/learn', label: '学习' },
  { path: '/sprint', label: '冲刺' },
  { path: '/review', label: '复习' },
  { path: '/wrong-book', label: '错题本' },
];

export default function Navbar({ onMenuClick }: Props) {
  const location = useLocation();
  const { isDark, toggle } = useDarkMode();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-nav">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-1.5 text-text-muted hover:text-text cursor-pointer"
            aria-label="菜单"
          >
            <IconMenu />
          </button>
          <Link to="/" className="text-lg font-bold text-primary no-underline tracking-tight">
            DS Sprint
          </Link>
          <span className="hidden sm:inline text-xs text-text-muted">· 彭启轩</span>
        </div>

        <div className="flex items-center gap-1">
          <div className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium no-underline transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-white'
                    : 'text-text-muted hover:bg-border hover:text-text'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={toggle}
            className="p-2 rounded-lg text-text-muted hover:bg-border hover:text-text transition-colors cursor-pointer ml-1"
            aria-label={isDark ? '切换亮色模式' : '切换暗色模式'}
          >
            {isDark ? <IconSun /> : <IconMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
}
