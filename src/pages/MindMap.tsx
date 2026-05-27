import { useState } from 'react';
import Lightbox from '../components/Lightbox';

const BASE = import.meta.env.BASE_URL;

type ImageItem = { name: string; file: string };

const categories: { title: string; images: ImageItem[] }[] = [
  {
    title: '期末复习总图',
    images: [
      { name: '期末复习思维导图（1）', file: '数据结构期末复习思维导图（1）.png' },
      { name: '期末复习思维导图（2）', file: '数据结构期末复习思维导图（2）.png' },
      { name: '期末复习思维导图（3）', file: '数据结构期末复习思维导图（3）.png' },
    ],
  },
  {
    title: '核心代码',
    images: [
      { name: '核心代码思维导图（1）', file: '数据结构核心代码思维导图（1）.png' },
      { name: '核心代码思维导图（2）', file: '数据结构核心代码思维导图（2）.png' },
      { name: '核心代码思维导图（3）', file: '数据结构核心代码思维导图（3）.png' },
    ],
  },
  {
    title: '画图题',
    images: [
      { name: '树的存储结构', file: '数据结构画图题（树的存储结构）.png' },
      { name: '二叉树的构造', file: '数据结构画图题专项（二叉树的构造）.png' },
      { name: '哈夫曼树', file: '数据结构画图题（哈夫曼树）.png' },
      { name: '哈希表', file: '数据结构画图题（哈希表）.png' },
      { name: '最小生成树', file: '数据结构画图题（最小生成树）.png' },
    ],
  },
  {
    title: '算法填空',
    images: [
      { name: '顺序表+循环队列', file: '数据结构算法填空（顺序表+循环队列）.png' },
      { name: '二叉树遍历+应用', file: '数据结构算法填空 （二叉树遍历+应用）.png' },
      { name: '折半查找+简单排序+栈应用', file: '数据结构算法填空（折半查找+简单排序+栈应用）.png' },
    ],
  },
  {
    title: '算法设计',
    images: [
      { name: '答题模板', file: '数据结构算法设计题答题模板.png' },
      { name: '栈与队列', file: '数据结构算法设计题（栈与队列）.png' },
      { name: '二叉树递归', file: '数据结构算法设计题（二叉树递归题）.png' },
      { name: '顺序表+折半查找+选择排序', file: '数据结构算法设计题（顺序表，折半查找与简单选择排序）.png' },
    ],
  },
  {
    title: '基础概念',
    images: [
      { name: '树基础概念', file: '数据结构（树 基础概念）.png' },
      { name: '图基础概念', file: '数据结构（图 基础概念）.png' },
      { name: '二叉树基础概念', file: '数据结构（二叉树 基础概念）.png' },
    ],
  },
];

export default function MindMap() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text">思维导图知识库</h1>
        <p className="text-text-muted mt-1">共 {categories.reduce((s, c) => s + c.images.length, 0)} 张导图，点击放大查看</p>
      </div>

      {categories.map((cat) => (
        <section key={cat.title}>
          <h2 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-primary rounded-full" />
            {cat.title}
            <span className="text-xs text-text-muted font-normal">({cat.images.length} 张)</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {cat.images.map((img) => (
              <button
                key={img.file}
                onClick={() => setLightbox({ src: `${BASE}mindmaps/${img.file}`, alt: img.name })}
                className="bg-surface rounded-xl border border-border p-3 text-left cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="aspect-[4/3] bg-bg rounded-lg overflow-hidden mb-2">
                  <img
                    src={`${BASE}mindmaps/${img.file}`}
                    alt={img.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs text-text-muted truncate">{img.name}</p>
              </button>
            ))}
          </div>
        </section>
      ))}

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
