import type { RecallCard } from '../types';

export const recallCards: RecallCard[] = [
  // 基础概念
  {
    id: 'rc01',
    question: '什么是数据结构？包含哪两个层面？',
    answer: '数据结构 = 数据关系 + 存储方式 + 操作方法。包含逻辑结构（数据之间的关系）和存储结构（数据在内存中的存放方式）两个层面。',
    memoryTip: '逻辑决定关系，存储决定位置',
    tags: ['概念', '基础'],
  },
  {
    id: 'rc02',
    question: '逻辑结构有哪四种？存储结构有哪四种？',
    answer: '逻辑结构：线性结构、树形结构、图结构、集合结构。存储结构：顺序存储、链式存储、索引存储、散列存储。',
    tags: ['概念', '基础'],
  },
  {
    id: 'rc03',
    question: '顺序表 vs 链表：各自的优缺点和适用场景？',
    answer: '顺序表：随机访问 O(1)，插入删除 O(n)，适合频繁访问。链表：查找 O(n)，插入删除 O(1)，适合频繁插入删除。线性表是逻辑结构，顺序表和链表是存储实现。',
    memoryTip: '线性表是排队关系；顺序表是连续座位；链表是手拉手排队',
    tags: ['线性表', '重点'],
  },
  {
    id: 'rc04',
    question: '栈的特点和应用？',
    answer: 'LIFO（后进先出）。栈顶操作 push/pop/top。应用：括号匹配、表达式求值、递归调用、DFS。出栈序列判断方法：辅助栈模拟。',
    memoryTip: '栈像盘子，后进先出',
    tags: ['栈', '重点'],
  },
  {
    id: 'rc05',
    question: '循环队列的队空和队满条件？',
    answer: '队空：front == rear。队满：(rear + 1) % MAXSIZE == front。入队：rear = (rear + 1) % MAXSIZE。出队：front = (front + 1) % MAXSIZE。',
    memoryTip: '空看 front 等 rear；满看 rear 追 front',
    tags: ['队列', '重点'],
  },
  // 树
  {
    id: 'rc06',
    question: '结点的度、树的度、叶子结点、树的高度分别是什么？',
    answer: '结点的度：一个结点拥有的孩子个数。树的度：整棵树中所有结点度的最大值。叶子结点：度为 0。树的高度：结点的最大层次数。',
    memoryTip: '结点度看孩子数；树的度看最大度；叶子度为零；高度最大层',
    tags: ['树', '基础'],
  },
  {
    id: 'rc07',
    question: '树的三种存储结构及其特点？',
    answer: '双亲表示法（找爸快）、孩子表示法（找娃快）、孩子兄弟表示法（左孩右兄，可将普通树转为类似二叉树）。',
    memoryTip: '双亲找爸；孩子找娃；左孩右兄',
    tags: ['树', '存储'],
  },
  {
    id: 'rc08',
    question: '满二叉树和完全二叉树的区别？',
    answer: '满二叉树：每层都满。完全二叉树：除最后一层外都满，最后一层从左到右连续排列。满二叉树一定是完全二叉树，反过来不一定。',
    memoryTip: '满：层层满。完全：最后一层靠左站',
    tags: ['树', '基础'],
  },
  {
    id: 'rc09',
    question: '二叉树四种遍历方式的顺序？',
    answer: '先序：根左右。中序：左根右。后序：左右根。层序：BFS 用队列。',
    memoryTip: '看根的位置：根在前是先序，根在中是中序，根在后是后序',
    tags: ['树', '遍历'],
  },
  {
    id: 'rc10',
    question: '如何由遍历序列构造二叉树？',
    answer: '先序/后序找根（先序第一个、后序最后一个），中序分左右（根左边左子树，右边右子树）。先序+后序一般不能唯一确定二叉树。',
    memoryTip: '先序找根，中序分左右',
    tags: ['树', '重点'],
  },
  {
    id: 'rc11',
    question: '哈夫曼树构造规则和 WPL 计算？',
    answer: '每次选两个权值最小的合并，合并后重新排序，左小右大，左0右1。WPL = 所有叶子结点的权值×路径长度之和（只算叶子）。',
    memoryTip: '每次抓两个最小；合并重排；左小右大；左0右1；WPL只算叶子',
    tags: ['树', '重点'],
  },
  // 图
  {
    id: 'rc12',
    question: 'Prim 和 Kruskal 算法的区别？',
    answer: 'Prim：从点扩，每次选已选和未选集合之间的最小边，适合稠密图。Kruskal：边排序，依次选不构成回路的最小边，适合稀疏图。n-1条边。',
    memoryTip: 'Prim 从点扩；Kruskal 挑小边；成环不要；n-1条边',
    tags: ['图', '重点'],
  },
  // 查找与哈希
  {
    id: 'rc13',
    question: '折半查找的前提和核心代码？',
    answer: '前提：数据有序、顺序存储。while(low<=high)，mid=(low+high)/2，相等返回，小去左(high=mid-1)，大去右(low=mid+1)。O(log n)。',
    memoryTip: '折半查找要有序；小了左边找；大了右边找',
    tags: ['查找', '重点'],
  },
  {
    id: 'rc14',
    question: '哈希表冲突处理方法？',
    answer: '开放地址法：冲突后找下一个空位（线性探测 Hi=(H(key)+i)%m）。链地址法：冲突后挂在同一地址的链表后面。',
    memoryTip: '开放地址找空位；链地址法挂链表',
    tags: ['查找', '哈希'],
  },
  // 排序
  {
    id: 'rc15',
    question: '哪些排序算法是稳定的？',
    answer: '直接插入排序、冒泡排序、归并排序是稳定的。简单选择排序、希尔排序、快速排序、堆排序是不稳定的。',
    memoryTip: '插冒归稳定；选希快堆不稳',
    tags: ['排序', '必背'],
  },
  {
    id: 'rc16',
    question: '各排序算法的时间复杂度？',
    answer: '插冒选：O(n²)。快堆归：O(n log n)。快排最坏 O(n²)。归并需要 O(n) 空间。堆排空间 O(1)。',
    memoryTip: '插冒选平方慢；快堆归 nlogn',
    tags: ['排序', '必背'],
  },
  {
    id: 'rc17',
    question: '如何根据场景选择排序算法？',
    answer: '基本有序→插入；平均最快→快排；最坏高效→堆/归并；要求稳定→归并；空间有限→堆排；少移动→选择排序。',
    memoryTip: '基本有序插入好；要求稳定选归并；空间有限选堆排',
    tags: ['排序', '场景'],
  },
  // 代码
  {
    id: 'rc18',
    question: '顺序表插入的核心代码？',
    answer: 'for(int j=length-1; j>=i; j--) a[j+1]=a[j]; a[i]=x; length++; 注意从后往前移！',
    memoryTip: '插入先后移；从后往前走',
    tags: ['代码', '填空'],
  },
  {
    id: 'rc19',
    question: '二叉树求高度的递归公式？',
    answer: 'if(root==NULL) return 0; return max(Height(left), Height(right)) + 1;',
    memoryTip: '空树高度零；谁高取谁高；最后加一层',
    tags: ['代码', '填空'],
  },
  {
    id: 'rc20',
    question: '统计叶子结点的核心判断？',
    answer: 'if(root->left==NULL && root->right==NULL) return 1; 注意用 && 不是 ||！',
    memoryTip: '无左无右算一个（&& 不是 ||）',
    tags: ['代码', '易错'],
  },
];
