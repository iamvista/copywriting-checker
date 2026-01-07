import { FC, useState, useEffect } from 'react'
import { AnalysisResult } from '@/types/analyzer.types'
import { getHistory, deleteHistoryItem, clearHistory, HistoryItem } from '@/utils/historyManager'

interface HistoryPanelProps {
  onSelectHistory: (result: AnalysisResult) => void
}

export const HistoryPanel: FC<HistoryPanelProps> = ({ onSelectHistory }) => {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [showConfirmClear, setShowConfirmClear] = useState(false)

  // 載入歷史記錄
  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    setHistory(getHistory())
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation() // 防止觸發選擇事件
    deleteHistoryItem(id)
    loadHistory()
  }

  const handleClearAll = () => {
    clearHistory()
    loadHistory()
    setShowConfirmClear(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50'
    if (score >= 60) return 'text-yellow-600 bg-yellow-50'
    if (score >= 40) return 'text-orange-600 bg-orange-50'
    return 'text-red-600 bg-red-50'
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { emoji: '🏆', label: '優秀' }
    if (score >= 60) return { emoji: '👍', label: '良好' }
    if (score >= 40) return { emoji: '⚠️', label: '待改進' }
    return { emoji: '🚨', label: '需重寫' }
  }

  if (history.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-bold text-neutral-700 mb-2">尚無歷史記錄</h3>
        <p className="text-neutral-600">
          開始分析您的文案，系統會自動儲存最近 10 筆記錄
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-800">
          📊 分析歷史記錄
          <span className="text-sm font-normal text-neutral-600 ml-3">
            （共 {history.length} 筆）
          </span>
        </h2>
        <button
          onClick={() => setShowConfirmClear(true)}
          className="text-sm text-red-600 hover:text-red-700 hover:underline transition-colors"
        >
          🗑️ 清除全部
        </button>
      </div>

      {showConfirmClear && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-semibold mb-3">
            確定要清除所有歷史記錄嗎？此操作無法復原。
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleClearAll}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              確認清除
            </button>
            <button
              onClick={() => setShowConfirmClear(false)}
              className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
            >
              取消
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {history.map((item) => {
          const badge = getScoreBadge(item.result.totalScore)
          const previewText =
            item.result.analyzedText.length > 80
              ? item.result.analyzedText.substring(0, 80) + '⋯⋯'
              : item.result.analyzedText

          return (
            <div
              key={item.id}
              onClick={() => onSelectHistory(item.result)}
              className="card hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-4">
                {/* 左側：分數與等級 */}
                <div className="flex-shrink-0">
                  <div className={`text-center px-4 py-3 rounded-lg ${getScoreColor(item.result.totalScore)}`}>
                    <div className="text-3xl font-bold">{item.result.totalScore}</div>
                    <div className="text-xs mt-1">
                      {badge.emoji} {badge.label}
                    </div>
                  </div>
                </div>

                {/* 中間：文案預覽 */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-600 mb-2">
                    {new Date(item.savedAt).toLocaleString('zh-TW', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p className="text-neutral-800 line-clamp-2 group-hover:text-primary transition-colors">
                    {previewText}
                  </p>

                  {/* 各維度迷你評分 */}
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <span className="text-xs bg-neutral-100 px-2 py-1 rounded">
                      FAB: {item.result.dimensions.fab.score}/25
                    </span>
                    <span className="text-xs bg-neutral-100 px-2 py-1 rounded">
                      標題: {item.result.dimensions.titleAppeal.score}/20
                    </span>
                    <span className="text-xs bg-neutral-100 px-2 py-1 rounded">
                      洞察: {item.result.dimensions.consumerInsight.score}/20
                    </span>
                    <span className="text-xs bg-neutral-100 px-2 py-1 rounded">
                      CTA: {item.result.dimensions.callToAction.score}/15
                    </span>
                  </div>
                </div>

                {/* 右側：刪除按鈕 */}
                <button
                  onClick={(e) => handleDelete(item.id, e)}
                  className="flex-shrink-0 text-neutral-400 hover:text-red-600 transition-colors p-2"
                  title="刪除此記錄"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        💡 <strong>提示</strong>：點擊任一記錄即可查看完整分析報告
      </div>
    </div>
  )
}
