import { AnalysisResult } from '@/types/analyzer.types'
import { trackPDFExport, trackMarkdownExport } from '@/utils/analytics'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

/**
 * 匯出為 Markdown 格式
 */
export function exportToMarkdown(result: AnalysisResult): void {
  // GA4 事件追蹤：Markdown 匯出
  trackMarkdownExport(result.totalScore)

  const { totalScore, grade, summary, dimensions, analyzedText, timestamp } = result

  const gradeLabels = {
    excellent: '🏆 優秀',
    good: '👍 良好',
    needsImprovement: '⚠️ 待改進',
    needsRewrite: '🚨 需重寫',
  }

  const markdown = `# Vista 文案健檢報告

**生成時間：** ${new Date(timestamp).toLocaleString('zh-TW')}

---

## 📊 總體評分

**總分：** ${totalScore} / 100
**等級：** ${gradeLabels[grade]}

---

## 📝 分析的文案

\`\`\`
${analyzedText}
\`\`\`

---

## 📋 總結與建議

### 整體評價
${summary.overallAssessment}

### ✓ 優勢項目
${summary.strengths.map(s => `- ${s}`).join('\n')}

### ⚠️ 待改進項目
${summary.weaknesses.map(w => `- ${w}`).join('\n')}

### 🎯 優先改善建議
${summary.topPriorities.map((p, i) => `${i + 1}. ${p}`).join('\n')}

### 📈 預期效果
${summary.expectedImpact}

### 📚 Vista 文案學習資源
${summary.vistaRecommendation}

**學習資源：**
- 內容力線上課程：https://hahow.in/cr/content-power
- 文案力就是你的鈔能力：https://vista.im/copywriting-book
- 慢讀秒懂數位好文案：https://vista.im/writing-book
- 1分鐘驚豔ChatGPT爆款文案寫作聖經：https://vista.im/chatgpt-book
- ChatGPT 提問課：https://vista.im/ai-book
- Vista 相談室：https://www.empower.tw/p/consultation.html

---

## 📊 各維度詳細評分

### ⭐ FAB 法則 - ${dimensions.fab.score} 分

**評估回饋：**
${dimensions.fab.feedback.map(f => `- ${f}`).join('\n')}

${dimensions.fab.suggestions.length > 0 ? `**改善建議：**\n${dimensions.fab.suggestions.map(s => `- ${s}`).join('\n')}` : ''}

---

### ✨ 標題吸引力 - ${dimensions.titleAppeal.score} 分

**評估回饋：**
${dimensions.titleAppeal.feedback.map(f => `- ${f}`).join('\n')}

${dimensions.titleAppeal.suggestions.length > 0 ? `**改善建議：**\n${dimensions.titleAppeal.suggestions.map(s => `- ${s}`).join('\n')}` : ''}

---

### 🎯 消費者洞察 - ${dimensions.consumerInsight.score} 分

**評估回饋：**
${dimensions.consumerInsight.feedback.map(f => `- ${f}`).join('\n')}

${dimensions.consumerInsight.suggestions.length > 0 ? `**改善建議：**\n${dimensions.consumerInsight.suggestions.map(s => `- ${s}`).join('\n')}` : ''}

---

### 🚀 行動呼籲 - ${dimensions.callToAction.score} 分

**評估回饋：**
${dimensions.callToAction.feedback.map(f => `- ${f}`).join('\n')}

${dimensions.callToAction.suggestions.length > 0 ? `**改善建議：**\n${dimensions.callToAction.suggestions.map(s => `- ${s}`).join('\n')}` : ''}

---

### 📖 可讀性 - ${dimensions.readability.score} 分

**評估回饋：**
${dimensions.readability.feedback.map(f => `- ${f}`).join('\n')}

${dimensions.readability.suggestions.length > 0 ? `**改善建議：**\n${dimensions.readability.suggestions.map(s => `- ${s}`).join('\n')}` : ''}

---

### 💎 價值主張 - ${dimensions.valueProposition.score} 分

**評估回饋：**
${dimensions.valueProposition.feedback.map(f => `- ${f}`).join('\n')}

${dimensions.valueProposition.suggestions.length > 0 ? `**改善建議：**\n${dimensions.valueProposition.suggestions.map(s => `- ${s}`).join('\n')}` : ''}

---

## 📚 關於 Vista 文案健檢工具

本報告由 Vista 文案健檢工具自動生成，基於 Vista Cheng 的文案寫作方法論。

**核心原則：**
- FAB 法則：Feature（特性）+ Advantage（優勢）+ Benefit（效益）
- 以讀者為中心，不是寫自己想說的話
- Features tell, but benefits sell

**訂閱 Vista 電子報：** https://iamvista.substack.com/

---

*本報告生成於 ${new Date(timestamp).toLocaleString('zh-TW')}*
`

  // 創建下載連結
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `Vista文案健檢報告_${new Date().toISOString().split('T')[0]}.md`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * 匯出為 PDF 格式（使用截圖方式保留完整排版和中文）
 */
export async function exportToPDF(result: AnalysisResult): Promise<void> {
  try {
    // GA4 事件追蹤：PDF 匯出
    trackPDFExport(result.totalScore)

    // 尋找結果面板的 DOM 元素
    const resultElement = document.querySelector('[data-pdf-export]') as HTMLElement

    if (!resultElement) {
      console.error('找不到結果面板元素')
      alert('無法匯出 PDF，請重新整理頁面後再試')
      return
    }

    // 暫時顯示載入提示
    const loadingEl = document.createElement('div')
    loadingEl.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 24px 48px;
      border-radius: 12px;
      z-index: 9999;
      font-size: 18px;
      font-weight: bold;
    `
    loadingEl.textContent = '正在生成 PDF，請稍候...'
    document.body.appendChild(loadingEl)

    // 使用 html2canvas 截圖
    const canvas = await html2canvas(resultElement, {
      scale: 2, // 提高解析度
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    })

    // 移除載入提示
    document.body.removeChild(loadingEl)

    // 計算 PDF 尺寸
    const imgWidth = 210 // A4 寬度（mm）
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    const pageHeight = 297 // A4 高度（mm）

    // 創建 PDF
    const pdf = new jsPDF({
      orientation: imgHeight > pageHeight ? 'portrait' : 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    // 如果內容超過一頁，需要分頁
    if (imgHeight > pageHeight) {
      let heightLeft = imgHeight
      let position = 0

      // 第一頁
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // 後續頁面
      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
    } else {
      // 單頁就夠了
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight)
    }

    // 下載 PDF
    const date = new Date().toISOString().split('T')[0]
    pdf.save(`Vista文案健檢報告_${date}.pdf`)
  } catch (error) {
    console.error('PDF 匯出失敗:', error)
    alert('PDF 匯出遇到問題，請稍後再試')
  }
}
