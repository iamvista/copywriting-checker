import { FC, useState, useEffect } from 'react'
import { AnalysisResult } from '@/types/analyzer.types'
import { analyzeCopywriting } from '@/services/analyzer'
import { EXAMPLE_COPIES, MAX_TEXT_LENGTH, MIN_TEXT_LENGTH } from '@/utils/constants'
import { trackAnalysisComplete } from '@/utils/analytics'
import { saveToHistory } from '@/utils/historyManager'

interface AnalyzerPanelProps {
  onAnalysisComplete: (result: AnalysisResult) => void
}

const ANALYSIS_STEPS = [
  '解析文案結構...',
  '評估標題吸引力...',
  '分析消費者洞察...',
  '檢查行動呼籲...',
  '計算可讀性分數...',
  '生成改善建議...',
]

export const AnalyzerPanel: FC<AnalyzerPanelProps> = ({ onAnalysisComplete }) => {
  const [text, setText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  // 模擬分析進度
  useEffect(() => {
    if (!isAnalyzing) {
      setProgress(0)
      setCurrentStep(0)
      return
    }

    const stepDuration = 800 // 每個步驟 800ms
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev
        return prev + 5
      })
    }, stepDuration / 20)

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= ANALYSIS_STEPS.length - 1) return prev
        return prev + 1
      })
    }, stepDuration)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
    }
  }, [isAnalyzing])

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

      // 儲存到歷史記錄
      saveToHistory(result)

      onAnalysisComplete(result)
    } catch (err) {
      console.error('Analysis error:', err)

      // 更詳細的錯誤訊息
      if (!navigator.onLine) {
        setError('❌ 網路連線中斷，請檢查您的網路連線後重試')
      } else if (err instanceof Error) {
        if (err.message.includes('timeout')) {
          setError('⏱️ 分析逾時，請稍後再試或嘗試分析較短的文案')
        } else if (err.message.includes('API') || err.message.includes('401') || err.message.includes('403')) {
          setError('🔑 API 認證失敗，請聯繫技術支援')
        } else {
          setError(`⚠️ 分析遇到問題：${err.message}`)
        }
      } else {
        setError('❌ 分析遇到未知問題，請重試或聯繫技術支援')
      }
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
        <div className="bg-red-50 border-2 border-red-200 rounded-lg mb-4 p-4">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-red-800 font-semibold mb-2">{error}</p>
              <p className="text-sm text-red-600">
                若問題持續發生，請聯繫技術支援：
                <a href="mailto:iamvista@gmail.com" className="underline ml-1">
                  iamvista@gmail.com
                </a>
              </p>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={charCount < MIN_TEXT_LENGTH || charCount > MAX_TEXT_LENGTH}
              className="btn-secondary text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🔄 重試
            </button>
          </div>
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
        <div className="mt-6 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-primary">分析進度</span>
              <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary to-primary-dark h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            {ANALYSIS_STEPS.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                  index <= currentStep ? 'opacity-100' : 'opacity-30'
                }`}
              >
                {index < currentStep ? (
                  <span className="text-green-500 text-lg">✓</span>
                ) : index === currentStep ? (
                  <span className="text-primary animate-pulse text-lg">●</span>
                ) : (
                  <span className="text-neutral-400 text-lg">○</span>
                )}
                <span className={index <= currentStep ? 'text-neutral-800 font-medium' : 'text-neutral-500'}>
                  {step}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-neutral-600 mt-4 text-center">
            分析需要約 5-10 秒，請稍候...
          </p>
        </div>
      )}
    </div>
  )
}
