import { Link } from 'react-router-dom';
import { useMastery } from '../hooks/useMastery';
import { useWrongBook } from '../hooks/useWrongBook';
import { useStreak } from '../hooks/useStreak';
import { showToast } from '../components/Toast';
import StatCard from '../components/StatCard';
import StepCard from '../components/StepCard';
import { concepts } from '../data/concepts';
import { codeTrainingItems } from '../data/codeTraining';
import { recallCards } from '../data/recallCards';
import { memoryLists } from '../data/memoryList';
import { practiceQuestions } from '../data/practiceQuestions';
import { useEffect, useMemo } from 'react';

const encouragements = [
  '每一步都在靠近目标。',
  '数据结构不可怕，可怕的是不开始。',
  '别人在焦虑，你在行动。',
  '搞懂一个概念，比焦虑一小时有用。',
  '期末考试只是阶段性检验，理解才是长期财富。',
  '每天进步一点点，及格线触手可及。',
  '坚持就是胜利，你已经比很多人强了。',
  '考试不难，难的是不给自己机会。',
  '认真对待每一个知识点，它们会回报你。',
  '别怕错，错题本是你的秘密武器。',
];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h >= 6 && h < 12) return '早上好！一日之计在于晨，先从概念开始吧。';
  if (h >= 12 && h < 18) return '下午好！保持节奏，代码训练是个好选择。';
  if (h >= 18 && h < 23) return '晚上好！静下心来，做套模拟卷检验一下。';
  return '夜深了，注意休息。快速过一遍背诵清单就好。';
}

function getEncouragement(): string {
  return encouragements[Math.floor(Math.random() * encouragements.length)];
}

export default function Dashboard() {
  const { stats, getLevel } = useMastery();
  const { items: wrongItems } = useWrongBook();
  const { streak, checkIn } = useStreak();
  const encouragement = useMemo(() => getEncouragement(), []);

  useEffect(() => {
    const newStreak = checkIn();
    const totalItems = concepts.length + codeTrainingItems.length + recallCards.length + memoryLists.length;
    const pct = totalItems > 0 ? Math.round((stats.mastered / totalItems) * 100) : 0;

    if (stats.mastered === 5) showToast('开始上道了！');
    else if (pct >= 80 && pct < 100) showToast('基本稳了，查漏补缺！');
    else if (pct >= 50 && pct < 80) showToast('已经过半，胜利在望！');
    else if (pct >= 25 && pct < 50) showToast('四分之一了，保持节奏！');
    else if (pct >= 100) showToast('准备就绪，考试加油！');

    if (newStreak >= 3) showToast(`连续学习 ${newStreak} 天，太棒了！`);
  }, []);

  const totalItems =
    concepts.length +
    codeTrainingItems.length +
    recallCards.length +
    memoryLists.length +
    practiceQuestions.length;

  const pct = totalItems > 0 ? Math.round((stats.mastered / totalItems) * 100) : 0;

  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text">{getGreeting()}</h1>
        <p className="text-text-muted mt-1">{encouragement}</p>
      </div>

      <div className="bg-callout-info-bg border border-callout-info-border rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-callout-info-label">不知道怎么开始？</p>
          <p className="text-xs text-callout-info-text mt-0.5">查看使用说明，了解推荐学习路径</p>
        </div>
        <Link
          to="/guide"
          className="text-sm font-medium bg-primary text-white px-4 py-1.5 rounded-lg no-underline hover:bg-primary-dark transition-colors whitespace-nowrap"
        >
          使用说明
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard variant="progress" title="总体掌握" value={stats.mastered} total={totalItems} />
        <StatCard variant="number" title="模糊待巩固" value={stats.fuzzy} color="accent" />
        <StatCard variant="number" title="错题数" value={wrongItems.length} color="danger" />
        <StatCard variant="number" title="总数" value={totalItems} />
        <StatCard variant="streak" title="连续学习" value={streak} />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-text mb-3">学习路径</h2>
          <div className="space-y-3">
            <StepCard
              step={1}
              title="概念理解"
              description="掌握数据结构核心概念和原理"
              completed={concepts.every((c) => getLevel(c.id) === 'mastered')}
            />
            <StepCard
              step={2}
              title="代码训练"
              description="手写经典算法和数据结构操作"
              completed={codeTrainingItems.every((c) => getLevel(c.id) === 'mastered')}
            />
            <StepCard
              step={3}
              title="速记卡片"
              description="考前快速回忆所有重点"
              completed={recallCards.every((c) => getLevel(c.id) === 'mastered')}
            />
            <StepCard
              step={4}
              title="模拟考试"
              description="限时完成综合模拟卷"
            />
            <StepCard
              step={5}
              title="冲刺刷题"
              description="高强度限时训练"
            />
            <StepCard
              step={6}
              title="学习通刷题"
              description="36道考研+期末真题，含深度解析"
            />
          </div>
        </div>

        <div className="md:w-48 flex flex-col items-center justify-center">
          <div className="relative w-28 h-28">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r={radius}
                fill="none" stroke="var(--color-border)" strokeWidth="8"
              />
              <circle
                cx="50" cy="50" r={radius}
                fill="none" stroke="var(--color-primary)" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-text">{pct}%</span>
            </div>
          </div>
          <p className="text-xs text-text-muted mt-2 text-center">掌握度</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          to="/learn"
          className="inline-block bg-primary text-white px-6 py-2.5 rounded-xl font-medium no-underline hover:bg-primary-dark transition-colors active:scale-[0.97]"
        >
          开始学习
        </Link>
        <Link
          to="/sprint"
          className="inline-block bg-accent text-white px-6 py-2.5 rounded-xl font-medium no-underline hover:bg-accent-light transition-colors active:scale-[0.97]"
        >
          限时冲刺
        </Link>
      </div>
    </div>
  );
}
