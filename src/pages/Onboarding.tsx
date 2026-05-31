import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'ds-sprint-onboarding-seen';

export default function Onboarding() {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      setShowOverlay(true);
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  }, []);

  const dismiss = () => setShowOverlay(false);

  const content = (
    <div className="space-y-8 max-w-2xl text-text-secondary leading-relaxed">
      {/* 个人介绍 */}
      <div className="bg-neon-cyan-dim border border-neon-cyan/30 rounded-2xl p-6 space-y-3 text-sm">
        <p className="text-neon-cyan font-terminal text-base font-semibold">
          &gt; 大家好，我叫彭启轩。
        </p>
        <p>
          这是我结合 AI 编程设计的高效数据结构期末复习网页 App。
        </p>
        <p>
          很多同学都不知道数据结构该怎么复习——没有模拟题、上课听得一知半解、
          上机考试分数也不理想，担心期末挂科是正常的。大家的焦虑，我都理解。
        </p>
        <p>
          于是我结合三样东西做出了这个网站：老师上课讲的重点内容和考点、
          学习通上面的原题（老师明确说考试题型就是这里面的）、
          以及我自己对数据结构这门课的理解。
        </p>
      </div>

      {/* 五大核心板块 */}
      <div>
        <h2 className="text-lg font-bold text-neon-cyan font-terminal mb-4">
          &gt; 五大核心板块（对应考试题型）
        </h2>
        <div className="space-y-2">
          {[
            { label: '概念理解', desc: '用容易理解的方式讲解基础概念，整理了老师强调的考点和重点' },
            { label: '代码训练', desc: '含理解记忆和代码填空，覆盖老师强调的重点代码' },
            { label: '画图题', desc: '树和图的画图推演专项训练' },
            { label: '设计题', desc: '算法设计题（最后一道大题 15 分），含答题方向和解题方法' },
            { label: '速记卡片', desc: '快速记忆考点，翻转卡片式互动' },
          ].map(({ label, desc }) => (
            <div key={label} className="flex items-start gap-3 px-4 py-3 bg-cyber-surface border border-cyber-border rounded-xl">
              <span className="text-neon-cyan font-terminal text-xs shrink-0 mt-0.5">&gt;</span>
              <div>
                <p className="text-text font-medium">{label}</p>
                <p className="text-xs text-text-muted">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 额外工具 */}
      <div>
        <h2 className="text-lg font-bold text-neon-magenta font-terminal mb-4">
          &gt; 额外工具
        </h2>
        <div className="space-y-2">
          {[
            { label: '思维导图', desc: '全部手工制作，帮助快速建立知识框架', link: '/mind-maps', highlight: true },
            { label: '刷题训练', desc: '全部来自学习通作业原题，最具参考价值', link: '/practice', highlight: true },
            { label: '记背列表 / 限时冲刺 / 模拟考试', desc: '多元化复习工具，全方位巩固', highlight: false },
          ].map(({ label, desc, link, highlight }) =>
            link ? (
              <Link key={label} to={link} className="no-underline">
                <div className={`px-4 py-3 border rounded-xl flex items-start gap-3 transition-all hover:scale-[1.01] ${
                  highlight
                    ? 'border-neon-yellow/40 bg-neon-yellow-dim/30'
                    : 'border-cyber-border bg-cyber-surface'
                }`}>
                  <span className={highlight ? 'text-neon-yellow font-terminal text-xs shrink-0 mt-0.5' : 'text-text-muted font-terminal text-xs shrink-0 mt-0.5'}>&gt;</span>
                  <div className="flex-1">
                    <p className={highlight ? 'text-neon-yellow font-medium' : 'text-text font-medium'}>{label}</p>
                    <p className="text-xs text-text-muted">{desc}</p>
                  </div>
                  {highlight && <span className="text-neon-yellow self-center">→</span>}
                </div>
              </Link>
            ) : (
              <div key={label} className="px-4 py-3 bg-cyber-surface border border-cyber-border rounded-xl flex items-start gap-3">
                <span className="text-text-muted font-terminal text-xs shrink-0 mt-0.5">&gt;</span>
                <div>
                  <p className="text-text font-medium">{label}</p>
                  <p className="text-xs text-text-muted">{desc}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* 推荐学习路径 */}
      <div>
        <h2 className="text-lg font-bold text-neon-green font-terminal mb-4">
          &gt; 推荐学习路径（最高效）
        </h2>
        <div className="space-y-2">
          {[
            { step: 1, label: '刷题训练', desc: '从这里开始！学习通原题，直接了解考点', link: '/practice', highlight: true },
            { step: 2, label: '思维导图', desc: '建立各章知识框架', link: '/mind-maps' },
            { step: 3, label: '概念理解', desc: '巩固基础知识点', link: '/concepts' },
            { step: 4, label: '代码训练、画图题、设计题、排序专项', desc: '专项突破各类题型', link: '/learn' },
            { step: 5, label: '速记卡片、记背列表、限时冲刺', desc: '考前巩固，查漏补缺', link: '/recall' },
          ].map(({ step, label, desc, link, highlight }) => (
            <Link key={step} to={link!} className="no-underline block group">
              <div className={`flex items-start gap-3 px-4 py-3 border rounded-xl transition-all hover:scale-[1.01] ${
                highlight
                  ? 'border-neon-yellow/50 bg-neon-yellow-dim/30 animate-neon-pulse'
                  : 'border-cyber-border bg-cyber-surface hover:border-neon-cyan/30'
              }`}>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 font-terminal ${
                  highlight ? 'bg-neon-yellow text-black' : 'bg-cyber-border text-text-muted'
                }`}>{step}</span>
                <div className="flex-1">
                  <p className={highlight ? 'text-neon-yellow font-medium' : 'text-text font-medium'}>{label}</p>
                  <p className="text-xs text-text-muted">{desc}</p>
                </div>
                <span className={`text-lg self-center group-hover:translate-x-1 transition-transform ${highlight ? 'text-neon-yellow' : 'text-neon-cyan'}`}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 学习建议 */}
      <div className="bg-neon-green-dim border border-neon-green/30 rounded-2xl p-5 space-y-2 text-sm">
        <p className="text-neon-green font-terminal font-semibold">&gt; 学习建议</p>
        <p>不用一口气全部看完。从现在起，每天花一个小时：刷几道真题 → 看一章思维导图 → 过一遍对应概念。</p>
        <p>间歇重复记忆、主动检索、通过题目加深理解——这是脑科学验证最高效的学习方法。</p>
        <p className="text-neon-green font-medium pt-1">祝大家数据结构高分拿下，期末顺利！🚀</p>
      </div>
    </div>
  );

  if (showOverlay) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-cyber-surface border border-neon-cyan/30 rounded-2xl shadow-[0_0_60px_rgba(0,229,255,0.15)] max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 animate-scale-in">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold gradient-cyber-text"># 数据结构期末冲刺</h1>
            <button
              onClick={dismiss}
              className="gradient-cyber text-white px-5 py-2 rounded-xl text-sm font-medium cursor-pointer hover:brightness-110 transition-all font-terminal"
            >
              开始学习 →
            </button>
          </div>
          <p className="text-xs text-text-muted font-terminal mb-6">&gt; author: 彭启轩</p>
          {content}
          <div className="mt-6 text-center">
            <button
              onClick={() => { dismiss(); navigate('/practice'); }}
              className="gradient-cyber text-white px-8 py-3 rounded-xl text-base font-medium cursor-pointer hover:brightness-110 transition-all font-terminal animate-neon-pulse"
            >
              直接开始刷题 →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="heading-xl text-text font-terminal">
          <span className="gradient-cyber-text"># 使用说明</span>
        </h1>
        <p className="text-text-muted text-sm mt-1 font-terminal">&gt; author: 彭启轩</p>
      </div>
      {content}
    </div>
  );
}
