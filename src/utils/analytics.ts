/**
 * 多平台事件追蹤工具
 * 整合 GA4 和 Meta Pixel
 */

import {
  trackMetaViewContent,
  trackMetaLead,
  trackMetaCourseClick,
  trackMetaPDFDownload,
  trackMetaShare,
} from './metaPixel'

// 聲明 gtag 全局函數類型
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetId: string,
      params?: Record<string, any>
    ) => void
    dataLayer?: any[]
  }
}

/**
 * 檢查 GA4 是否已載入
 */
function isGALoaded(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

/**
 * 追蹤分析完成事件
 */
export function trackAnalysisComplete(data: {
  totalScore: number
  fabScore: number
  titleScore: number
  consumerInsightScore: number
  ctaScore: number
  readabilityScore: number
  valuePropositionScore: number
  grade: string
  textLength: number
}) {
  // GA4 追蹤
  if (isGALoaded()) {
    window.gtag!('event', 'analysis_complete', {
      event_category: 'Analysis',
      event_label: 'Copywriting Analysis',
      total_score: data.totalScore,
      fab_score: data.fabScore,
      title_score: data.titleScore,
      consumer_insight_score: data.consumerInsightScore,
      cta_score: data.ctaScore,
      readability_score: data.readabilityScore,
      value_proposition_score: data.valuePropositionScore,
      grade: data.grade,
      text_length: data.textLength,
    })
    console.log('📊 GA4 Event: analysis_complete', data)
  }

  // Meta Pixel 追蹤
  trackMetaViewContent({
    content_name: 'Analysis Result',
    content_category: 'Copywriting Score',
    value: data.totalScore,
  })
}

/**
 * 追蹤免費課程 CTA 點擊（< 35 分）
 */
export function trackFreeCourseCTA(score: number) {
  // GA4 追蹤
  if (isGALoaded()) {
    window.gtag!('event', 'free_course_click', {
      event_category: 'CTA',
      event_label: 'Free Skool Course',
      score: score,
      score_range: 'below_35',
    })
    console.log('📊 GA4 Event: free_course_click', { score })
  }

  // Meta Pixel 追蹤
  trackMetaCourseClick({
    course_name: 'Free Skool Course',
    course_type: 'free',
    user_score: score,
  })
}

/**
 * 追蹤付費課程 CTA 點擊（35-59 分）
 */
export function trackPaidCourseCTA(score: number) {
  // GA4 追蹤
  if (isGALoaded()) {
    window.gtag!('event', 'paid_course_click', {
      event_category: 'CTA',
      event_label: 'Brand Story Course (Worker360)',
      score: score,
      score_range: '35_to_59',
      value: 1800, // 課程價格
    })
    console.log('📊 GA4 Event: paid_course_click', { score })
  }

  // Meta Pixel 追蹤
  trackMetaCourseClick({
    course_name: 'Brand Story Course',
    course_type: 'paid',
    user_score: score,
  })
}

/**
 * 追蹤寫作陪伴計畫 Email 點擊（>= 60 分）
 */
export function trackWritingProgramEmail(score: number) {
  // GA4 追蹤
  if (isGALoaded()) {
    window.gtag!('event', 'writing_program_email', {
      event_category: 'CTA',
      event_label: 'Vista Writing Accompaniment Program',
      score: score,
      score_range: 'above_60',
    })
    console.log('📊 GA4 Event: writing_program_email', { score })
  }

  // Meta Pixel 追蹤（視為潛在客戶）
  trackMetaLead({
    content_name: 'Vista Writing Program',
    value: score,
  })
}

/**
 * 追蹤社群分享
 */
export function trackSocialShare(platform: 'facebook' | 'twitter' | 'line' | 'threads' | 'copy', score: number) {
  // GA4 追蹤
  if (isGALoaded()) {
    window.gtag!('event', 'share', {
      event_category: 'Social',
      event_label: `Share to ${platform}`,
      method: platform,
      score: score,
    })
    console.log('📊 GA4 Event: share', { platform, score })
  }

  // Meta Pixel 追蹤
  trackMetaShare({
    method: platform,
    content_type: 'analysis_result',
    score: score,
  })
}

/**
 * 追蹤 Substack 訂閱互動
 */
export function trackSubscribeInteraction() {
  if (!isGALoaded()) return

  window.gtag!('event', 'subscribe_interaction', {
    event_category: 'Newsletter',
    event_label: 'Substack Subscribe Form',
  })

  console.log('📊 GA4 Event: subscribe_interaction')
}

/**
 * 追蹤 PDF 匯出
 */
export function trackPDFExport(score: number) {
  // GA4 追蹤
  if (isGALoaded()) {
    window.gtag!('event', 'pdf_export', {
      event_category: 'Export',
      event_label: 'Export to PDF',
      score: score,
    })
    console.log('📊 GA4 Event: pdf_export', { score })
  }

  // Meta Pixel 追蹤
  trackMetaPDFDownload({
    content_name: 'Analysis Report PDF',
    score: score,
  })
}

/**
 * 追蹤 Markdown 匯出
 */
export function trackMarkdownExport(score: number) {
  if (!isGALoaded()) return

  window.gtag!('event', 'markdown_export', {
    event_category: 'Export',
    event_label: 'Export to Markdown',
    score: score,
  })

  console.log('📊 GA4 Event: markdown_export', { score })
}

/**
 * 追蹤重新分析
 */
export function trackReanalyze() {
  if (!isGALoaded()) return

  window.gtag!('event', 'reanalyze', {
    event_category: 'User Action',
    event_label: 'New Analysis',
  })

  console.log('📊 GA4 Event: reanalyze')
}
