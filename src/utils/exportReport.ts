import { AnalysisResult } from '@/types/analyzer.types'

/**
 * 匯出為 Markdown 格式
 */
export function exportToMarkdown(result: AnalysisResult): void {
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
 * 匯出為 PDF 格式（使用瀏覽器列印功能）
 */
export function exportToPDF(): void {
  // 暫存原始標題
  const originalTitle = document.title

  // 設定匯出檔名（瀏覽器會使用 document.title 作為預設檔名）
  const date = new Date().toISOString().split('T')[0]
  document.title = `Vista文案健檢報告_${date}`

  // 使用瀏覽器的列印功能轉 PDF
  window.print()

  // 還原原始標題
  setTimeout(() => {
    document.title = originalTitle
  }, 100)
}
