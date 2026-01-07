import { FC, useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Hero } from './components/layout/Hero'
import { SocialProof } from './components/layout/SocialProof'
import { Testimonials } from './components/layout/Testimonials'
import { BeforeAfter } from './components/layout/BeforeAfter'
import { AnalyzerPanel } from './components/analyzer/AnalyzerPanel'
import { ResultPanel } from './components/analyzer/ResultPanel'
import { HistoryPanel } from './components/history/HistoryPanel'
import { ScoreTrendChart } from './components/history/ScoreTrendChart'
import { EmailCollector } from './components/email/EmailCollector'
import { Privacy } from './pages/Privacy'
import { FAQ } from './pages/FAQ'
import { Admin } from './pages/Admin'
import { AnalysisResult } from './types/analyzer.types'
import { initUTMTracking } from './utils/utmTracking'
import { trackMetaPageView } from './utils/metaPixel'
import { useExitIntent, hasUserProvidedEmail } from './hooks/useExitIntent'

const App: FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [showEmailCollector, setShowEmailCollector] = useState(false)
  const [emailCollectorType, setEmailCollectorType] = useState<'exit' | 'pdf'>('exit')

  // Exit Intent 偵測（僅在首頁且未提供 Email 時啟用）
  const showExitIntent = useExitIntent(!analysisResult && !hasUserProvidedEmail())

  // 初始化追蹤
  useEffect(() => {
    // UTM 參數追蹤
    initUTMTracking()

    // Meta Pixel PageView
    trackMetaPageView()
  }, [])

  // Exit Intent 觸發
  useEffect(() => {
    if (showExitIntent && !hasUserProvidedEmail()) {
      setEmailCollectorType('exit')
      setShowEmailCollector(true)
    }
  }, [showExitIntent])

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result)
  }

  const handleReset = () => {
    setAnalysisResult(null)
  }

  const handleEmailSubmit = (email: string) => {
    console.log('Email collected:', email)
    // 不要在這裡關閉彈窗！讓 EmailCollector 顯示成功畫面
    // EmailCollector 會顯示成功畫面 + 下載按鈕
  }

  const handleEmailCollectorClose = () => {
    setShowEmailCollector(false)
  }

  // 主動請求 PDF 下載
  const handleRequestPDF = () => {
    setEmailCollectorType('pdf')
    setShowEmailCollector(true)
  }

  const HomePage = () => (
    <>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {!analysisResult ? (
          <>
            <Hero />

            {/* 社會證明 - 建立信任感 */}
            <div className="mt-12 mb-12">
              <SocialProof />
            </div>

            <AnalyzerPanel onAnalysisComplete={handleAnalysisComplete} />

            {/* 分數趨勢圖表 */}
            <div className="mt-16">
              <ScoreTrendChart />
            </div>

            {/* 歷史記錄面板 */}
            <div className="mt-8">
              <HistoryPanel onSelectHistory={setAnalysisResult} />
            </div>
          </>
        ) : (
          <ResultPanel result={analysisResult} onReset={handleReset} onRequestPDF={handleRequestPDF} />
        )}
      </main>
      {!analysisResult && (
        <>
          <BeforeAfter />
          {/* 使用者評價 */}
          <div className="container mx-auto px-4 py-8 max-w-6xl mt-8">
            <Testimonials />
          </div>
        </>
      )}
    </>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header onReset={handleReset} onRequestPDF={handleRequestPDF} />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

      <footer className="bg-neutral-charcoal text-neutral-sand py-8 mt-16 border-t-4 border-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm mb-2">
                Powered by <a href="https://www.vista.tw" target="_blank" rel="noopener noreferrer" className="text-primary-light hover:text-primary font-semibold transition-colors">Vista Cheng</a>
              </p>
              <p className="text-xs text-neutral-stone">
                ©2026 Vista Cheng. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <button
                onClick={handleRequestPDF}
                className="text-primary-light hover:text-primary font-semibold transition-colors flex items-center gap-1"
              >
                <span>📥</span>
                <span>免費下載檢查表</span>
              </button>
              <Link to="/privacy" className="text-neutral-sand hover:text-primary-light transition-colors">
                隱私權政策
              </Link>
              <Link to="/faq" className="text-neutral-sand hover:text-primary-light transition-colors">
                常見問題
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Email Collector 彈窗 */}
      {showEmailCollector && (
        <EmailCollector
          trigger={emailCollectorType === 'exit' ? 'exit_intent' : 'pdf_download'}
          score={analysisResult?.totalScore}
          onEmailSubmit={handleEmailSubmit}
          onClose={handleEmailCollectorClose}
          title={
            emailCollectorType === 'exit'
              ? '等等！別急著離開 👋'
              : '下載完整報告'
          }
          description={
            emailCollectorType === 'exit'
              ? '留下您的 E-mail，我們將定期分享實用的文案技巧與案例，幫助您持續精進文案能力！'
              : '輸入您的 E-mail，立即下載包含詳細分析與改善建議的 PDF 完整報告。'
          }
          incentive={
            emailCollectorType === 'exit'
              ? '「Vista 文案黃金公式 - 快速檢查表」20 個發文前必檢項目，3 分鐘避免 80% 常見錯誤'
              : '「Vista 文案轉換優化模型」完整版 PDF - 8 大策略模組專業診斷框架'
          }
        />
      )}
    </div>
  )
}

export default App
