/**
 * 下載連結設定
 * 請將您的雲端下載連結填入這裡
 */

export const DOWNLOAD_LINKS = {
  // Exit Intent 贈品：Vista 文案快速檢查表（簡化版，降低門檻）
  EXIT_INTENT_PDF: 'https://copywriting.vista.tw/Vista文案快速檢查表.pdf',

  // PDF 下載贈品：Vista 文案轉換優化模型（完整版專業框架）
  FULL_REPORT_PDF: 'https://app.box.com/s/ciatg4u2d0pae9jcnzden4ko8eqz52oz',

  // 其他資源
  WEEKLY_TIPS_SUBSCRIBE: 'https://iamvista.substack.com/',
}

/**
 * 取得下載連結
 */
export function getDownloadLink(type: 'exit_intent' | 'pdf_download'): string {
  switch (type) {
    case 'exit_intent':
      return DOWNLOAD_LINKS.EXIT_INTENT_PDF
    case 'pdf_download':
      return DOWNLOAD_LINKS.FULL_REPORT_PDF
    default:
      return DOWNLOAD_LINKS.EXIT_INTENT_PDF
  }
}
