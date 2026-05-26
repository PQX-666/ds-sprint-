import type { MemoryListItem } from '../types';

export const memoryLists: MemoryListItem[] = [
  // 概念口诀
  { id: 'ml01', term: '数据结构定义', definition: '数据结构 = 数据关系 + 存储方式 + 操作方法', category: '概念口诀' },
  { id: 'ml02', term: '逻辑结构 vs 存储结构', definition: '逻辑决定关系，存储决定位置', category: '概念口诀' },
  { id: 'ml03', term: '线性表 vs 顺序表 vs 链表', definition: '线性表是排队关系；顺序表是连续座位；链表是手拉手排队', category: '概念口诀', memoryTip: '线性表是逻辑结构，顺序表和链表是存储实现' },
  { id: 'ml04', term: '栈', definition: '后进先出 LIFO。像摞盘子，最后放的最先拿走', category: '概念口诀', memoryTip: '栈像盘子，后进先出' },
  { id: 'ml05', term: '队列', definition: '先进先出 FIFO。像食堂排队，先来先打饭', category: '概念口诀' },

  // 循环队列
  { id: 'ml06', term: '队空条件', definition: 'front == rear', category: '循环队列', memoryTip: '空看 front 等 rear' },
  { id: 'ml07', term: '队满条件', definition: '(rear + 1) % MAXSIZE == front', category: '循环队列', memoryTip: '满看 rear 追 front' },
  { id: 'ml08', term: '入队操作', definition: 'data[rear] = x; rear = (rear + 1) % MAXSIZE', category: '循环队列', memoryTip: '入队动 rear' },
  { id: 'ml09', term: '出队操作', definition: 'x = data[front]; front = (front + 1) % MAXSIZE', category: '循环队列', memoryTip: '出队动 front' },

  // 树
  { id: 'ml10', term: '结点的度', definition: '一个结点拥有的孩子个数', category: '树', memoryTip: '结点度，看孩子数' },
  { id: 'ml11', term: '树的度', definition: '整棵树中所有结点度的最大值', category: '树', memoryTip: '树的度，看最大度' },
  { id: 'ml12', term: '叶子结点', definition: '度为 0 的结点（没有孩子）', category: '树', memoryTip: '叶子结点，度为零' },
  { id: 'ml13', term: '树的高度', definition: '树中结点的最大层次数', category: '树', memoryTip: '树的高度，最大层' },
  { id: 'ml14', term: '满二叉树', definition: '每一层结点都达到最大数量，深度 k 有 2^k-1 个结点', category: '树', memoryTip: '满：层层满' },
  { id: 'ml15', term: '完全二叉树', definition: '除最后一层外其余层都满，最后一层从左到右连续排列', category: '树', memoryTip: '完全：最后一层靠左站' },

  // 二叉树遍历
  { id: 'ml16', term: '先序遍历', definition: '根 → 左 → 右（NLR）', category: '二叉树遍历', memoryTip: '先序根左右' },
  { id: 'ml17', term: '中序遍历', definition: '左 → 根 → 右（LNR）', category: '二叉树遍历', memoryTip: '中序左根右' },
  { id: 'ml18', term: '后序遍历', definition: '左 → 右 → 根（LRN）', category: '二叉树遍历', memoryTip: '后序左右根' },
  { id: 'ml19', term: '层序遍历', definition: '从上到下、从左到右，需要队列', category: '二叉树遍历', memoryTip: '层序用队列' },

  // 二叉树性质
  { id: 'ml20', term: '第 i 层最多结点数', definition: '2^(i-1)', category: '二叉树性质' },
  { id: 'ml21', term: '深度 k 最多总结点数', definition: '2^k - 1', category: '二叉树性质' },
  { id: 'ml22', term: 'n₀ = n₂ + 1', definition: '叶子结点数 = 度为2的结点数 + 1', category: '二叉树性质' },

  // 哈夫曼树
  { id: 'ml23', term: '哈夫曼树构造规则', definition: '每次选两个权值最小的合并，合并后重新排序', category: '哈夫曼树', memoryTip: '每次抓两个最小' },
  { id: 'ml24', term: '哈夫曼编码规则', definition: '左 0 右 1，从根到叶子路径即为编码', category: '哈夫曼树', memoryTip: '左 0 右 1' },
  { id: 'ml25', term: 'WPL 计算', definition: '所有叶子结点的权值 × 路径长度之和，不算内部结点', category: '哈夫曼树', memoryTip: 'WPL 只算叶子' },

  // 最小生成树
  { id: 'ml26', term: 'Prim 算法', definition: '从点扩展，每次选已选集合和未选集合之间的最小边', category: '最小生成树', memoryTip: 'Prim 从点扩' },
  { id: 'ml27', term: 'Kruskal 算法', definition: '边排序，依次选不构成回路的最小边，选够 n-1 条', category: '最小生成树', memoryTip: 'Kruskal 挑小边' },
  { id: 'ml28', term: 'MST 性质', definition: '包含所有顶点、无回路、n-1 条边', category: '最小生成树', memoryTip: 'n 个顶点 n-1 条边' },

  // 哈希表
  { id: 'ml29', term: '哈希函数', definition: 'H(key) = key % m', category: '哈希表', memoryTip: '先算 key % m' },
  { id: 'ml30', term: '开放地址法', definition: '冲突后找下一个空位，Hi = (H(key) + i) % m', category: '哈希表', memoryTip: '开放地址找空位' },
  { id: 'ml31', term: '链地址法', definition: '冲突后挂在同一地址对应的链表中', category: '哈希表', memoryTip: '链地址法挂链表' },

  // 代码口诀
  { id: 'ml32', term: '顺序表插入', definition: 'a[j+1] = a[j]，从后往前移，length++', category: '代码口诀', memoryTip: '插入先后移；从后往前走' },
  { id: 'ml33', term: '顺序表删除', definition: 'a[j] = a[j+1]，从前往后移，length--', category: '代码口诀', memoryTip: '删除前面补；从 i 开始移' },
  { id: 'ml34', term: '顺序表逆置', definition: '首尾交换，left++，right--，直到相遇', category: '代码口诀', memoryTip: '左右指针夹；首尾交换向中间' },
  { id: 'ml35', term: '二叉树高度', definition: 'max(Height(left), Height(right)) + 1', category: '代码口诀', memoryTip: '谁高取谁高；最后加一层' },
  { id: 'ml36', term: '叶子结点判断', definition: 'left == NULL && right == NULL（用 && 不是 ||）', category: '代码口诀', memoryTip: '无左无右算一个' },
  { id: 'ml37', term: '折半查找', definition: '必须有序，low high mid，小左大右，返回 -1', category: '代码口诀', memoryTip: '小了左边找；大了右边找' },
  { id: 'ml38', term: '简单选择排序', definition: '每趟选最小，minIndex 记位置，找到更小就更新，最后交换', category: '代码口诀', memoryTip: 'minIndex 先等 i' },

  // 排序口诀
  { id: 'ml39', term: '稳定性口诀', definition: '插冒归稳定；选希快堆不稳', category: '排序口诀', memoryTip: '插冒归 = 插入、冒泡、归并' },
  { id: 'ml40', term: '时间复杂度口诀', definition: '插冒选，平方慢；快堆归，nlogn', category: '排序口诀', memoryTip: '插冒选 O(n²)；快堆归 O(n log n)' },
  { id: 'ml41', term: '空间复杂度口诀', definition: '归并费空间 O(n)；快排递归栈 O(log n)；其余多为 O(1)', category: '排序口诀' },
  { id: 'ml42', term: '场景选择口诀', definition: '基本有序插入好；平均最快选快排；最坏高效看堆归；要求稳定选归并；空间有限选堆排；少移动选选择', category: '排序口诀' },

  // 画图题口诀
  { id: 'ml43', term: '树存储口诀', definition: '双亲找爸；孩子找娃；左孩右兄', category: '画图题口诀' },
  { id: 'ml44', term: '二叉树构造口诀', definition: '先序找根（第一个），中序分左右；后序找根（最后一个），中序分左右', category: '画图题口诀' },
  { id: 'ml45', term: '哈夫曼树口诀', definition: '每次选两个最小；合并重排；左小右大；左 0 右 1；WPL 只算叶子', category: '画图题口诀' },
  { id: 'ml46', term: '最小生成树口诀', definition: 'Prim 从点扩；Kruskal 挑小边；成环不要；n-1 条边', category: '画图题口诀' },

  // 设计题口诀
  { id: 'ml47', term: '算法设计题三段式', definition: '（1）算法思想（2）伪代码（3）复杂度分析', category: '设计题口诀' },
  { id: 'ml48', term: '算法思想写法', definition: '不能只写"用栈实现"，要写"从左到右扫描，遇到什么做什么，最后如何判断"', category: '设计题口诀', memoryTip: '不能只写数据结构名' },
];
