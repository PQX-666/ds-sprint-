import type { ReactNode } from 'react';

interface CardProps {
  variant?: 'default' | 'elevated' | 'interactive' | 'highlight' | 'danger-outline' | 'glass' | 'gradient';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const base = 'rounded-2xl border border-cyber-border p-5';
const variants: Record<string, string> = {
  default: 'bg-cyber-surface shadow-card',
  elevated: 'bg-cyber-surface shadow-card-hover',
  interactive: 'bg-cyber-surface shadow-card hover:shadow-card-hover hover:scale-[1.01] hover:border-neon-cyan/30 transition-all duration-300 cursor-pointer',
  highlight: 'bg-cyber-surface shadow-card border-l-[3px] border-l-neon-cyan',
  'danger-outline': 'bg-cyber-surface shadow-card border-neon-red/30',
  glass: 'bg-cyber-surface/60 backdrop-blur-md border-cyber-border/50',
  gradient: 'gradient-cyber text-white border-transparent shadow-lg',
};

export default function Card({ variant = 'default', children, className = '', onClick }: CardProps) {
  return (
    <div className={`${base} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
