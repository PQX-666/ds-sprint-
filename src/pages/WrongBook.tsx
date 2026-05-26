import { useWrongBook } from '../hooks/useWrongBook';
import WrongBookItemCard from '../components/WrongBookItem';

export default function WrongBook() {
  const { items, removeItem, clearAll } = useWrongBook();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-text">错题本</h1>
        {items.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-danger hover:text-danger/80 cursor-pointer"
          >
            清空全部
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-text-muted">还没有错题，继续保持！</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-text-muted">共 {items.length} 道错题</p>
          {items.map((item) => (
            <WrongBookItemCard key={item.id} item={item} onRemove={removeItem} />
          ))}
        </div>
      )}
    </div>
  );
}
