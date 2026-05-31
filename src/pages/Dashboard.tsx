import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMastery } from '../hooks/useMastery';
import { useWrongBook } from '../hooks/useWrongBook';
import { useStreak } from '../hooks/useStreak';
import { showToast } from '../components/Toast';
import { concepts } from '../data/concepts';
import { codeTrainingItems } from '../data/codeTraining';
import { recallCards } from '../data/recallCards';
import { memoryLists } from '../data/memoryList';
import { practiceQuestions } from '../data/practiceQuestions';
import { streakCheers, pick } from '../data/encouragements';

const introExpandedKey = 'ds-intro-expanded';

export default function Dashboard() {
  const { stats, getLevel } = useMastery();
  const { items: wrongItems } = useWrongBook();
  const { streak, checkIn } = useStreak();
  const [introExpanded, setIntroExpanded] = useState(
    () => localStorage.getItem(introExpandedKey) !== '0',
  );

  useEffect(() => {
    const newStreak = checkIn();
    const totalItems = concepts.length + codeTrainingItems.length + recallCards.length + memoryLists.length;
    const pct = totalItems > 0 ? Math.round((stats.mastered / totalItems) * 100) : 0;

    if (Math.random() < 0.3) {
      showToast(pick(streakCheers));
    }
    if (newStreak >= 3) showToast(`连续学习 ${newStreak} 天，太棒了！`);
    else if (pct >= 80) showToast('基本稳了，查漏补缺！');
    else if (pct >= 50) showToast('已经过半，胜利在望！');
  }, []);

  const totalItems =
    concepts.length + codeTrainingItems.length + recallCards.length +
    memoryLists.length + practiceQuestions.length;
  const pct = totalItems > 0 ? Math.round((stats.mastered / totalItems) * 100) : 0;
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  const mustReview = [concepts, codeTrainingItems, recallCards, memoryLists].flat().filter(
    (item) => ['fuzzy', 'wrong', 'must-review'].includes(getLevel(item.id)),
  ).length;

  return (
    <div className="space-y-8">
      {/* 个人介绍 Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-cyber-elevated border border-cyber-border p-6 neon-border-cyan">
        <div className="scanline-overlay" />
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-neon-cyan font-terminal text-sm mb-1">
                &gt; 大家好，我叫
              </p>
              <h1 className="text-2xl font-bold text-text-bright mb-2">
               彭启轩 👋
              </h1>
              <p className="text-text-secondary text-sm leading-relaxed max-w-xl">
                这是我结合 AI 编程设计的高效数据结构期末复习网页 App。
                融合老师上课重点、学习通原题和自己的理解，帮你高效备考。
              </p>
            </div>
            <button
              onClick={() => {
                const next = !introExpanded;
                setIntroExpanded(next);
                localStorage.setItem(introExpandedKey, next ? '1' : '0');
              }}
              className="text-xs text-neon-cyan hover:text-neon-magenta cursor-pointer transition-colors shrink-0 font-terminal"
            >
              [{introExpanded ? '收起' : '展开更多'}]
            </button>
          </div>

          {introExpanded && (
            <div className="mt-4 pt-4 border-t border-cyber-border text-sm text-text-secondary leading-relaxed space-y-3 animate-scale-in">
              <p>
                很多同学都不知道数据结构该怎么复习——没有模拟题、上课听得一知半解、
                上机考试分数也不理想，担心期末挂科是正常的。大家的焦虑，我都理解。
              </p>
              <p>
                于是我结合三样东西做出了这个网站：
                <span className="text-neon-cyan ml-1">① 老师上课讲的重点内容和考点</span>、
                <span className="text-neon-magenta">② 学习通上面的原题</span>、
                <span className="text-neon-green">③ 自己对数据结构这门课的理解</span>。
              </p>
              <p>
                网站按考试题型分为五大核心板块：概念理解（帮助理解基础概念和考点）、
                代码训练（含理解记忆和代码填空）、画图题（树和图专项）、
                设计题（算法设计 15 分大题）、以及速记卡片（快速记忆考点）。
              </p>
              <p>
                此外还有思维导图（全部手制）、<span className="text-neon-yellow">刷题训练（学习通原题，最具参考价值）</span>、
                记背列表、限时冲刺等多元工具。
              </p>
              <p>
                不用一口气全部看完。从现在起，每天花一个小时间歇重复记忆、主动检索，
                通过题目加深理解——这是脑科学验证最高效的学习方法。
              </p>
              <p className="text-neon-cyan font-medium">
                祝大家数据结构高分拿下，期末顺利！🚀
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 核心统计 */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 grid grid-cols-3 gap-3">
          <div className="bg-cyber-surface rounded-2xl border border-cyber-border p-4 relative overflow-hidden hover:border-neon-cyan/30 transition-all">
            <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-neon-cyan shadow-[0_0_8px_rgba(0,229,255,0.4)]" />
            <p className="text-xs uppercase tracking-wider text-text-muted mb-2 font-terminal">已掌握</p>
            <p className="text-2xl font-bold text-text-bright font-terminal">{stats.mastered}<span className="text-xs text-text-muted ml-1">/ {totalItems}</span></p>
          </div>
          <div className="bg-cyber-surface rounded-2xl border border-cyber-border p-4 relative overflow-hidden hover:border-neon-yellow/30 transition-all">
            <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-neon-yellow shadow-[0_0_8px_rgba(255,234,0,0.4)]" />
            <p className="text-xs uppercase tracking-wider text-text-muted mb-2 font-terminal">待复习</p>
            <p className="text-2xl font-bold text-neon-yellow font-terminal">{mustReview}</p>
            {mustReview > 0 && (
              <Link to="/review" className="text-xs text-neon-cyan hover:text-neon-magenta no-underline transition-colors">
                [ 去复习 ]
              </Link>
            )}
          </div>
          <div className="bg-cyber-surface rounded-2xl border border-cyber-border p-4 relative overflow-hidden hover:border-neon-green/30 transition-all">
            <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-neon-green shadow-[0_0_8px_rgba(0,230,118,0.4)]" />
            <p className="text-xs uppercase tracking-wider text-text-muted mb-2 font-terminal">连续学习</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-text-bright font-terminal">{streak}</span>
              <span className="text-sm text-text-muted">天</span>
            </div>
          </div>
        </div>

        {/* 进度圆环 */}
        <div className="flex items-center justify-center md:w-32 shrink-0 bg-cyber-surface rounded-2xl border border-cyber-border p-4">
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--color-cyber-border)" strokeWidth="8" />
                <circle cx="50" cy="50" r={radius} fill="none" stroke="url(#cyberGrad)" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={circumference} strokeDashoffset={offset}
                  className="transition-all duration-700 ease-out" />
                <defs>
                  <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--color-neon-cyan)" />
                    <stop offset="100%" stopColor="var(--color-neon-magenta)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-text-bright font-terminal">{pct}%</span>
              </div>
            </div>
            <p className="text-xs text-text-muted mt-1 font-terminal">掌握度</p>
          </div>
        </div>
      </div>

      {/* 推荐学习路径（可点击跳转） */}
      <div>
        <h2 className="heading-md text-text mb-3 font-terminal">
          <span className="text-neon-cyan">&gt;</span> 推荐学习路径
        </h2>
        <div className="space-y-2">
          <Link to="/practice" className="no-underline block group">
            <div className="flex gap-3 p-4 rounded-xl border border-neon-cyan/50 bg-neon-cyan-dim/50 neon-border-cyan animate-neon-pulse transition-all hover:scale-[1.01]">
              <div className="w-8 h-8 rounded-full gradient-cyber flex items-center justify-center text-sm font-bold shrink-0 text-white font-terminal">1</div>
              <div className="flex-1">
                <p className="font-semibold text-neon-cyan">刷题训练 <span className="text-[10px] text-neon-yellow font-terminal ml-1">← 从这里开始！</span></p>
                <p className="text-sm text-text-secondary">学习通原题，直接了解考点，最高效</p>
              </div>
              <span className="text-neon-cyan text-lg self-center group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
          <Link to="/mind-maps" className="no-underline block group">
            <div className="flex gap-3 p-4 rounded-xl border border-cyber-border bg-cyber-surface hover:border-neon-magenta/30 transition-all hover:scale-[1.01]">
              <div className="w-8 h-8 rounded-full bg-neon-magenta-dim border border-neon-magenta/30 flex items-center justify-center text-sm font-bold shrink-0 text-neon-magenta font-terminal">2</div>
              <div className="flex-1">
                <p className="font-semibold text-text">思维导图</p>
                <p className="text-sm text-text-secondary">手制导图，建立知识框架</p>
              </div>
              <span className="text-neon-magenta text-lg self-center group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
          <Link to="/concepts" className="no-underline block group">
            <div className="flex gap-3 p-4 rounded-xl border border-cyber-border bg-cyber-surface hover:border-neon-cyan/30 transition-all hover:scale-[1.01]">
              <div className="w-8 h-8 rounded-full bg-neon-blue-dim border border-neon-blue/30 flex items-center justify-center text-sm font-bold shrink-0 text-neon-blue font-terminal">3</div>
              <div className="flex-1">
                <p className="font-semibold text-text">概念理解</p>
                <p className="text-sm text-text-secondary">巩固基础知识点，理解考点</p>
              </div>
              <span className="text-neon-cyan text-lg self-center group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
          <Link to="/code-training" className="no-underline block group">
            <div className="flex gap-3 p-4 rounded-xl border border-cyber-border bg-cyber-surface hover:border-neon-cyan/30 transition-all hover:scale-[1.01]">
              <div className="w-8 h-8 rounded-full bg-cyber-elevated border border-cyber-border flex items-center justify-center text-sm font-bold shrink-0 text-text-muted font-terminal">4</div>
              <div className="flex-1">
                <p className="font-semibold text-text">专项突破</p>
                <p className="text-sm text-text-secondary">代码训练 / 画图题 / 设计题 / 排序专项</p>
              </div>
              <span className="text-neon-cyan text-lg self-center group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-3 flex-wrap">
        <Link
          to="/practice"
          className="inline-flex items-center gap-2 gradient-cyber text-white px-6 py-3 rounded-xl font-medium no-underline active:scale-[0.97] font-terminal animate-neon-pulse transition-transform"
        >
          开始刷题 →
        </Link>
        <Link
          to="/sprint"
          className="inline-flex items-center gap-2 bg-cyber-surface border border-cyber-border text-text-secondary px-6 py-3 rounded-xl no-underline hover:border-neon-cyan/30 hover:text-neon-cyan transition-all active:scale-[0.97]"
        >
          限时冲刺
        </Link>
        {wrongItems.length > 0 && (
          <Link
            to="/wrong-book"
            className="inline-flex items-center gap-2 bg-cyber-surface border border-cyber-border text-text-secondary px-6 py-3 rounded-xl no-underline hover:border-neon-red/30 hover:text-neon-red transition-all active:scale-[0.97]"
          >
            错题本 ({wrongItems.length})
          </Link>
        )}
      </div>
    </div>
  );
}
