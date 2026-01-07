import { FC, useState } from 'react'
import { AnalysisResult } from '@/types/analyzer.types'
import { analyzeCopywriting } from '@/services/analyzer'
import { EXAMPLE_COPIES, MAX_TEXT_LENGTH, MIN_TEXT_LENGTH } from '@/utils/constants'
import { trackAnalysisComplete } from '@/utils/analytics'

interface AnalyzerPanelProps {
  onAnalysisComplete: (result: AnalysisResult) => void
}

export const AnalyzerPanel: FC<AnalyzerPanelProps> = ({ onAnalysisComplete }) => {
  const [text, setText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (text.length < MIN_TEXT_LENGTH) {
      setError(`文案至少需要 ${MIN_TEXT_LENGTH} 字才能進行完整分析喔！`)
      return
    }

    if (text.length > MAX_TEXT_LENGTH) {
      setError(`文案長度不能超過 ${MAX_TEXT_LENGTH} 字`)
      return
    }

    setError(null)
    setIsAnalyzing(true)

    try {
      const result = await analyzeCopywriting(text)

      // GA4 事件追蹤：分析完成
      trackAnalysisComplete({
        totalScore: result.totalScore,
        fabScore: result.dimensions.fab.score,
        titleScore: result.dimensions.titleAppeal.score,
        consumerInsightScore: result.dimensions.consumerInsight.score,
        ctaScore: result.dimensions.callToAction.score,
        readabilityScore: result.dimensions.readability.score,
        valuePropositionScore: result.dimensions.valueProposition.score,
        grade: result.grade,
        textLength: text.length,
      })

      onAnalysisComplete(result)
    } catch (err) {
      setError('分析遇到問題，請稍後再試')
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleUseExample = () => {
    const randomExample = EXAMPLE_COPIES[Math.floor(Math.random() * EXAMPLE_COPIES.length)]
    setText(randomExample)
    setError(null)
  }

  const handleClear = () => {
    setText('')
    setError(null)
  }

  const charCount = text.length

  return (
    <div className="card">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">輸入您的文案</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="在此貼上您的文案標題或內容..."
        className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none resize-none text-base"
        disabled={isAnalyzing}
      />

      <div className="flex items-center justify-between mt-2 mb-4">
        <span className={`text-sm ${charCount > MAX_TEXT_LENGTH ? 'text-red-500' : 'text-gray-600'}`}>
          字數: {charCount} / {MAX_TEXT_LENGTH}
        </span>
        {charCount < MIN_TEXT_LENGTH && charCount > 0 && (
          <span className="text-sm text-orange-500">還需要 {MIN_TEXT_LENGTH - charCount} 字</span>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || charCount < MIN_TEXT_LENGTH || charCount > MAX_TEXT_LENGTH}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <span className="animate-spin">⏳</span>
              <span>分析中...</span>
            </>
          ) : (
            <>
              <span>🔍</span>
              <span>開始健檢</span>
            </>
          )}
        </button>

        <button
          onClick={handleUseExample}
          disabled={isAnalyzing}
          className="btn-secondary disabled:opacity-50"
        >
          試試範例文案
        </button>

        <button
          onClick={handleClear}
          disabled={isAnalyzing || !text}
          className="btn-secondary disabled:opacity-50"
        >
          清除
        </button>
      </div>

      {isAnalyzing && (
        <p className="text-sm text-gray-600 mt-4">
          分析需要約 5-10 秒，請稍候...
        </p>
      )}
    </div>
  )
}
