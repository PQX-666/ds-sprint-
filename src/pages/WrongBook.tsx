import { useState } from 'react';
import { useWrongBook } from '../hooks/useWrongBook';
import WrongBookItemCard from '../components/WrongBookItem';

export default function WrongBook() {
  const { items, removeItem, clearAll } = useWrongBook();
  const [showConfirm, setShowConfirm] = useState(false);
  const [redoMode, setRedoMode] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="heading-xl text-text font-terminal">错题本</h1>
        <div className="flex gap-3">
          {items.length > 0 && (
            <>
              <button
                onClick={() => setRedoMode(!redoMode)}
                className={`text-sm cursor-pointer transition-colors font-terminal ${
                  redoMode ? 'text-neon-yellow' : 'text-neon-cyan hover:text-neon-magenta'
                }`}
              >
                [{redoMode ? '退出重做' : '错题重做'}]
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                className="text-sm text-neon-red hover:text-neon-red/80 cursor-pointer transition-colors font-terminal"
              >
                清空全部
              </button>
            </>
          )}
        </div>
      </div>

      {/* 确认弹窗 */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cyber-surface border border-neon-red/30 rounded-2xl shadow-[0_0_40px_rgba(255,23,68,0.2)] p-6 max-w-sm w-full animate-scale-in">
            <p className="text-text font-medium mb-2 font-terminal">确认清空错题本？</p>
            <p className="text-sm text-text-muted mb-6">此操作不可恢复，所有错题记录将被删除。</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg text-sm text-text-muted hover:text-text cursor-pointer transition-colors font-terminal"
              >
                取消
              </button>
              <button
                onClick={() => { clearAll(); setShowConfirm(false); }}
                className="px-4 py-2 rounded-lg text-sm bg-neon-red text-white cursor-pointer hover:bg-neon-red/80 transition-colors font-terminal"
              >
                确认清空
              </button>
            </div>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-text-muted font-terminal">还没有错题，继续保持！</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-text-muted font-terminal">共 {items.length} 道错题{redoMode ? ' — 重做模式' : ''}</p>
          {items.map((item) => (
            <WrongBookItemCard key={item.id} item={item} onRemove={removeItem} redoMode={redoMode} />
          ))}
        </div>
      )}
    </div>
  );
}
