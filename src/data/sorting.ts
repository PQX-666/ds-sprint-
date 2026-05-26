import type { SortingAlgorithm, SortingScenario, SortingOrderItem } from '../types';

export const sortingAlgorithms: SortingAlgorithm[] = [
  {
    id: 'sa01',
    name: '直接插入排序',
    timeAverage: 'O(n²)',
    timeWorst: 'O(n²)',
    space: 'O(1)',
    stable: true,
    features: '基本有序时效率高，比较和移动次数少',
    bestUseCase: '数据规模小、基本有序、要求稳定',
    examAnswerTemplate: '直接插入排序是稳定排序，时间复杂度 O(n²)，空间复杂度 O(1)。在数据基本有序时效率较高。',
    mistakes: ['和简单选择排序的稳定性搞混'],
  },
  {
    id: 'sa02',
    name: '冒泡排序',
    timeAverage: 'O(n²)',
    timeWorst: 'O(n²)',
    space: 'O(1)',
    stable: true,
    features: '简单稳定，但效率低，每趟确定一个最大值沉底',
    bestUseCase: '小规模数据、教学演示',
    examAnswerTemplate: '冒泡排序是稳定排序，时间复杂度 O(n²)，空间复杂度 O(1)。实现简单但效率较低。',
    mistakes: ['实际应用很少，不要在大规模数据场景选它'],
  },
  {
    id: 'sa03',
    name: '简单选择排序',
    timeAverage: 'O(n²)',
    timeWorst: 'O(n²)',
    space: 'O(1)',
    stable: false,
    features: '交换次数少，最多 n-1 次交换',
    bestUseCase: '希望减少数据移动次数',
    examAnswerTemplate: '简单选择排序是不稳定排序，时间复杂度 O(n²)，空间复杂度 O(1)。交换次数较少，适合元素移动代价高的场景。',
    mistakes: ['认为选择排序稳定（它是不稳定的）', 'minIndex 是下标不是值'],
  },
  {
    id: 'sa04',
    name: '希尔排序',
    timeAverage: '通常优于 O(n²)',
    timeWorst: 'O(n²)',
    space: 'O(1)',
    stable: false,
    features: '直接插入排序的改进，用增量分组逐步缩小增量',
    bestUseCase: '中等规模数据、不要求稳定',
    examAnswerTemplate: '希尔排序是不稳定排序，是直接插入排序的改进，通过增量分组提高效率。',
    mistakes: ['和直接插入排序的稳定性搞混（希尔不稳定，插入稳定）'],
  },
  {
    id: 'sa05',
    name: '快速排序',
    timeAverage: 'O(n log n)',
    timeWorst: 'O(n²)',
    space: 'O(log n)',
    stable: false,
    features: '平均效率最高，最坏情况退化为 O(n²)（基本有序时）',
    bestUseCase: '数据规模较大、不要求稳定、希望平均效率高',
    examAnswerTemplate: '快速排序是不稳定排序，平均时间复杂度 O(n log n)，最坏 O(n²)。空间复杂度 O(log n)（递归栈）。平均效率在比较排序中最高。',
    mistakes: ['忘记最坏情况（基本有序时退化为 O(n²)）', '认为快排是稳定的'],
  },
  {
    id: 'sa06',
    name: '堆排序',
    timeAverage: 'O(n log n)',
    timeWorst: 'O(n log n)',
    space: 'O(1)',
    stable: false,
    features: '最坏情况也高效，辅助空间少',
    bestUseCase: '数据规模大、最坏情况也要求高效、辅助空间有限',
    examAnswerTemplate: '堆排序是不稳定排序，最好、平均、最坏时间复杂度均为 O(n log n)，空间复杂度 O(1)。适合辅助空间有限且要求最坏情况高效的大规模排序。',
    mistakes: ['认为堆排序是稳定的'],
  },
  {
    id: 'sa07',
    name: '归并排序',
    timeAverage: 'O(n log n)',
    timeWorst: 'O(n log n)',
    space: 'O(n)',
    stable: true,
    features: '稳定且高效，但需要额外 O(n) 辅助空间',
    bestUseCase: '数据规模大、要求稳定、允许额外空间',
    examAnswerTemplate: '归并排序是稳定排序，最好、平均、最坏时间复杂度均为 O(n log n)，空间复杂度 O(n)。适合数据规模较大且要求稳定的场景。',
    mistakes: ['忘记需要 O(n) 辅助空间', '认为归并排序空间复杂度是 O(1)'],
  },
];

