import { AnalysisResult } from '@/types/analyzer.types'
import { trackPDFExport, trackMarkdownExport } from '@/utils/analytics'
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
 * 匯出為 PDF 格式
 */
export function exportToPDF(result: AnalysisResult): void {
  // GA4 事件追蹤：PDF 匯出
  trackPDFExport(result.totalScore)

  const { totalScore, grade, summary, dimensions, analyzedText, timestamp } = result

  const gradeLabels: Record<string, string> = {
    excellent: 'Excellent (You Xiu)',
    good: 'Good (Liang Hao)',
    needsImprovement: 'Needs Improvement (Dai Gai Jin)',
    needsRewrite: 'Needs Rewrite (Xu Chong Xie)',
  }

  // 創建 PDF (A4 尺寸)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  let yPos = 20
  const leftMargin = 20
  const rightMargin = 20
  const pageWidth = 210
  const maxWidth = pageWidth - leftMargin - rightMargin

  // 輔助函數：檢查是否需要新頁面
  const checkNewPage = (requiredSpace: number) => {
    if (yPos + requiredSpace > 280) {
      doc.addPage()
      yPos = 20
      return true
    }
    return false
  }

  // 輔助函數：添加多行文字
  const addMultilineText = (text: string, fontSize: number, lineHeight: number = 7) => {
    doc.setFontSize(fontSize)
    const lines = doc.splitTextToSize(text, maxWidth)
    lines.forEach((line: string) => {
      checkNewPage(lineHeight)
      doc.text(line, leftMargin, yPos)
      yPos += lineHeight
    })
  }

  // 標題
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('Vista Copywriting Check Report', leftMargin, yPos)
  yPos += 15

  // 分隔線
  doc.setDrawColor(212, 119, 43) // 品牌橘色
  doc.setLineWidth(0.5)
  doc.line(leftMargin, yPos, pageWidth - rightMargin, yPos)
  yPos += 10

  // 生成時間
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Generated: ${new Date(timestamp).toLocaleString('zh-TW')}`, leftMargin, yPos)
  yPos += 15

  // 總體評分
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('Overall Score', leftMargin, yPos)
  yPos += 8

  doc.setFontSize(36)
  doc.setTextColor(212, 119, 43)
  doc.text(`${totalScore}`, leftMargin, yPos)
  doc.setFontSize(14)
  doc.text('/ 100', leftMargin + 25, yPos)
  yPos += 10

  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text(`Grade: ${gradeLabels[grade]}`, leftMargin, yPos)
  yPos += 15

  // 分析的文案
  checkNewPage(30)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Analyzed Copy', leftMargin, yPos)
  yPos += 8

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setFillColor(245, 245, 245)
  doc.rect(leftMargin, yPos - 5, maxWidth, 2, 'F')
  yPos += 3

  // 文案內容（限制長度）
  const shortText = analyzedText.length > 200 ? analyzedText.substring(0, 200) + '...' : analyzedText
  addMultilineText(shortText, 9, 5)
  yPos += 8

  // 各維度評分
  checkNewPage(60)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Dimension Scores', leftMargin, yPos)
  yPos += 10

  const dimensionList = [
    { name: 'FAB Principle', score: dimensions.fab.score, max: 25 },
    { name: 'Title Appeal', score: dimensions.titleAppeal.score, max: 20 },
    { name: 'Consumer Insight', score: dimensions.consumerInsight.score, max: 20 },
    { name: 'Call to Action', score: dimensions.callToAction.score, max: 15 },
    { name: 'Readability', score: dimensions.readability.score, max: 10 },
    { name: 'Value Proposition', score: dimensions.valueProposition.score, max: 10 },
  ]

  dimensionList.forEach((dim) => {
    checkNewPage(12)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text(`${dim.name}:`, leftMargin, yPos)

    // 分數條
    const barWidth = 80
    const barHeight = 5
    const barX = leftMargin + 60
    const scorePercentage = (dim.score / dim.max) * 100
    const filledWidth = (barWidth * scorePercentage) / 100

    // 背景
    doc.setFillColor(230, 230, 230)
    doc.rect(barX, yPos - 3, barWidth, barHeight, 'F')

    // 填充
    const color = scorePercentage >= 80 ? [76, 175, 80] : scorePercentage >= 60 ? [255, 193, 7] : [244, 67, 54]
    doc.setFillColor(color[0], color[1], color[2])
    doc.rect(barX, yPos - 3, filledWidth, barHeight, 'F')

    // 分數文字
    doc.setFont('helvetica', 'bold')
    doc.text(`${dim.score}/${dim.max}`, barX + barWidth + 5, yPos)

    yPos += 10
  })

  // 總結與建議
  yPos += 5
  checkNewPage(40)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Summary & Recommendations', leftMargin, yPos)
  yPos += 10

  // 整體評價
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Overall Assessment:', leftMargin, yPos)
  yPos += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  addMultilineText(summary.overallAssessment, 10, 5)
  yPos += 5

  // 優勢項目
  if (summary.strengths.length > 0) {
    checkNewPage(30)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('Strengths:', leftMargin, yPos)
    yPos += 6
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    summary.strengths.forEach((strength: string) => {
      checkNewPage(6)
      doc.text(`- ${strength}`, leftMargin + 5, yPos)
      yPos += 5
    })
    yPos += 3
  }

  // 待改進項目
  if (summary.weaknesses.length > 0) {
    checkNewPage(30)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('Areas for Improvement:', leftMargin, yPos)
    yPos += 6
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    summary.weaknesses.forEach((weakness: string) => {
      checkNewPage(6)
      doc.text(`- ${weakness}`, leftMargin + 5, yPos)
      yPos += 5
    })
    yPos += 3
  }

  // 優先改善建議
  if (summary.topPriorities.length > 0) {
    checkNewPage(30)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('Top Priorities:', leftMargin, yPos)
    yPos += 6
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    summary.topPriorities.forEach((priority: string, index: number) => {
      checkNewPage(6)
      doc.text(`${index + 1}. ${priority}`, leftMargin + 5, yPos)
      yPos += 5
    })
    yPos += 5
  }

  // 頁尾
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(128, 128, 128)
    doc.text(
      'Generated by Vista Copywriting Checker | https://www.vista.tw',
      pageWidth / 2,
      285,
      { align: 'center' }
    )
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - rightMargin, 285, { align: 'right' })
  }

  // 下載 PDF
  const date = new Date().toISOString().split('T')[0]
  doc.save(`Vista_Copywriting_Report_${date}.pdf`)
}
