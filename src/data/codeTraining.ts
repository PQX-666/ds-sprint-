import type { CodeTrainingItem } from '../types';

export const codeTrainingItems: CodeTrainingItem[] = [
  {
    id: 'ct01',
    title: '顺序表插入',
    category: '顺序表',
    examFocus: 'for循环从后往前移、插入位置的合法范围',
    idea: '在下标 i 处插入元素 x，需要先把下标 i 及其后面的元素整体后移一位，腾出位置后再把 x 放到 a[i]，最后 length 加 1。',
    code: `bool Insert(int a[], int &length, int i, int x) {
    if (i < 0 || i > length) {
        return false;
    }
    for (int j = length - 1; j >= i; j--) {
        a[j + 1] = a[j];
    }
    a[i] = x;
    length++;
    return true;
}`,
    lineByLineExplanation: [
      'if (i < 0 || i > length)：判断插入位置是否合法，可插入范围 0 到 length',
      'for (int j = length - 1; j >= i; j--)：从最后一个元素开始，逐个后移，直到插入位置',
      'a[j + 1] = a[j]：把 j 位置的元素复制到 j+1 位置（核心语句）',
      'a[i] = x：把新元素放入空出的位置',
      'length++：顺序表长度加 1',
    ],
    fillBlank: {
      template: `for (int j = ________; j >= i; j--) {
    a[________] = a[________];
}
a[i] = x;
________;`,
      answer: `for (int j = length - 1; j >= i; j--) {
    a[j + 1] = a[j];
}
a[i] = x;
length++;`,
    },
    answer: `for (int j = length - 1; j >= i; j--) { a[j + 1] = a[j]; } a[i] = x; length++;`,
    mistakes: [
      '循环方向写反（从前往后移会导致数据被覆盖）',
      '忘记 length++',
      '插入位置合法范围应为 0 <= i <= length',
    ],
    memoryTip: '插入先后移；从后往前走；腾出一个坑；新值放进去；长度加一位',
    complexity: '时间复杂度 O(n)，空间复杂度 O(1)',
    difficulty: 'easy',
  },
  {
    id: 'ct02',
    title: '顺序表删除',
    category: '顺序表',
    examFocus: 'for循环从前往后移、删除位置的合法范围',
    idea: '删除下标 i 的元素后，需要把它后面的元素整体前移一位，最后 length 减 1。',
    code: `bool Delete(int a[], int &length, int i) {
    if (i < 0 || i >= length) {
        return false;
    }
    for (int j = i; j < length - 1; j++) {
        a[j] = a[j + 1];
    }
    length--;
    return true;
}`,
    lineByLineExplanation: [
      'if (i < 0 || i >= length)：判断删除位置是否合法',
      'for (int j = i; j < length - 1; j++)：从删除位置开始，把后面的元素逐个前移',
      'a[j] = a[j + 1]：后面的元素往前补（核心语句）',
      'length--：顺序表有效长度减 1',
    ],
    fillBlank: {
      template: `for (int j = i; j < ________; j++) {
    a[________] = a[________];
}
________;`,
      answer: `for (int j = i; j < length - 1; j++) {
    a[j] = a[j + 1];
}
length--;`,
    },
    answer: `for (int j = i; j < length - 1; j++) { a[j] = a[j + 1]; } length--;`,
    mistakes: [
      '删除位置合法范围是 0 <= i < length',
      '忘记 length--',
      '把 a[j] = a[j+1] 写反',
    ],
    memoryTip: '删除有空位；后面往前补；从 i 开始移；长度最后减',
    complexity: '时间复杂度 O(n)，空间复杂度 O(1)',
    difficulty: 'easy',
  },
  {
    id: 'ct03',
    title: '顺序表逆置',
    category: '顺序表',
    examFocus: '首尾交换、left++/right--、while条件',
    idea: '使用两个指针 left 和 right，分别指向首元素和尾元素，不断交换，然后 left++，right--，直到 left >= right。',
    code: `void Reverse(int a[], int length) {
    int left = 0;
    int right = length - 1;
    while (left < right) {
        int temp = a[left];
        a[left] = a[right];
        a[right] = temp;
        left++;
        right--;
    }
}`,
    lineByLineExplanation: [
      'int left = 0, right = length - 1：首尾双指针',
      'while (left < right)：当左指针小于右指针时继续交换',
      'int temp = a[left]：暂存左元素，防止被覆盖',
      'a[left] = a[right]：右元素放到左边',
      'a[right] = temp：暂存的左元素放到右边',
      'left++; right--：两个指针向中间移动',
    ],
    fillBlank: {
      template: `int left = ________;
int right = ________;
while (________) {
    int temp = a[left];
    a[left] = ________;
    a[right] = ________;
    ________;
    ________;
}`,
      answer: `int left = 0;
int right = length - 1;
while (left < right) {
    int temp = a[left];
    a[left] = a[right];
    a[right] = temp;
    left++;
    right--;
}`,
    },
    answer: `while (left < right) { swap a[left] and a[right]; left++; right--; }`,
    mistakes: [
      'while 条件应为 left < right（不是 <=）',
      '忘记 left++ 和 right--',
      '交换时必须用 temp，直接赋值会覆盖',
    ],
    memoryTip: '左右两个指针夹；首尾交换向中间；left 加一；right 减一；相遇停止',
    complexity: '时间复杂度 O(n)，空间复杂度 O(1)',
    difficulty: 'easy',
  },
  {
    id: 'ct04',
    title: '循环队列入队',
    category: '队列',
    examFocus: '队满条件、入队语句、取模运算',
    idea: '先判断队满。若未满，将元素放入 data[rear]，然后 rear 后移一位并取模。',
    code: `bool EnQueue(int x) {
    if ((rear + 1) % MAXSIZE == front) {
        return false;
    }
    data[rear] = x;
    rear = (rear + 1) % MAXSIZE;
    return true;
}`,
    lineByLineExplanation: [
      'if ((rear + 1) % MAXSIZE == front)：判断队满，必须取模',
      'data[rear] = x：元素放入队尾（核心语句）',
      'rear = (rear + 1) % MAXSIZE：rear 后移并取模',
    ],
    fillBlank: {
      template: `if (________) {
    return false;
}
data[________] = x;
rear = ____________________;`,
      answer: `if ((rear + 1) % MAXSIZE == front) {
    return false;
}
data[rear] = x;
rear = (rear + 1) % MAXSIZE;`,
    },
    answer: `if ((rear+1)%MAXSIZE == front) return false; data[rear]=x; rear=(rear+1)%MAXSIZE;`,
    mistakes: [
      '队满条件写错：是 (rear+1)%MAXSIZE == front',
      '忘记取模',
      '入队后移动 rear，不是 front',
    ],
    memoryTip: '入队先判满；元素放 rear；rear 往后走；加一再取模',
    complexity: '时间复杂度 O(1)，空间复杂度 O(1)',
    difficulty: 'easy',
  },
  {
    id: 'ct05',
    title: '循环队列出队',
    category: '队列',
    examFocus: '队空条件、出队语句、取模运算',
    idea: '先判断队空。若不为空，取出 data[front]，然后 front 后移一位并取模。',
    code: `bool DeQueue(int &x) {
    if (front == rear) {
        return false;
    }
    x = data[front];
    front = (front + 1) % MAXSIZE;
    return true;
}`,
    lineByLineExplanation: [
      'if (front == rear)：判断队空',
      'x = data[front]：取出队头元素',
      'front = (front + 1) % MAXSIZE：front 后移并取模',
    ],
    fillBlank: {
      template: `if (________) {
    return false;
}
x = data[________];
front = ____________________;`,
      answer: `if (front == rear) {
    return false;
}
x = data[front];
front = (front + 1) % MAXSIZE;`,
    },
    answer: `if (front == rear) return false; x=data[front]; front=(front+1)%MAXSIZE;`,
    mistakes: [
      '队空条件写错',
      '出队后移动 front',
      '忘记取模',
    ],
    memoryTip: '出队先判空；取出 front 值；front 往后走；加一再取模',
    complexity: '时间复杂度 O(1)，空间复杂度 O(1)',
    difficulty: 'easy',
  },
  {
    id: 'ct06',
    title: '二叉树先序遍历',
    category: '二叉树遍历',
    examFocus: '根左右、递归终止条件',
    idea: '如果当前结点为空则返回。否则先访问根结点，再递归遍历左子树，最后递归遍历右子树。',
    code: `void PreOrder(TreeNode* root) {
    if (root == NULL) return;
    cout << root->data << " ";
    PreOrder(root->left);
    PreOrder(root->right);
}`,
    lineByLineExplanation: [
      'if (root == NULL) return：遇到空节点直接返回',
      'cout << root->data：先访问根节点',
      'PreOrder(root->left)：递归遍历左子树',
      'PreOrder(root->right)：递归遍历右子树',
    ],
    fillBlank: {
      template: `void PreOrder(TreeNode* root) {
    if (________) return;
    cout << ________ << " ";
    PreOrder(________);
    PreOrder(________);
}`,
      answer: `void PreOrder(TreeNode* root) {
    if (root == NULL) return;
    cout << root->data << " ";
    PreOrder(root->left);
    PreOrder(root->right);
}`,
    },
    answer: '根左右：先访问根，再递归左子树，最后递归右子树',
    mistakes: ['访问根的位置必须在最前面', '忘记递归终止条件 root == NULL'],
    memoryTip: '先序根左右；根在最前头',
    complexity: '时间复杂度 O(n)，空间复杂度 O(h)',
    difficulty: 'easy',
  },
  {
    id: 'ct07',
    title: '二叉树中序遍历',
    category: '二叉树遍历',
    examFocus: '左根右',
    idea: '如果当前结点为空则返回。否则先递归遍历左子树，再访问根结点，最后递归遍历右子树。',
    code: `void InOrder(TreeNode* root) {
    if (root == NULL) return;
    InOrder(root->left);
    cout << root->data << " ";
    InOrder(root->right);
}`,
    lineByLineExplanation: [
      'if (root == NULL) return：递归终止条件',
      'InOrder(root->left)：先递归左子树',
      'cout << root->data：访问根节点（在中间）',
      'InOrder(root->right)：递归右子树',
    ],
    fillBlank: {
      template: `void InOrder(TreeNode* root) {
    if (________) return;
    InOrder(________);
    cout << ________ << " ";
    InOrder(________);
}`,
      answer: `void InOrder(TreeNode* root) {
    if (root == NULL) return;
    InOrder(root->left);
    cout << root->data << " ";
    InOrder(root->right);
}`,
    },
    answer: '左根右：先递归左子树，再访问根，最后递归右子树',
    mistakes: ['访问根的位置在中间（不是最前也不是最后）'],
    memoryTip: '中序左根右；根在正中间',
    complexity: '时间复杂度 O(n)，空间复杂度 O(h)',
    difficulty: 'easy',
  },
  {
    id: 'ct08',
    title: '二叉树后序遍历',
    category: '二叉树遍历',
    examFocus: '左右根',
    idea: '如果当前结点为空则返回。否则先递归遍历左子树，再递归遍历右子树，最后访问根结点。',
    code: `void PostOrder(TreeNode* root) {
    if (root == NULL) return;
    PostOrder(root->left);
    PostOrder(root->right);
    cout << root->data << " ";
}`,
    lineByLineExplanation: [
      'if (root == NULL) return：递归终止条件',
      'PostOrder(root->left)：先递归左子树',
      'PostOrder(root->right)：再递归右子树',
      'cout << root->data：最后访问根节点',
    ],
    fillBlank: {
      template: `void PostOrder(TreeNode* root) {
    if (________) return;
    PostOrder(________);
    PostOrder(________);
    cout << ________ << " ";
}`,
      answer: `void PostOrder(TreeNode* root) {
    if (root == NULL) return;
    PostOrder(root->left);
    PostOrder(root->right);
    cout << root->data << " ";
}`,
    },
    answer: '左右根：先递归左子树，再递归右子树，最后访问根',
    mistakes: ['访问根的位置在最后'],
    memoryTip: '后序左右根；根在最后面',
    complexity: '时间复杂度 O(n)，空间复杂度 O(h)',
    difficulty: 'easy',
  },
  {
    id: 'ct09',
    title: '二叉树层序遍历',
    category: '二叉树遍历',
    examFocus: '队列的使用、front/pop 的区别',
    idea: '使用队列辅助。根节点先入队。当队列不为空时，取队头并访问，然后把其左右孩子依次入队。',
    code: `void LevelOrder(TreeNode* root) {
    if (root == NULL) return;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* p = q.front();
        q.pop();
        cout << p->data << " ";
        if (p->left != NULL) q.push(p->left);
        if (p->right != NULL) q.push(p->right);
    }
}`,
    lineByLineExplanation: [
      'queue<TreeNode*> q; q.push(root)：创建队列，根节点入队',
      'while (!q.empty())：队列不为空就继续',
      'TreeNode* p = q.front(); q.pop()：取队头后再删除',
      'q.push(p->left); q.push(p->right)：左右孩子依次入队（先左后右）',
    ],
    fillBlank: {
      template: `queue<TreeNode*> q;
q.push(________);
while (________) {
    TreeNode* p = q.________;
    q.________;
    cout << p->data;
    if (p->left) q.push(________);
    if (p->right) q.push(________);
}`,
      answer: `queue<TreeNode*> q;
q.push(root);
while (!q.empty()) {
    TreeNode* p = q.front();
    q.pop();
    cout << p->data;
    if (p->left) q.push(p->left);
    if (p->right) q.push(p->right);
}`,
    },
    answer: '层序用队列，队头访问后，左右孩子依次入队',
    mistakes: ['q.front() 只是取队头不删除，q.pop() 才是删除', '左孩子要先于右孩子入队', '忘记判断 root == NULL'],
    memoryTip: '层序用队列；根先进队列；出队就访问；左右孩子再入队',
    complexity: '时间复杂度 O(n)，空间复杂度 O(n)',
    difficulty: 'easy',
  },
  {
    id: 'ct10',
    title: '求二叉树高度',
    category: '二叉树',
    examFocus: '递归公式、空树返回0、max+1',
    idea: '空树高度为 0。非空树高度 = max(左子树高度, 右子树高度) + 1。',
    code: `int Height(TreeNode* root) {
    if (root == NULL) return 0;
    int lh = Height(root->left);
    int rh = Height(root->right);
    return max(lh, rh) + 1;
}`,
    lineByLineExplanation: [
      'if (root == NULL) return 0：空树高度为 0',
      'int lh = Height(root->left)：递归求左子树高度',
      'int rh = Height(root->right)：递归求右子树高度',
      'return max(lh, rh) + 1：较大值 + 1（当前层）',
    ],
    fillBlank: {
      template: `if (root == NULL) return ________;
int lh = Height(________);
int rh = Height(________);
return ________ + 1;`,
      answer: `if (root == NULL) return 0;
int lh = Height(root->left);
int rh = Height(root->right);
return max(lh, rh) + 1;`,
    },
    answer: 'Height(root) = max(Height(root->left), Height(root->right)) + 1',
    mistakes: ['空树高度返回 0', '忘记 +1', '取左右高度的最大值（不是相加）'],
    memoryTip: '空树高度零；左右分别求；谁高取谁高；最后加一层',
    complexity: '时间复杂度 O(n)，空间复杂度 O(h)',
    difficulty: 'easy',
  },
  {
    id: 'ct11',
    title: '统计叶子结点个数',
    category: '二叉树',
    examFocus: '叶子判断条件（&& 不是 ||）、递归公式',
    idea: '空树返回 0。如果左右孩子都为空，则是叶子返回 1。否则返回左子树叶子数 + 右子树叶子数。',
    code: `int CountLeaf(TreeNode* root) {
    if (root == NULL) return 0;
    if (root->left == NULL && root->right == NULL)
        return 1;
    return CountLeaf(root->left) + CountLeaf(root->right);
}`,
    lineByLineExplanation: [
      'if (root == NULL) return 0：空树叶子数为 0',
      'if (root->left == NULL && root->right == NULL)：左右都为空才是叶子（注意用 && 不是 ||）',
      'return 1：当前结点是叶子',
      'return CountLeaf(root->left) + CountLeaf(root->right)：递归统计左右子树叶子数之和',
    ],
    fillBlank: {
      template: `if (root == NULL) return ________;
if (root->left == NULL ________ root->right == NULL)
    return ________;
return CountLeaf(________) + CountLeaf(________);`,
      answer: `if (root == NULL) return 0;
if (root->left == NULL && root->right == NULL)
    return 1;
return CountLeaf(root->left) + CountLeaf(root->right);`,
    },
    answer: '左右孩子都为空才是叶子结点',
    mistakes: ['叶子判断用 && 不能用 ||', '忘记空树返回 0'],
    memoryTip: '空树返回零；无左无右算一个；不是叶子别着急；左右叶子加一起',
    complexity: '时间复杂度 O(n)，空间复杂度 O(h)',
    difficulty: 'easy',
  },
  {
    id: 'ct12',
    title: '折半查找',
    category: '查找',
    examFocus: '有序前提、while条件 low<=high、high和low更新方向',
    idea: '设 low、high 表示区间，每次取 mid。相等则返回，小了去右，大了去左。low > high 时失败。',
    code: `int BinarySearch(int a[], int n, int key) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (a[mid] == key) return mid;
        else if (key < a[mid]) high = mid - 1;
        else low = mid + 1;
    }
    return -1;
}`,
    lineByLineExplanation: [
      'int low = 0, high = n - 1：初始化查找区间',
      'while (low <= high)：区间有效时继续（注意等号）',
      'int mid = (low + high) / 2：取中间位置',
      'if (a[mid] == key) return mid：找到了',
      'else if (key < a[mid]) high = mid - 1：去左半区',
      'else low = mid + 1：去右半区',
      'return -1：查找失败',
    ],
    fillBlank: {
      template: `int low = ________, high = ________;
while (________) {
    int mid = ________;
    if (a[mid] == key) return ________;
    else if (key < a[mid]) high = ________;
    else low = ________;
}
return ________;`,
      answer: `int low = 0, high = n - 1;
while (low <= high) {
    int mid = (low + high) / 2;
    if (a[mid] == key) return mid;
    else if (key < a[mid]) high = mid - 1;
    else low = mid + 1;
}
return -1;`,
    },
    answer: '必须有序。while(low<=high)，小了去左，大了去右',
    mistakes: ['忘记有序前提', 'while 条件写成 low < high（漏掉了最后一个元素）', 'high 和 low 更新写反'],
    memoryTip: '折半查找要有序；low high 定范围；mid 每次取中间；小了左边找；大了右边找；low 超 high 就失败',
    complexity: '时间复杂度 O(log n)，空间复杂度 O(1)',
    difficulty: 'easy',
  },
  {
    id: 'ct13',
    title: '简单选择排序',
    category: '排序',
    examFocus: '外层循环到 n-1、minIndex 是最小值下标、选择排序不稳定',
    idea: '每趟从未排序部分中选出最小元素，放到当前未排序部分的最前面。',
    code: `void SelectSort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (a[j] < a[minIndex])
                minIndex = j;
        }
        if (minIndex != i) {
            int temp = a[i];
            a[i] = a[minIndex];
            a[minIndex] = temp;
        }
    }
}`,
    lineByLineExplanation: [
      'for (int i = 0; i < n - 1; i++)：外层控制第几趟，n-1 趟即可',
      'int minIndex = i：假设当前未排序部分第一个就是最小的',
      'for (int j = i + 1; j < n; j++)：在剩余部分找最小值的下标',
      'if (a[j] < a[minIndex]) minIndex = j：发现更小的就更新下标',
      'if (minIndex != i) 交换：如果最小值不在首位，则交换',
    ],
    fillBlank: {
      template: `for (int i = 0; i < ________; i++) {
    int minIndex = ________;
    for (int j = ________; j < n; j++) {
        if (a[j] < a[________]) minIndex = ________;
    }
    if (minIndex != i) { ... }
}`,
      answer: `for (int i = 0; i < n - 1; i++) {
    int minIndex = i;
    for (int j = i + 1; j < n; j++) {
        if (a[j] < a[minIndex]) minIndex = j;
    }
    if (minIndex != i) { ... }
}`,
    },
    answer: '外层 i 到 n-1，内层 j 从 i+1 开始找最小值下标',
    mistakes: ['外层循环到 n-1', 'minIndex 是最小值下标不是值', '简单选择排序不稳定'],
    memoryTip: '每趟选最小；放到最前面；minIndex 先等 i；j 从 i 后找；找到更小改下标；最后交换位置',
    complexity: '时间复杂度 O(n²)，空间复杂度 O(1)，不稳定',
    difficulty: 'medium',
  },
];
