import { useEffect, useState, useCallback } from 'react';

interface ToastItem {
  id: number;
  message: string;
  leaving: boolean;
}

let toastId = 0;
const listeners: Set<(msg: string) => void> = new Set();

export function showToast(message: string) {
  listeners.forEach((fn) => fn(message));
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const add = useCallback((message: string) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, leaving: false }]);
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 400);
    }, 3000);
  }, []);

  useEffect(() => {
    listeners.add(add);
    return () => { listeners.delete(add); };
  }, [add]);

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto bg-cyber-surface/80 backdrop-blur-md border border-neon-cyan/30 shadow-[0_0_20px_rgba(0,229,255,0.15)] rounded-xl px-4 py-3 text-sm text-text font-medium max-w-xs font-terminal ${
            t.leaving ? 'animate-toast-out' : 'animate-toast-in'
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
