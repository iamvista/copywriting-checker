import { FC } from 'react'

interface CaseStudy {
  title: string
  before: {
    text: string
    score: number
    issues: string[]
  }
  after: {
    text: string
    score: number
    improvements: string[]
  }
}

const CASE_STUDIES: CaseStudy[] = [
  {
    title: '線上課程促銷文案',
    before: {
      text: '我們的課程很棒，內容豐富，歡迎報名。',
      score: 28,
      issues: ['缺乏具體價值說明', '沒有行動急迫性', '標題不吸引人'],
    },
    after: {
      text: '為什麼你花3小時寫文案，卻只有3個人按讚？這堂課教你黃金公式，10分鐘寫出高轉換文案。限時優惠！今日報名立省3000元，僅剩20個名額！',
      score: 82,
      improvements: ['加入痛點提問引發共鳴', '具體數字增加可信度', '明確限時優惠營造急迫性'],
    },
  },
  {
    title: 'SaaS 產品推廣',
    before: {
      text: '好用的文案工具，推薦給大家試試看。',
      score: 22,
      issues: ['過於籠統', '缺少差異化', '沒有 CTA'],
    },
    after: {
      text: '還在手動檢查文案？Vista 文案健檢工具 3 分鐘給你專業分析報告！基於 6 大維度評估，已幫助 500+ 企業提升轉換率。免費試用，無需信用卡！',
      score: 78,
      improvements: ['痛點開場吸引注意', '具體功能與數據證明', '降低使用門檻的 CTA'],
    },
  },
  {
    title: 'B2B 服務推廣',
    before: {
      text: '我們提供專業文案服務，價格合理，歡迎洽詢。',
      score: 31,
      issues: ['缺乏獨特賣點', '過於被動', '目標受眾不明確'],
    },
    after: {
      text: '給忙碌的老闆：沒時間寫文案，但又想提升業績？Vista 20 年實戰經驗，幫你 3 天內打造高轉換文案。已協助 200+ 企業業績翻倍。立即預約免費諮詢！',
      score: 85,
      improvements: ['明確鎖定目標受眾', '強調專業背景與成果', '主動邀請下一步行動'],
    },
  },
]

const ScoreBadge: FC<{ score: number; label: string }> = ({ score, label }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    if (score >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-neutral-600 font-medium">{label}</span>
      <div className={`${getScoreColor(score)} text-white px-3 py-1 rounded-full font-bold text-sm`}>
        {score} 分
      </div>
    </div>
  )
}

const CaseStudyCard: FC<{ study: CaseStudy }> = ({ study }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-4 border-b border-neutral-200">
        <h3 className="text-lg font-bold text-neutral-800">{study.title}</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-0 divide-x divide-neutral-200">
        {/* Before */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-red-600 uppercase tracking-wide">改善前</h4>
            <ScoreBadge score={study.before.score} label="分數" />
          </div>

          <div className="bg-neutral-50 p-4 rounded-lg mb-4 border border-neutral-200">
            <p className="text-sm text-neutral-700 leading-relaxed">{study.before.text}</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-neutral-600 uppercase">問題點</p>
            {study.before.issues.map((issue, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-red-500 text-sm">✗</span>
                <span className="text-sm text-neutral-700">{issue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* After */}
        <div className="p-6 bg-gradient-to-br from-green-50/50 to-white">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-green-600 uppercase tracking-wide">改善後</h4>
            <ScoreBadge score={study.after.score} label="分數" />
          </div>

          <div className="bg-white p-4 rounded-lg mb-4 border-2 border-green-200 shadow-sm">
            <p className="text-sm text-neutral-800 leading-relaxed font-medium">{study.after.text}</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-neutral-600 uppercase">改善重點</p>
            {study.after.improvements.map((improvement, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-green-500 text-sm">✓</span>
                <span className="text-sm text-neutral-700">{improvement}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-neutral-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">分數提升</span>
              <span className="text-green-600 font-bold text-lg">
                +{study.after.score - study.before.score} 分
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const BeforeAfter: FC = () => {
  return (
    <section className="bg-gradient-to-b from-neutral-50 to-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            看看其他人如何改善文案
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            使用 Vista 文案健檢工具後，這些文案分數平均提升了 <span className="text-primary font-bold">50+ 分</span>
          </p>
        </div>

        <div className="space-y-8">
          {CASE_STUDIES.map((study, idx) => (
            <CaseStudyCard key={idx} study={study} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-primary/10 border border-primary/20 rounded-lg p-6">
            <p className="text-neutral-700 mb-4">
              <strong>你的文案也能有這樣的提升！</strong>
            </p>
            <p className="text-sm text-neutral-600">
              立即使用工具分析，獲得專屬的改善建議
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
