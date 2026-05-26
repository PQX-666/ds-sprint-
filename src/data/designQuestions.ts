import type { DesignQuestion } from '../types';

export const designQuestions: DesignQuestion[] = [
  {
    id: 'ds01',
    title: '括号匹配',
    category: '栈应用',
    problem: '给定一个只包含 (), [], {} 的字符串，判断括号是否匹配。',
    idea: '使用栈保存尚未匹配的左括号。从左到右扫描，遇左括号入栈；遇右括号时栈空则失败，否则取栈顶判断是否匹配，匹配则出栈。扫描结束后栈空则成功。',
    pseudoCode: `bool Match(string s) {
    stack<char> st;
    for (int i = 0; i < s.length(); i++) {
        char ch = s[i];
        if (ch == '(' || ch == '[' || ch == '{') {
            st.push(ch);
        } else if (ch == ')' || ch == ']' || ch == '}') {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if ((ch == ')' && top != '(') ||
                (ch == ']' && top != '[') ||
                (ch == '}' && top != '{'))
                return false;
        }
    }
    return st.empty();
}`,
    complexity: '时间复杂度 O(n)，空间复杂度 O(n)',
    scoringPoints: ['使用栈保存左括号', '左括号入栈', '右括号匹配栈顶', '栈空时遇到右括号返回 false', '类型不匹配返回 false', '最后栈空才成功'],
    mistakes: ['只写"用栈实现"（太简略）', '忘记最后判断栈是否为空', '匹配条件写错'],
    template: '（1）算法思想：使用栈保存未匹配的左括号，扫描字符串，左括号入栈、右括号匹配栈顶，最后判断栈是否为空。（2）伪代码：见上。（3）复杂度：O(n)/O(n)',
  },
  {
    id: 'ds02',
    title: '判断出栈序列是否合法',
    category: '栈应用',
    problem: '给定入栈序列 pushSeq 和出栈序列 popSeq，判断 popSeq 是否是合法出栈序列。',
    idea: '使用辅助栈模拟入栈出栈过程。用指针 j 指向当前需要出栈的元素。按入栈序列依次入栈，每次入栈后检查栈顶是否等于 popSeq[j]，相等则弹出并 j++，持续弹出直到不相等。最后栈空则合法。',
    pseudoCode: `bool IsPopOrder(int pushSeq[], int popSeq[], int n) {
    stack<int> st;
    int j = 0;
    for (int i = 0; i < n; i++) {
        st.push(pushSeq[i]);
        while (!st.empty() && st.top() == popSeq[j]) {
            st.pop();
            j++;
        }
    }
    return st.empty();
}`,
    complexity: '时间复杂度 O(n)，空间复杂度 O(n)',
    scoringPoints: ['辅助栈模拟', '按入栈序列依次入栈', '栈顶等于当前出栈目标时不断出栈（用 while）', '最后栈空则合法'],
    mistakes: ['没有使用 j 指向当前出栈序列位置', '只判断一次栈顶（只用 if 不用 while 连续弹出）'],
    template: '（1）算法思想：模拟入栈出栈，用 j 指向当前需要匹配的出栈元素，每入栈一次就检查是否可以弹出。（2）伪代码：见上。（3）复杂度：O(n)/O(n)',
  },
  {
    id: 'ds03',
    title: '求二叉树高度',
    category: '二叉树',
    problem: '设二叉树采用二叉链表存储，写算法求二叉树高度。',
    idea: '采用递归方法。空树高度为 0。非空树高度 = max(左子树高度, 右子树高度) + 1。',
    pseudoCode: `int Height(TreeNode* root) {
    if (root == NULL) return 0;
    int leftHeight = Height(root->left);
    int rightHeight = Height(root->right);
    return max(leftHeight, rightHeight) + 1;
}`,
    complexity: '时间复杂度 O(n)，空间复杂度 O(h)',
    scoringPoints: ['空树返回 0', '递归求左右子树高度', '取 max 并 +1'],
    mistakes: ['忘记空树返回 0', '忘记 +1', '把左右高度相加（不是取 max）'],
    template: '（1）算法思想：递归求高度，空树返回 0，非空返回 max(左高, 右高) + 1。（2）伪代码：见上。（3）复杂度：O(n)/O(h)',
  },
  {
    id: 'ds04',
    title: '统计叶子结点个数',
    category: '二叉树',
    problem: '统计二叉树中叶子结点（度为 0 的结点）的个数。',
    idea: '递归方法。空树返回 0。如果左右孩子都为空，则是叶子返回 1。否则返回左子树叶子数 + 右子树叶子数。',
    pseudoCode: `int CountLeaf(TreeNode* root) {
    if (root == NULL) return 0;
    if (root->left == NULL && root->right == NULL)
        return 1;
    return CountLeaf(root->left) + CountLeaf(root->right);
}`,
    complexity: '时间复杂度 O(n)，空间复杂度 O(h)',
    scoringPoints: ['空树返回 0', '叶子判断条件：左右都为空（&& 不是 ||）', '递归统计左右子树之和'],
    mistakes: ['叶子判断必须用 &&（左右都为空），不能用 ||', '忘记空树返回 0'],
    template: '（1）算法思想：递归统计，空树返回 0，叶子（左右空）返回 1，否则返回左右叶子数之和。（2）伪代码：见上。（3）复杂度：O(n)/O(h)',
  },
  {
    id: 'ds05',
    title: '统计二叉树结点总数',
    category: '二叉树',
    problem: '统计二叉树的结点总数。',
    idea: '递归方法。空树返回 0。非空返回 1（根结点）+ 左子树结点数 + 右子树结点数。',
    pseudoCode: `int CountNode(TreeNode* root) {
    if (root == NULL) return 0;
    return 1 + CountNode(root->left) + CountNode(root->right);
}`,
    complexity: '时间复杂度 O(n)，空间复杂度 O(h)',
    scoringPoints: ['空树返回 0', '公式：1 + 左 + 右'],
    mistakes: ['忘记 +1（漏掉根结点）'],
    template: '（1）算法思想：递归统计，空树返回 0，非空返回 1+左+右。（2）伪代码：见上。（3）复杂度：O(n)/O(h)',
  },
  {
    id: 'ds06',
    title: '二叉树层序遍历',
    category: '二叉树',
    problem: '设计算法对二叉树进行层序遍历（从上到下、从左到右）。',
    idea: '使用队列辅助。根结点先入队。当队列不为空时，取队头并访问，然后把其左右孩子依次入队。重复直到队列为空。',
    pseudoCode: `void LevelOrder(TreeNode* root) {
    if (root == NULL) return;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* p = q.front(); q.pop();
        cout << p->data << " ";
        if (p->left != NULL) q.push(p->left);
        if (p->right != NULL) q.push(p->right);
    }
}`,
    complexity: '时间复杂度 O(n)，空间复杂度 O(n)',
    scoringPoints: ['使用队列（不是栈）', '先 front() 再 pop()', '左孩子先入队，右孩子后入队', '先判断 root == NULL'],
    mistakes: ['用栈代替队列', '先 q.pop() 再访问——数据丢失', '左孩子和右孩子入队顺序反了无所谓但不规范'],
    template: '（1）算法思想：用队列实现 BFS，根入队→出队访问→左右孩子入队→重复。（2）伪代码：见上。（3）复杂度：O(n)/O(n)',
  },
  {
    id: 'ds07',
    title: '顺序表删除所有值为 x 的元素',
    category: '顺序表',
    problem: '删除顺序表中所有值等于 x 的元素。',
    idea: '用变量 k 记录保留的元素个数。从前往后扫描，不等于 x 的元素放到 a[k]，k++。等于 x 的跳过。最后 n = k。',
    pseudoCode: `void DeleteAllX(int a[], int &n, int x) {
    int k = 0;
    for (int i = 0; i < n; i++) {
        if (a[i] != x) {
            a[k] = a[i];
            k++;
        }
    }
    n = k;
}`,
    complexity: '时间复杂度 O(n)，空间复杂度 O(1)',
    scoringPoints: ['一次扫描完成（高效方案）', '用 k 记录保留元素个数', '最后 n = k'],
    mistakes: ['每遇到一个 x 就删除并整体移动（效率低 O(n²)）', '忘记最后 n = k'],
    template: '（1）算法思想：不等于 x 的保留到 a[k]，等于 x 的跳过，最后更新长度。（2）伪代码：见上。（3）复杂度：O(n)/O(1)',
  },
  {
    id: 'ds08',
    title: '顺序表逆置',
    category: '顺序表',
    problem: '将顺序表中的元素原地逆置。',
    idea: '使用双指针 left 指向首、right 指向尾。当 left < right 时，交换 a[left] 和 a[right]，left++，right--。',
    pseudoCode: `void Reverse(int a[], int n) {
    int left = 0, right = n - 1;
    while (left < right) {
        int temp = a[left];
        a[left] = a[right];
        a[right] = temp;
        left++; right--;
    }
}`,
    complexity: '时间复杂度 O(n)，空间复杂度 O(1)',
    scoringPoints: ['双指针首尾向中间移动', '使用 temp 避免覆盖', 'while 条件 left < right'],
    mistakes: ['while 条件写成 left <= right', '忘记 left++ 和 right--', '交换时没有用 temp'],
    template: '（1）算法思想：双指针首尾交换，向中间移动直到相遇。（2）伪代码：见上。（3）复杂度：O(n)/O(1)',
  },
  {
    id: 'ds09',
    title: '折半查找',
    category: '查找',
    problem: '在有序顺序表中查找 key，返回下标，不存在返回 -1。',
    idea: '设 low、high 为区间边界。取 mid = (low+high)/2。相等返回，key 小则 high=mid-1，key 大则 low=mid+1。low>high 时失败返回 -1。',
    pseudoCode: `int BinarySearch(int a[], int n, int key) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (a[mid] == key) return mid;
        else if (key < a[mid]) high = mid - 1;
        else low = mid + 1;
    }
    return -1;
}`,
    complexity: '时间复杂度 O(log n)，空间复杂度 O(1)',
    scoringPoints: ['前提：数据有序', 'while 条件 low <= high', 'mid 的计算', 'high 和 low 的更新方向正确'],
    mistakes: ['忘记有序前提', 'while 条件写成 low < high', 'high 和 low 更新写反'],
    template: '（1）算法思想：有序前提下，每次取中间比较，根据比较结果去左半区或右半区。（2）伪代码：见上。（3）复杂度：O(log n)/O(1)',
  },
  {
    id: 'ds10',
    title: '简单选择排序',
    category: '排序',
    problem: '对数组进行简单选择排序，使其按升序排列。',
    idea: '每趟从未排序部分中选出最小元素，放到当前未排序部分最前面。重复 n-1 趟。',
    pseudoCode: `void SelectSort(int a[], int n) {
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
    complexity: '时间复杂度 O(n²)，空间复杂度 O(1)，不稳定',
    scoringPoints: ['外层循环 n-1 趟', 'minIndex 记录最小元素下标', '内层从 i+1 开始', '最后交换'],
    mistakes: ['minIndex 记的是下标不是值', '外层循环写成 n 趟', '简单选择排序不稳定'],
    template: '（1）算法思想：每趟选未排序部分最小元素放到前面。（2）伪代码：见上。（3）复杂度：O(n²)/O(1)，不稳定',
  },
];
