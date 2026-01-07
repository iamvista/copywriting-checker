import { useEffect, useState } from 'react'

/**
 * Exit Intent Hook
 * 偵測使用者準備離開頁面的意圖
 */
export function useExitIntent(enabled: boolean = true): boolean {
  const [showExitIntent, setShowExitIntent] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    if (!enabled || hasTriggered) return

    const handleMouseLeave = (e: MouseEvent) => {
      // 檢查滑鼠是否移出視窗頂部
      if (e.clientY <= 0) {
        setShowExitIntent(true)
        setHasTriggered(true)
      }
    }

    // 延遲 5 秒後才開始監聽（避免誤觸發）
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 5000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [enabled, hasTriggered])

  return showExitIntent
}

/**
 * 檢查使用者是否已經留下 Email
 */
export function hasUserProvidedEmail(): boolean {
  if (typeof window === 'undefined') return false

  try {
    const emails = localStorage.getItem('collected_emails')
    if (!emails) return false

    const emailList = JSON.parse(emails)
    return emailList.length > 0
  } catch {
    return false
  }
}

/**
 * 取得使用者的 Email（如果已提供）
 */
export function getUserEmail(): string | null {
  if (typeof window === 'undefined') return null

  try {
    const emails = localStorage.getItem('collected_emails')
    if (!emails) return null

    const emailList = JSON.parse(emails)
    if (emailList.length === 0) return null

    // 返回最新的 Email
    return emailList[emailList.length - 1].email
  } catch {
    return null
  }
}