export const sortingScenarios: SortingScenario[] = [
  {
    id: 'sc01',
    question: '待排序序列基本有序，并且要求排序稳定，应选择哪种排序算法？',
    answer: '直接插入排序',
    analysis: '直接插入排序是稳定排序，并且在数据基本有序时比较和移动次数较少，效率较高。空间复杂度为 O(1)。',
  },
  {
    id: 'sc02',
    question: '数据规模较大，不要求稳定性，希望平均排序效率较高，应选择哪种排序算法？',
    answer: '快速排序',
    analysis: '快速排序平均时间复杂度为 O(n log n)，实际平均效率较高。但不稳定，且最坏情况下可能退化为 O(n²)。',
  },
  {
    id: 'sc03',
    question: '数据规模较大，要求最坏情况下仍然高效，并且辅助空间尽量少，应选择哪种排序算法？',
    answer: '堆排序',
    analysis: '堆排序最好、平均和最坏时间复杂度均为 O(n log n)，空间复杂度为 O(1)。但堆排序不稳定。',
  },
  {
    id: 'sc04',
    question: '数据规模较大，要求排序稳定，允许使用额外空间，应选择哪种排序算法？',
    answer: '归并排序',
    analysis: '归并排序时间复杂度为 O(n log n)，且是稳定排序。缺点是需要 O(n) 辅助空间。',
  },
  {
    id: 'sc05',
    question: '希望排序过程中尽量减少数据元素移动次数，应选择哪种排序算法？',
    answer: '简单选择排序',
    analysis: '简单选择排序每一趟最多进行一次交换，整个排序过程中交换次数最多 n-1 次。但时间复杂度为 O(n²)，且不稳定。',
  },
  {
    id: 'sc06',
    question: '要求稳定排序，数据规模较小，应选择哪种排序算法？',
    answer: '直接插入排序或冒泡排序',
    analysis: '直接插入排序和冒泡排序都是稳定排序，实现简单，适合小规模数据。若数据基本有序，直接插入排序更合适。',
  },
];

export const answerTemplate = `我选择 ______ 排序。

原因：
1. 从时间复杂度看，______。
2. 从空间复杂度看，______。
3. 从稳定性看，______。
4. 结合题目条件，______，因此该算法更合适。`;

export const stabilityRhyme = '插冒归稳定；选希快堆不稳';
export const timeRhyme = '插冒选，平方慢；快堆归，nlogn';
export const spaceRhyme = '归并费空间；快排递归栈；其余多为一';
export const sceneRhyme = '基本有序插入好；平均最快选快排；最坏高效看堆归；要求稳定选归并；空间有限选堆排；少移动选选择';

export const sortingOrderItems: SortingOrderItem[] = [
  {
    id: 'st01',
    title: '排序算法时间复杂度排序',
    items: [
      { id: 'st01-1', label: '直接插入排序 — O(n²)' },
      { id: 'st01-2', label: '快速排序（平均）— O(n log n)' },
      { id: 'st01-3', label: '归并排序 — O(n log n)' },
      { id: 'st01-4', label: '折半查找 — O(log n)' },
      { id: 'st01-5', label: '顺序查找 — O(n)' },
    ],
    correctOrder: ['st01-4', 'st01-5', 'st01-2', 'st01-3', 'st01-1'],
    explanation: '按时间复杂度从快到慢：O(log n) < O(n) < O(n log n) < O(n²)',
  },
];
