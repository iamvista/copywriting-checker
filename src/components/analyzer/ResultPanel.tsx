import { FC, useMemo } from 'react'
import { AnalysisResult } from '@/types/analyzer.types'
import { ScoreCard } from '../common/ScoreCard'
import { DimensionDetail } from '../common/DimensionDetail'
import { exportToMarkdown, exportToPDF } from '@/utils/exportReport'
import { getRandomWisdom } from '@/utils/copywritingWisdom'
import { FaFacebookF, FaXTwitter, FaLine } from 'react-icons/fa6'
import { SiThreads } from 'react-icons/si'
import { FiCopy } from 'react-icons/fi'

interface ResultPanelProps {
  result: AnalysisResult
  onReset: () => void
}

const GRADE_CONFIG = {
  excellent: { emoji: '🏆', label: '優秀', color: 'text-success', bgColor: 'bg-success-bg', borderColor: 'border-success' },
  good: { emoji: '👍', label: '良好', color: 'text-info', bgColor: 'bg-info-bg', borderColor: 'border-info' },
  needsImprovement: { emoji: '💪', label: '可優化', color: 'text-warning', bgColor: 'bg-warning-bg', borderColor: 'border-warning' },
  needsRewrite: { emoji: '📝', label: '加油中', color: 'text-primary', bgColor: 'bg-primary/10', borderColor: 'border-primary' },
}

