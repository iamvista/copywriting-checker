/**
 * UTM 參數追蹤工具
 * 用於追蹤流量來源、廣告活動效果
 */

export interface UTMParams {
  utm_source?: string // 流量來源（如 facebook, google, email）
  utm_medium?: string // 媒介（如 cpc, social, email）
  utm_campaign?: string // 活動名稱
  utm_term?: string // 關鍵字（付費搜尋）
  utm_content?: string // 內容差異（A/B 測試）
}

/**
 * 從 URL 解析 UTM 參數
 */
export function parseUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {}

  const urlParams = new URLSearchParams(window.location.search)
  const utmParams: UTMParams = {}

  // 讀取所有 UTM 參數
  const utmKeys: (keyof UTMParams)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ]

  utmKeys.forEach((key) => {
    const value = urlParams.get(key)
    if (value) {
      utmParams[key] = value
    }
  })

  return utmParams
}

/**
 * 儲存 UTM 參數到 localStorage
 * 保存 30 天，用於追蹤使用者來源
 */
export function saveUTMParams(utmParams: UTMParams): void {
  if (typeof window === 'undefined') return
  if (Object.keys(utmParams).length === 0) return

  const data = {
    params: utmParams,
    timestamp: Date.now(),
  }

  try {
    localStorage.setItem('utm_params', JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save UTM params:', error)
  }
}

/**
 * 從 localStorage 讀取 UTM 參數
 */
export function getStoredUTMParams(): UTMParams | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem('utm_params')
    if (!stored) return null

    const data = JSON.parse(stored)
    const age = Date.now() - data.timestamp
    const maxAge = 30 * 24 * 60 * 60 * 1000 // 30 天

    // 如果超過 30 天，清除舊資料
    if (age > maxAge) {
      localStorage.removeItem('utm_params')
      return null
    }

    return data.params
  } catch (error) {
    console.error('Failed to get stored UTM params:', error)
    return null
  }
}

/**
 * 初始化 UTM 追蹤
 * 在 App 載入時呼叫
 */
export function initUTMTracking(): void {
  const utmParams = parseUTMParams()
  if (Object.keys(utmParams).length > 0) {
    saveUTMParams(utmParams)
    console.log('UTM params tracked:', utmParams)
  }
}

/**
 * 取得完整的追蹤資訊（含 UTM）
 * 用於發送到 GA4 或後端 API
 */
export function getTrackingData(): {
  utm: UTMParams | null
  referrer: string
  landingPage: string
} {
  if (typeof window === 'undefined') {
    return {
      utm: null,
      referrer: '',
      landingPage: '',
    }
  }

  return {
    utm: getStoredUTMParams(),
    referrer: document.referrer,
    landingPage: window.location.pathname + window.location.search,
  }
}

/**
 * 生成帶 UTM 參數的 URL
 * 用於生成追蹤連結
 */
export function generateUTMUrl(
  baseUrl: string,
  utmParams: {
    source: string
    medium: string
    campaign: string
    term?: string
    content?: string
  }
): string {
  const url = new URL(baseUrl)

  url.searchParams.set('utm_source', utmParams.source)
  url.searchParams.set('utm_medium', utmParams.medium)
  url.searchParams.set('utm_campaign', utmParams.campaign)

  if (utmParams.term) {
    url.searchParams.set('utm_term', utmParams.term)
  }
  if (utmParams.content) {
    url.searchParams.set('utm_content', utmParams.content)
  }

  return url.toString()
}
