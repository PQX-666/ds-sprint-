import { Link } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';
import { IconSun, IconMoon, IconMenu } from './icons';

interface Props {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: Props) {
  const { isDark, toggle } = useDarkMode();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-bg/90 backdrop-blur-md border-b border-cyber-border/50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-1.5 text-text-muted hover:text-neon-cyan cursor-pointer transition-colors"
            aria-label="菜单"
          >
            <IconMenu />
          </button>
          <Link to="/" className="text-lg font-bold no-underline tracking-tight">
            <span className="gradient-cyber-text">数据结构期末冲刺</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-xs text-text-muted font-terminal">
            <span className="text-neon-cyan">root</span>@pengqixuan:~$
          </span>
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-text-muted hover:text-neon-cyan hover:bg-cyber-border/50 transition-all cursor-pointer"
            aria-label={isDark ? '切换亮色模式' : '切换暗色模式'}
          >
            {isDark ? <IconSun /> : <IconMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
}
