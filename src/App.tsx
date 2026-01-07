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
import { Privacy } from './pages/Privacy'
import { FAQ } from './pages/FAQ'
import { AnalysisResult } from './types/analyzer.types'
import { initUTMTracking } from './utils/utmTracking'
import { trackMetaPageView } from './utils/metaPixel'

const App: FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  // 初始化追蹤
  useEffect(() => {
    // UTM 參數追蹤
    initUTMTracking()

    // Meta Pixel PageView
    trackMetaPageView()
  }, [])

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result)
  }

  const handleReset = () => {
    setAnalysisResult(null)
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
          <ResultPanel result={analysisResult} onReset={handleReset} />
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
      <Header onReset={handleReset} />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faq" element={<FAQ />} />
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
    </div>
  )
}

export default App
