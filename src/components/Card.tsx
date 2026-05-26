import type { ReactNode } from 'react';

interface CardProps {
  variant?: 'default' | 'elevated' | 'interactive' | 'highlight' | 'danger-outline';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const base = 'rounded-xl border border-border p-5';
const variants: Record<string, string> = {
  default: 'bg-surface shadow-card',
  elevated: 'bg-surface border-border shadow-card-hover',
  interactive: 'bg-surface shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer',
  highlight: 'bg-surface shadow-card border-l-4 border-l-primary',
  'danger-outline': 'bg-surface shadow-card border-danger/30',
};

export default function Card({ variant = 'default', children, className = '', onClick }: CardProps) {
  return (
    <div className={`${base} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
