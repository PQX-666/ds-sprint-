export type MasteryLevel = 'unlearned' | 'fuzzy' | 'mastered' | 'wrong' | 'must-review';
export type QuestionType = 'concept' | 'code' | 'drawing' | 'design' | 'sorting' | 'recall' | 'memory';
export type ConceptCategory = '基础概念' | '线性结构' | '树结构' | '图结构' | '查找' | '排序';

export interface MasteryRecord {
  itemId: string;
  level: MasteryLevel;
  lastReviewed: string;
  reviewCount: number;
}

export interface WrongBookItem {
  id: string;
  questionId: string;
  type: QuestionType;
  title: string;
  userAnswer?: string;
  correctAnswer: string;
  explanation: string;
  mistakeReason?: string;
  addedAt: string;
}

// --- Data types ---

export interface Concept {
  id: string;
  title: string;
  category: ConceptCategory;
  examFocus: string;
  definition: string;
  plainExplanation: string;
  analogy?: string;
  standardAnswer: string;
  keyPoints: string[];
  mistakes: string[];
  memoryTip: string;
  selfTest: string;
  relatedIds: string[];
}

export interface CodeTrainingItem {
  id: string;
  title: string;
  category: string;
  examFocus: string;
  idea: string;
  code: string;
  lineByLineExplanation: string[];
  fillBlank: {
    template: string;
    answer: string;
  };
  answer: string;
  mistakes: string[];
  memoryTip: string;
  complexity: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface RecallCard {
  id: string;
  question: string;
  answer: string;
  hint?: string;
  memoryTip?: string;
  tags: string[];
}

export interface DrawingQuestion {
  id: string;
  title: string;
  category: string;
  rules: string;
  example: string;
  steps: string[];
  answer: string;
  mistakes: string[];
  examTemplate: string;
}

export interface DesignQuestion {
  id: string;
  title: string;
  category: string;
  problem: string;
  idea: string;
  pseudoCode: string;
  complexity: string;
  scoringPoints: string[];
  mistakes: string[];
  template: string;
}

export interface SortingAlgorithm {
  id: string;
  name: string;
  timeAverage: string;
  timeWorst: string;
  space: string;
  stable: boolean;
  features: string;
  bestUseCase: string;
  examAnswerTemplate: string;
  mistakes: string[];
}

export interface SortingScenario {
  id: string;
  question: string;
  answer: string;
  analysis: string;
}

export interface SortingEntry {
  id: string;
  label: string;
}

export interface SortingOrderItem {
  id: string;
  title: string;
  items: SortingEntry[];
  correctOrder: string[];
  explanation: string;
}

export interface MockExamQuestion {
  id: string;
  type: 'concept' | 'fill' | 'drawing' | 'design' | 'sorting';
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  score: number;
}

export interface MemoryListItem {
  id: string;
  term: string;
  definition: string;
  category: string;
  memoryTip?: string;
}

export type PracticeCategory = '时间复杂度' | '线性表' | '栈和队列' | '树与二叉树' | '哈夫曼编码' | '查找';
export type PracticeQuestionType = 'choice' | 'truefalse' | 'short';

export interface PracticeQuestion {
  id: string;
  category: PracticeCategory;
  type: PracticeQuestionType;
  question: string;
  code?: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface SprintSession {
  id: string;
  startTime: string;
  endTime?: string;
  mode: 'timed' | 'infinite';
  targetMinutes?: number;
  questionsCompleted: number;
  correctCount: number;
  score: number;
}

export interface UserProgress {
  mastery: Record<string, MasteryRecord>;
  wrongBook: WrongBookItem[];
  sprintHistory: SprintSession[];
  streak: number;
  lastActiveDate: string;
  totalXP: number;
}
