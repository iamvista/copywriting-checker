/**
 * Meta Pixel (Facebook Pixel) 追蹤工具
 * 用於再行銷廣告和轉換追蹤
 */

// Meta Pixel 類型定義
declare global {
  interface Window {
    fbq: any
    _fbq: any
  }
}

/**
 * 初始化 Meta Pixel
 * 在 index.html 中已經載入 Meta Pixel 基礎程式碼
 */
export function initMetaPixel(pixelId: string): void {
  if (typeof window === 'undefined') return

  // 檢查是否已經初始化
  if (window.fbq) return

  // 初始化 fbq
  const fbq: any = function (...args: any[]) {
    if (fbq.callMethod) {
      fbq.callMethod.apply(fbq, args)
    } else {
      fbq.queue.push(args)
    }
  }

  if (!window.fbq) {
    window.fbq = fbq
  }
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []

  // 載入 Meta Pixel 腳本
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)

  // 初始化 Pixel
  window.fbq('init', pixelId)
}

/**
 * 追蹤頁面瀏覽
 */
export function trackMetaPageView(): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView')
  }
}

/**
 * 追蹤查看內容（查看分析結果）
 */
export function trackMetaViewContent(params: {
  content_name: string
  content_category?: string
  value?: number
}): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', params)
  }
}

/**
 * 追蹤潛在客戶（留下 Email）
 */
export function trackMetaLead(params?: {
  content_name?: string
  value?: number
}): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', params || {})
  }
}

/**
 * 追蹤自訂轉換事件
 */
export function trackMetaCustomEvent(eventName: string, params?: Record<string, any>): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, params || {})
  }
}

/**
 * 追蹤點擊課程連結
 */
export function trackMetaCourseClick(params: {
  course_name: string
  course_type: 'free' | 'paid' | 'premium'
  user_score: number
}): void {
  trackMetaCustomEvent('CourseClick', params)
}

/**
 * 追蹤 PDF 下載
 */
export function trackMetaPDFDownload(params: {
  content_name: string
  score: number
}): void {
  trackMetaCustomEvent('PDFDownload', params)
}

/**
 * 追蹤分享行為
 */
export function trackMetaShare(params: {
  method: string
  content_type: string
  score: number
}): void {
  trackMetaCustomEvent('Share', params)
}