export const ResultPanel: FC<ResultPanelProps> = ({ result, onReset }) => {
  const gradeInfo = GRADE_CONFIG[result.grade]

  // 隨機選取4條文案心法（使用 useMemo 確保每次結果顯示時只選一次）
  const randomWisdom = useMemo(() => getRandomWisdom(4), [result.timestamp])

  // 產生社群分享文案（病毒行銷優化版）
  const getShareText = (platform: 'default' | 'threads') => {
    // Threads 需要簡潔版本避免亂碼
    if (platform === 'threads') {
      if (result.totalScore >= 90) {
        return `剛用 Vista 文案健檢拿到 ${result.totalScore} 分！\n\n沒想到自己寫的文案這麼有料，工具給的分析比付費顧問還專業\n\n你的文案能拿幾分？敢不敢來挑戰看看`
      } else if (result.totalScore >= 80) {
        return `Vista 文案健檢給我打了 ${result.totalScore} 分\n\n最有價值的是：它直接點出 3 個我從沒注意到的盲點\n\n免費工具居然比上課還實用，推薦給所有寫文案的人`
      } else if (result.totalScore >= 70) {
        return `測完文案拿到 ${result.totalScore} 分，發現自己踩了好幾個雷\n\nVista 工具不只打分數，還告訴你「具體怎麼改」\n\n寫文案的快去測，保證有收穫`
      } else if (result.totalScore >= 60) {
        return `用 Vista 文案健檢測了 ${result.totalScore} 分\n\n看完分析報告嚇一跳：原來我以為很棒的文案，其實漏洞百出\n\n還好是免費工具發現的，不然真的會砸錢下去`
      } else {
        return `Vista 文案健檢一針見血！\n\n雖然分數不高，但它給的建議讓我瞬間開竅\n\n這工具根本是文案救星，強烈推薦`
      }
    }

    // 一般平台使用更生動的版本
    if (result.totalScore >= 90) {
      return `😱 剛用 Vista 文案健檢工具測了我的文案，竟然拿到 ${result.totalScore} 分！

沒想到自己寫得這麼有料 💪 工具給的專業分析比付費顧問還詳細，6 大維度逐一拆解，每個建議都超實用

你的文案能拿幾分？敢不敢來挑戰看看 👇`
    } else if (result.totalScore >= 80) {
      return `剛用 Vista 文案健檢工具測完，拿到 ${result.totalScore} 分 🎯

最有價值的是：它直接點出 3 個我從沒注意到的盲點！瞬間知道怎麼優化了

免費工具居然比上課還實用，推薦給所有寫文案的朋友 👍`
    } else if (result.totalScore >= 70) {
      return `測完文案拿到 ${result.totalScore} 分，發現自己踩了好幾個雷 😅

Vista 文案健檢工具不只打分數，還告訴你「具體怎麼改」，每個維度都有改善建議

寫文案的快去測，保證有收穫 💡`
    } else if (result.totalScore >= 60) {
      return `用 Vista 文案健檢工具測了 ${result.totalScore} 分 📊

看完分析報告嚇一跳：原來我以為很棒的文案，其實漏洞百出 😱

還好是免費工具發現的，不然真的會砸錢下去...快去測測你的文案吧`
    } else {
      return `Vista 文案健檢工具一針見血！💥

雖然我的分數不高，但它給的專業建議讓我瞬間開竅 💡

這工具根本是文案救星，免費又專業，強烈推薦給所有行銷人 🚀`
    }
  }

  const shareText = getShareText('default')
  const threadsText = getShareText('threads')
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://copywriting-checker.vercel.app'

  const handleShare = (platform: 'facebook' | 'twitter' | 'line' | 'threads' | 'copy') => {
    const encodedUrl = encodeURIComponent(shareUrl)

    switch (platform) {
      case 'facebook':
        // Facebook 已移除 quote 參數支援，使用 Feed Dialog
        const fbText = encodeURIComponent(shareText)
        const fbShareUrl = `https://www.facebook.com/dialog/feed?app_id=966242223397117&link=${encodedUrl}&quote=${fbText}&description=${fbText}&display=popup`
        // 同時複製文案到剪貼簿，讓使用者可以手動貼上
        navigator.clipboard.writeText(shareText)
        window.open(fbShareUrl, '_blank', 'width=600,height=600')
        // 提示使用者
        setTimeout(() => {
          alert('💡 Facebook 分享小提示：\n\n由於 FB 政策限制，無法自動帶入文案。\n\n✅ 文案已複製到剪貼簿，請在 FB 分享視窗手動貼上（Ctrl+V 或 Command+V）')
        }, 500)
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodedUrl}`, '_blank')
        break
      case 'line':
        // LINE 使用完整版文案
        window.open(`https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodeURIComponent(shareText)}`, '_blank')
        break
      case 'threads':
        // Threads 使用簡潔版避免亂碼
        window.open(`https://threads.net/intent/post?text=${encodeURIComponent(threadsText)}%0A%0A${encodedUrl}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`)
        alert('✅ 分享文案已複製到剪貼簿！')
        break
    }
  }

  return (
    <div className="space-y-6">
      {/* Header - McKinsey Style */}
      <div className="card-section border-l-primary bg-gradient-to-br from-white to-neutral-cream/30">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-neutral-sand">
          <h2 className="text-3xl font-bold text-neutral-800">文案健檢報告</h2>
          <div className="text-sm text-neutral-600">
            {new Date(result.timestamp).toLocaleDateString('zh-TW')}
          </div>
        </div>

        {/* Score Display - 橫向版面更適合長文案 */}
        <div className="bg-gradient-to-r from-white to-neutral-cream/50 rounded-lg border-2 border-neutral-sand p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* 分數與等級 */}
            <div className={`flex-shrink-0 ${gradeInfo.bgColor} ${gradeInfo.borderColor} border-2 rounded-lg p-6 text-center w-full lg:w-48`}>
              <div className="text-4xl mb-2">{gradeInfo.emoji}</div>
              <div className="text-5xl font-bold text-primary mb-1">{result.totalScore}</div>
              <div className={`text-base font-semibold ${gradeInfo.color} uppercase tracking-wide`}>
                {gradeInfo.label}
              </div>
            </div>

            {/* 分析的文案 */}
            <div className="flex-1 bg-neutral-sand/30 border border-neutral-stone rounded-lg p-5">
              <p className="font-semibold text-primary mb-3 text-sm uppercase tracking-wide">分析的文案</p>
              <p className="whitespace-pre-wrap text-neutral-600 leading-relaxed text-sm lg:text-base">{result.analyzedText}</p>
            </div>

            {/* Social Share - 改為側邊欄 */}
            <div className="flex-shrink-0 w-full lg:w-auto">
              <p className="text-xs text-neutral-600 mb-3 font-medium text-center lg:text-left">分享到社群</p>
              <div className="flex lg:flex-col justify-center lg:justify-start gap-2">
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-3 bg-white hover:bg-[#1877F2] hover:text-white rounded-lg transition-all shadow-sm border border-neutral-stone flex items-center justify-center w-12 h-12"
                  title="分享到 Facebook"
                >
                  <FaFacebookF className="text-lg" />
                </button>
                <button
                  onClick={() => handleShare('line')}
                  className="p-3 bg-white hover:bg-[#06C755] hover:text-white rounded-lg transition-all shadow-sm border border-neutral-stone flex items-center justify-center w-12 h-12"
                  title="分享到 LINE"
                >
                  <FaLine className="text-lg" />
                </button>
                <button
                  onClick={() => handleShare('threads')}
                  className="p-3 bg-white hover:bg-black hover:text-white rounded-lg transition-all shadow-sm border border-neutral-stone flex items-center justify-center w-12 h-12"
                  title="分享到 Threads"
                >
                  <SiThreads className="text-lg" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-3 bg-white hover:bg-black hover:text-white rounded-lg transition-all shadow-sm border border-neutral-stone flex items-center justify-center w-12 h-12"
                  title="分享到 X"
                >
                  <FaXTwitter className="text-lg" />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="p-3 bg-white hover:bg-warning hover:text-white rounded-lg transition-all shadow-sm border border-neutral-stone flex items-center justify-center w-12 h-12"
                  title="複製分享連結"
                >
                  <FiCopy className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dimension Scores */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        <ScoreCard
          title="FAB 法則"
          score={result.dimensions.fab.score}
          icon="⭐"
        />
        <ScoreCard
          title="標題吸引力"
          score={result.dimensions.titleAppeal.score}
          icon="✨"
        />
        <ScoreCard
          title="消費者洞察"
          score={result.dimensions.consumerInsight.score}
          icon="🎯"
        />
        <ScoreCard
          title="行動呼籲"
          score={result.dimensions.callToAction.score}
          icon="🚀"
        />
        <ScoreCard
          title="可讀性"
          score={result.dimensions.readability.score}
          icon="📖"
        />
        <ScoreCard
          title="價值主張"
          score={result.dimensions.valueProposition.score}
          icon="💎"
        />
      </div>

      {/* 免費課程 CTA - 僅在分數 < 40 時顯示 */}
      {result.totalScore < 40 && (
        <div className="card-section border-l-warning bg-gradient-to-br from-warning/10 via-primary/5 to-success/5">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-warning/20 rounded-full mb-4">
              <span className="text-4xl">🎁</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-3">
              別擔心！Vista 送你一堂免費課 🚀
            </h3>
            <p className="text-base lg:text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed mb-2">
              分數低不是問題，問題是<span className="font-bold text-warning">不知道怎麼改</span>。
            </p>
            <p className="text-base lg:text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed">
              Vista 特別為文案新手準備了<span className="font-bold text-primary">「文案寫作基礎課」</span>，
              <span className="font-bold text-success">完全免費</span>，帶你從 0 到 1 打好文案基礎！
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border-2 border-warning/30">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-lg text-neutral-800 mb-4 flex items-center gap-2">
                    <span className="text-warning">📚</span>
                    <span>課程內容</span>
                  </h4>
                  <div className="flex items-start gap-3">
                    <span className="text-success text-xl flex-shrink-0">✓</span>
                    <div>
                      <p className="font-semibold text-neutral-800">FAB 法則實戰</p>
                      <p className="text-sm text-neutral-600">學會把功能變成顧客想要的利益</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-success text-xl flex-shrink-0">✓</span>
                    <div>
                      <p className="font-semibold text-neutral-800">爆款標題公式</p>
                      <p className="text-sm text-neutral-600">10 個即學即用的標題模板</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-success text-xl flex-shrink-0">✓</span>
                    <div>
                      <p className="font-semibold text-neutral-800">痛點挖掘技巧</p>
                      <p className="text-sm text-neutral-600">找到客戶真正在意的問題</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-success text-xl flex-shrink-0">✓</span>
                    <div>
                      <p className="font-semibold text-neutral-800">行動呼籲設計</p>
                      <p className="text-sm text-neutral-600">讓讀者忍不住點擊的 CTA 寫法</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-lg text-neutral-800 mb-4 flex items-center gap-2">
                    <span className="text-primary">🎯</span>
                    <span>你將獲得</span>
                  </h4>
                  <div className="flex items-start gap-3">
                    <span className="text-warning text-xl flex-shrink-0">🎁</span>
                    <div>
                      <p className="font-semibold text-neutral-800">終身免費存取</p>
                      <p className="text-sm text-neutral-600">課程影片可重複觀看</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-warning text-xl flex-shrink-0">📝</span>
                    <div>
                      <p className="font-semibold text-neutral-800">實戰練習題</p>
                      <p className="text-sm text-neutral-600">邊學邊練，立即應用</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-warning text-xl flex-shrink-0">👥</span>
                    <div>
                      <p className="font-semibold text-neutral-800">社群互助</p>
                      <p className="text-sm text-neutral-600">加入 Vista 學員社群交流</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-warning text-xl flex-shrink-0">⚡</span>
                    <div>
                      <p className="font-semibold text-neutral-800">即時問答</p>
                      <p className="text-sm text-neutral-600">課程問題隨時發問</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-warning/10 to-primary/10 rounded-xl p-5 mb-6 border border-warning/20">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <span className="text-3xl">🔥</span>
                  <p className="text-lg font-bold text-neutral-800">
                    限時免費！原價 <span className="line-through text-neutral-500">NT$ 1,980</span>
                    <span className="text-2xl text-success ml-3">現在 $0</span>
                  </p>
                  <span className="text-3xl">🔥</span>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="https://www.skool.com/vista-8077/classroom/cac1e425?md=f59b10fe1ebf46e2bff817c6f045f582"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-warning to-primary text-white text-lg font-bold rounded-xl hover:from-warning-dark hover:to-primary-dark transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>🎓</span>
                  <span>立即免費領取課程</span>
                  <span>→</span>
                </a>
                <p className="text-sm text-neutral-500 mt-4">
                  ⚡ 點擊後立即開始學習 · 不需要信用卡 · 100% 免費
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              💬 <span className="font-semibold">已有 4,200+ 位學員</span>透過這堂課打好文案基礎，
              平均在 2 週內將文案分數提升到 70 分以上。你也可以！
            </p>
          </div>
        </div>
      )}

      {/* 文案金句 - 隨機顯示 */}
      <div className="card-section border-l-primary bg-gradient-to-br from-primary/5 to-accent-teal/5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
            <span>💡</span>
            <span>Vista 文案心法</span>
          </h3>
          <p className="text-xs text-neutral-600">每次隨機顯示 · 共100條心法</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {randomWisdom.map((wisdom, index) => (
            <div
              key={index}
              className="p-4 bg-neutral-cream border-l-4 border-l-primary rounded-lg hover:bg-white hover:border-l-primary-dark hover:shadow-md transition-all duration-200 cursor-default"
            >
              <p className="text-sm text-neutral-600 leading-relaxed">
                <span className="font-bold text-primary">「{wisdom.quote}」</span><br />
                <span className="text-neutral-800">{wisdom.explanation}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Section - McKinsey Style */}
      <div className="card-section border-l-primary">
        <h3 className="text-2xl font-bold text-neutral-800 mb-6 pb-3 border-b-2 border-neutral-sand flex items-center gap-2">
          <span>📋</span>
          <span>總結與建議</span>
        </h3>

        {/* Overall Assessment */}
        <div className="mb-6 p-5 bg-neutral-100 border-l-4 border-neutral-400 rounded-r-lg">
          <h4 className="font-bold text-neutral-800 mb-3 text-sm uppercase tracking-wide">整體評價</h4>
          <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">{result.summary.overallAssessment}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Strengths */}
          {result.summary.strengths.length > 0 && (
            <div className="p-5 bg-success-bg border-2 border-success/30 rounded-lg">
              <h4 className="font-bold text-success-dark mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                <span>✓</span>
                <span>優勢項目</span>
              </h4>
              <ul className="space-y-2">
                {result.summary.strengths.map((strength, idx) => (
                  <li key={idx} className="text-neutral-700 flex items-start gap-2">
                    <span className="text-success font-bold mt-0.5">•</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Weaknesses */}
          {result.summary.weaknesses.length > 0 && (
            <div className="p-5 bg-warning-bg border-2 border-warning/30 rounded-lg">
              <h4 className="font-bold text-warning-dark mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                <span>⚠️</span>
                <span>待改進項目</span>
              </h4>
              <ul className="space-y-2">
                {result.summary.weaknesses.map((weakness, idx) => (
                  <li key={idx} className="text-neutral-700 flex items-start gap-2">
                    <span className="text-warning font-bold mt-0.5">•</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Top Priorities */}
        {result.summary.topPriorities.length > 0 && (
          <div className="mb-6 p-5 bg-info-bg border-2 border-info/30 rounded-lg">
            <h4 className="font-bold text-info-dark mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
              <span>🎯</span>
              <span>優先改善建議</span>
            </h4>
            <ol className="space-y-3">
              {result.summary.topPriorities.map((priority, idx) => (
                <li key={idx} className="text-neutral-700 flex items-start gap-3">
                  <span className="font-bold text-info min-w-[2rem] h-7 w-7 flex items-center justify-center bg-info/20 rounded-full text-sm">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5">{priority}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Expected Impact */}
        <div className="mb-6 p-5 bg-warning-bg border-l-4 border-warning rounded-r-lg">
          <h4 className="font-bold text-warning-dark mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
            <span>📈</span>
            <span>預期效果</span>
          </h4>
          <p className="text-neutral-700 leading-relaxed">{result.summary.expectedImpact}</p>
        </div>

        {/* Vista Learning Resources */}
        <div className="p-6 bg-gradient-to-br from-primary/5 to-info/5 border-2 border-primary/20 rounded-lg">
          <h4 className="font-bold text-neutral-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
            <span>📚</span>
            <span>Vista 文案學習資源</span>
          </h4>
          <p className="text-neutral-700 mb-5 leading-relaxed">{result.summary.vistaRecommendation}</p>

          <div className="grid md:grid-cols-2 gap-4">
            {/* 內容力課程 */}
            <a
              href="https://hahow.in/cr/content-power"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-white border-2 border-primary/20 hover:border-primary rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">🎓</span>
                <div className="flex-1">
                  <h5 className="font-bold text-primary group-hover:text-primary-dark mb-1">內容力：打造品牌的超能力</h5>
                  <p className="text-xs text-neutral-600">Hahow 線上課程｜品牌內容策略完整教學</p>
                </div>
              </div>
            </a>

            {/* 文案力就是你的鈔能力 */}
            <a
              href="https://vista.im/copywriting-book"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-white border-2 border-success/20 hover:border-success rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">📖</span>
                <div className="flex-1">
                  <h5 className="font-bold text-success group-hover:text-success/80 mb-1">文案力就是你的鈔能力</h5>
                  <p className="text-xs text-neutral-600">Vista 著作｜文案寫作實戰技巧與心法</p>
                </div>
              </div>
            </a>

            {/* 慢讀秒懂數位好文案 */}
            <a
              href="https://vista.im/writing-book"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-white border-2 border-info/20 hover:border-info rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">✍️</span>
                <div className="flex-1">
                  <h5 className="font-bold text-info group-hover:text-info/80 mb-1">慢讀秒懂數位好文案</h5>
                  <p className="text-xs text-neutral-600">Vista 著作｜用內容打造品牌影響力</p>
                </div>
              </div>
            </a>

            {/* 1分鐘驚豔ChatGPT爆款文案寫作聖經 */}
            <a
              href="https://vista.im/chatgpt-book"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-white border-2 border-accent-amber/20 hover:border-accent-amber rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">🤖</span>
                <div className="flex-1">
                  <h5 className="font-bold text-accent-amber group-hover:text-accent-amber/80 mb-1">1分鐘驚豔ChatGPT爆款文案寫作聖經</h5>
                  <p className="text-xs text-neutral-600">Vista 著作｜AI 時代的高效提問技巧</p>
                </div>
              </div>
            </a>

            {/* ChatGPT提問課 */}
            <a
              href="https://vista.im/ai-book"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-white border-2 border-accent-teal/20 hover:border-accent-teal rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">🤖</span>
                <div className="flex-1">
                  <h5 className="font-bold text-accent-teal group-hover:text-accent-teal/80 mb-1">ChatGPT 提問課</h5>
                  <p className="text-xs text-neutral-600">Vista 著作｜AI 提問技巧與實戰應用</p>
                </div>
              </div>
            </a>

            {/* Vista 相談室 */}
            <a
              href="https://www.empower.tw/p/consultation.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-white border-2 border-accent-purple/40 hover:border-accent-purple rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">💬</span>
                <div className="flex-1">
                  <h5 className="font-bold text-accent-purple group-hover:text-accent-purple mb-1">Vista 相談室</h5>
                  <p className="text-xs text-neutral-600">一對一諮詢服務｜文案與內容行銷顧問</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-neutral-800 mb-4 pb-3 border-b-2 border-neutral-sand">詳細分析</h3>

        <DimensionDetail
          title="FAB 法則"
          icon="⭐"
          dimension={result.dimensions.fab}
        />
        <DimensionDetail
          title="標題吸引力"
          icon="✨"
          dimension={result.dimensions.titleAppeal}
        />
        <DimensionDetail
          title="消費者洞察"
          icon="🎯"
          dimension={result.dimensions.consumerInsight}
        />
        <DimensionDetail
          title="行動呼籲"
          icon="🚀"
          dimension={result.dimensions.callToAction}
        />
        <DimensionDetail
          title="可讀性"
          icon="📖"
          dimension={result.dimensions.readability}
        />
        <DimensionDetail
          title="價值主張"
          icon="💎"
          dimension={result.dimensions.valueProposition}
        />
      </div>

      {/* Newsletter Subscription */}
      <div className="card-section border-l-primary bg-gradient-to-br from-primary/5 via-info/5 to-success/5">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <span className="text-3xl">✉️</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-800 mb-3">
            想獲得更多文案技巧與 AI 應用秘技嗎？
          </h3>
          <p className="text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            訂閱 <span className="font-semibold text-primary">Vista 電子報</span>，每週收到實戰文案技巧、案例分析與內容行銷洞察。
            <br />
            <span className="text-sm text-neutral-500 mt-2 inline-block">已有超過 15,500 位行銷人與創作者訂閱</span>
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-primary/20">
            <div className="flex items-start gap-3 mb-4 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span>每週精選文案技巧</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span>實戰案例分析</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span>隨時可取消</span>
              </div>
            </div>

            <iframe
              src="https://iamvista.substack.com/embed"
              width="100%"
              height="320"
              style={{ border: 'none', background: 'transparent' }}
              frameBorder="0"
              scrolling="no"
              title="Vista 電子報訂閱"
            ></iframe>
          </div>
        </div>

        <p className="text-center text-xs text-neutral-500 mt-6">
          🔒 我們重視你的隱私，絕不會將你的資料分享給第三方
        </p>
      </div>

      {/* Actions */}
      <div className="card-section border-l-info bg-neutral-100">
        <div className="flex flex-wrap gap-4 justify-center">
          <button onClick={onReset} className="btn-primary">
            🔍 重新分析
          </button>
          <button
            onClick={() => exportToMarkdown(result)}
            className="btn-secondary"
          >
            📄 匯出 Markdown
          </button>
          <button
            onClick={exportToPDF}
            className="btn-secondary"
          >
            📑 匯出 PDF
          </button>
        </div>
      </div>
    </div>
  )
}
