import { AnalysisResult } from '@/types/analyzer.types'

/**
 * 生成分享文字內容
 */
export function generateShareText(result: AnalysisResult): string {
  const { totalScore, grade } = result

  const gradeEmoji = {
    excellent: '🏆',
    good: '👍',
    needsImprovement: '⚠️',
    needsRewrite: '🚨',
  }

  const emoji = gradeEmoji[grade]

  return `我的文案獲得 ${totalScore} 分 ${emoji}\n\n使用 Vista 文案健檢工具，立即分析你的文案品質！`
}

/**
 * 複製文字到剪貼簿
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      const success = document.execCommand('copy')
      document.body.removeChild(textarea)
      return success
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}

/**
 * 生成分享連結
 */
export function getShareUrl(): string {
  return window.location.origin
}

/**
 * 生成 Facebook 分享連結
 */
export function getFacebookShareUrl(): string {
  const url = getShareUrl()
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
}

/**
 * 生成 Twitter 分享連結
 */
export function getTwitterShareUrl(text: string): string {
  const url = getShareUrl()
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
}

/**
 * 生成 LINE 分享連結
 */
export function getLineShareUrl(text: string): string {
  const message = `${text}\n${getShareUrl()}`
  return `https://line.me/R/msg/text/?${encodeURIComponent(message)}`
}

/**
 * 生成 Threads 分享連結
 */
export function getThreadsShareUrl(text: string): string {
  const message = `${text}\n${getShareUrl()}`
  return `https://www.threads.net/intent/post?text=${encodeURIComponent(message)}`
}
