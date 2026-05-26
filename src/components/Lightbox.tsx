import { useEffect, useCallback } from 'react';

interface Props {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function Lightbox({ src, alt, onClose }: Props) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  return (
    <div
      className="lightbox-overlay fixed inset-0 z-[90] bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl cursor-pointer hover:opacity-70 transition-opacity w-12 h-12 flex items-center justify-center"
      >
        ✕
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
