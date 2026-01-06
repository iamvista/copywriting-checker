import { FC, useState } from 'react'
import { Header } from './components/layout/Header'
import { Hero } from './components/layout/Hero'
import { AnalyzerPanel } from './components/analyzer/AnalyzerPanel'
import { ResultPanel } from './components/analyzer/ResultPanel'
import { AnalysisResult } from './types/analyzer.types'

const App: FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result)
  }

  const handleReset = () => {
    setAnalysisResult(null)
  }

  return (
    <div className="min-h-screen">
      <Header onReset={handleReset} />

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

      <footer className="bg-neutral-charcoal text-neutral-sand py-8 mt-16 border-t-4 border-primary">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm mb-2">
            Powered by <a href="https://www.empower.tw" target="_blank" rel="noopener noreferrer" className="text-primary-light hover:text-primary font-semibold transition-colors">Vista Cheng</a>
          </p>
          <p className="text-xs text-neutral-stone">
            ©2026 Vista Cheng. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
