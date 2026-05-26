import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';

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
    <div className="space-y-6 max-w-2xl">
      <div className="bg-callout-accent-bg border border-callout-accent-border rounded-xl p-6">
        <p className="text-callout-accent-text leading-relaxed">
          很多同学反馈不知道如何复习数据结构、不知道考什么，感觉自己通不过考试，很焦虑。
        </p>
        <p className="text-callout-accent-text leading-relaxed mt-2">
          于是我按照老师上课时讲的重点内容，根据自己的理解和思考，借助 AI 的强大功能，开发了这个网站。
        </p>
        <p className="text-callout-accent-text font-medium mt-2">
          希望对你有所帮助，完整跟进这些步骤，及格肯定不成问题。
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-text mb-4">推荐学习路径</h2>
        <div className="space-y-3">
          {[
            { step: 1, title: '概念地基', desc: '先看一遍概念，理解原理，标记掌握程度', link: '/concepts' },
            { step: 2, title: '核心代码训练', desc: '填空训练 + 逐行批注，掌握必考代码', link: '/code-training' },
            { step: 3, title: '画图题专项', desc: '按考试模板练习画图题', link: '/drawing' },
            { step: 4, title: '算法设计题', desc: '三段式训练（思想 + 伪代码 + 复杂度）', link: '/design' },
            { step: 5, title: '排序分析', desc: '背熟性能表 + 场景选择题', link: '/sorting' },
          ].map(({ step, title, desc, link }) => (
            <Link key={step} to={link} className="no-underline block">
              <Card variant="interactive">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {step}
                  </span>
                  <div>
                    <h3 className="font-semibold text-text">{title}</h3>
                    <p className="text-sm text-text-muted mt-0.5">{desc}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-text mb-4">学完以上后</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { num: 6, text: '用速记卡片快速过一遍所有考点', link: '/recall' },
            { num: 7, text: '做模拟考试检验水平', link: '/mock' },
            { num: 8, text: '错题本复习薄弱点', link: '/wrong-book' },
            { num: 9, text: '考前看背诵清单过口诀', link: '/memory' },
            { num: 10, text: '限时冲刺刷反应速度', link: '/sprint' },
          ].map(({ num, text, link }) => (
            <Link key={num} to={link} className="no-underline block">
              <Card variant="interactive" className="h-full">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-text-muted">{num}.</span>
                  <span className="text-sm text-text">{text}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-callout-info-bg border border-callout-info-border rounded-xl p-5">
        <h3 className="font-semibold text-callout-info-label mb-2">小技巧</h3>
        <ul className="space-y-1.5 text-sm text-callout-info-text">
          <li>每个知识点标记"已掌握/模糊/必复习"，系统会自动追踪</li>
          <li>模糊和做错的题会自动进入错题本</li>
          <li>模拟考可以反复做，每次题目随机排列</li>
          <li>支持暗色模式，晚上学习不刺眼（右上角切换）</li>
          <li>思维导图知识库提供了 21 张完整的复习导图</li>
        </ul>
      </div>
    </div>
  );

  if (showOverlay) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
        <div className="bg-surface rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 animate-fade-slide-in">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-text">欢迎使用 DS Sprint</h1>
            <button
              onClick={dismiss}
              className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium cursor-pointer hover:bg-primary-dark transition-colors"
            >
              开始学习
            </button>
          </div>
          <p className="text-sm text-text-muted mb-4">作者：彭启轩</p>
          {content}
          <div className="mt-6 text-center">
            <button
              onClick={() => { dismiss(); navigate('/concepts'); }}
              className="bg-primary text-white px-8 py-3 rounded-xl text-lg font-medium cursor-pointer hover:bg-primary-dark transition-colors"
            >
              从概念开始
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text">使用说明</h1>
      <p className="text-sm text-text-muted">作者：彭启轩</p>
      {content}
    </div>
  );
}
