import { FC, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Hero } from './components/layout/Hero'
import { AnalyzerPanel } from './components/analyzer/AnalyzerPanel'
import { ResultPanel } from './components/analyzer/ResultPanel'
import { Privacy } from './pages/Privacy'
import { FAQ } from './pages/FAQ'
import { AnalysisResult } from './types/analyzer.types'

const App: FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result)
  }

  const handleReset = () => {
    setAnalysisResult(null)
  }

  const HomePage = () => (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {!analysisResult ? (
        <>
          <Hero />
          <AnalyzerPanel onAnalysisComplete={handleAnalysisComplete} />
        </>
      ) : (
        <ResultPanel result={analysisResult} onReset={handleReset} />
      )}
    </main>
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
