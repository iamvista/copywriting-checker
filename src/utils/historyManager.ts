import { AnalysisResult } from '@/types/analyzer.types'

const HISTORY_KEY = 'vista_copywriting_history'
const MAX_HISTORY_ITEMS = 10

export interface HistoryItem {
  id: string
  result: AnalysisResult
  savedAt: number
}

/**
 * 儲存分析結果到歷史記錄
 */
export function saveToHistory(result: AnalysisResult): void {
  try {
    const history = getHistory()

    const newItem: HistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      result,
      savedAt: Date.now(),
    }

    // 新增到開頭
    history.unshift(newItem)

    // 限制最多保留項目數
    const limitedHistory = history.slice(0, MAX_HISTORY_ITEMS)

    localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory))
  } catch (error) {
    console.error('Failed to save to history:', error)
  }
}

/**
 * 取得所有歷史記錄
 */
export function getHistory(): HistoryItem[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY)
    if (!data) return []

    const history = JSON.parse(data) as HistoryItem[]
    return Array.isArray(history) ? history : []
  } catch (error) {
    console.error('Failed to get history:', error)
    return []
  }
}

/**
 * 取得特定歷史記錄
 */
export function getHistoryItem(id: string): HistoryItem | null {
  const history = getHistory()
  return history.find(item => item.id === id) || null
}

/**
 * 刪除特定歷史記錄
 */
export function deleteHistoryItem(id: string): void {
  try {
    const history = getHistory()
    const filtered = history.filter(item => item.id !== id)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Failed to delete history item:', error)
  }
}

/**
 * 清除所有歷史記錄
 */
export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY)
  } catch (error) {
    console.error('Failed to clear history:', error)
  }
}

/**
 * 計算分數趨勢（用於趨勢圖表）
 */
export function getScoreTrend(): Array<{ date: string; score: number }> {
  const history = getHistory()

  return history
    .slice()
    .reverse() // 從最舊到最新
    .map(item => ({
      date: new Date(item.savedAt).toLocaleDateString('zh-TW', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      score: item.result.totalScore,
    }))
}

/**
 * 計算平均分數
 */
export function getAverageScore(): number {
  const history = getHistory()
  if (history.length === 0) return 0

  const total = history.reduce((sum, item) => sum + item.result.totalScore, 0)
  return Math.round(total / history.length)
}

/**
 * 取得最高分
 */
export function getHighestScore(): number {
  const history = getHistory()
  if (history.length === 0) return 0

  return Math.max(...history.map(item => item.result.totalScore))
}

/**
 * 計算進步幅度（與上一次比較）
 */
export function getImprovement(currentScore: number): number | null {
  const history = getHistory()
  if (history.length === 0) return null

  const previousScore = history[0].result.totalScore
  return currentScore - previousScore
}
