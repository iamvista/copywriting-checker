/**
 * 下載連結設定
 * 請將您的雲端下載連結填入這裡
 */

export const DOWNLOAD_LINKS = {
  // Exit Intent 贈品：Vista 文案黃金公式檢查表 PDF
  EXIT_INTENT_PDF: 'https://your-cloud-storage.com/vista-copywriting-checklist.pdf',

  // PDF 下載贈品：完整分析報告 + 改寫範例
  FULL_REPORT_PDF: 'https://your-cloud-storage.com/vista-full-report-template.pdf',

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
